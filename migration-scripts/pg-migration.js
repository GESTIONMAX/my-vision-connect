/**
 * Script de migration directe PostgreSQL pour Supabase
 * Utilise une connexion directe aux bases de données PostgreSQL au lieu de l'API REST
 */
import { config } from 'dotenv';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir __dirname dans un contexte ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
config({ path: path.join(__dirname, '.env') });

// Répertoire contenant les données exportées
const IMPORT_DIR = path.join(__dirname, 'exported-data');

// Configuration des connexions PostgreSQL
const OLD_DB_CONFIG = {
  // Ces valeurs doivent être mises à jour pour pointer vers votre ancienne base Supabase
  // soit via une connexion directe si disponible, soit via les données exportées
  connectionString: process.env.OLD_PG_CONNECTION_STRING || null
};

const NEW_DB_CONFIG = {
  // Configuration pour la nouvelle base PostgreSQL Supabase auto-hébergée
  // Remplacez ces valeurs par les informations correctes de votre instance auto-hébergée
  host: process.env.NEW_PG_HOST || 'supabase-db', // Hostname du conteneur PostgreSQL
  port: process.env.NEW_PG_PORT || 5432,
  database: process.env.NEW_PG_DATABASE || 'postgres',
  user: process.env.NEW_PG_USER || 'postgres', // Probablement 'supabase_admin' ou 'postgres' 
  password: process.env.NEW_PG_PASSWORD || process.env.SERVICE_PASSWORD_POSTGRES, // Mot de passe défini dans Coolify
  ssl: process.env.NEW_PG_SSL === 'true' ? { rejectUnauthorized: false } : false
};

console.log('Configuration de connexion à la nouvelle base PostgreSQL:');
console.log({
  host: NEW_DB_CONFIG.host,
  port: NEW_DB_CONFIG.port,
  database: NEW_DB_CONFIG.database,
  user: NEW_DB_CONFIG.user,
  ssl: NEW_DB_CONFIG.ssl ? 'enabled' : 'disabled'
});

/**
 * Importe les données d'un fichier JSON vers une table PostgreSQL
 */
async function importTableToPg(client, tableName) {
  const filePath = path.join(IMPORT_DIR, `${tableName}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Le fichier ${filePath} n'existe pas. Import ignoré.`);
    return false;
  }
  
  console.log(`Importation dans la table: ${tableName}`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data || data.length === 0) {
      console.log(`Aucune donnée à importer pour ${tableName}`);
      return true;
    }
    
    // Désactiver temporairement les triggers si nécessaire
    await client.query(`ALTER TABLE "${tableName}" DISABLE TRIGGER ALL;`);
    
    let successCount = 0;
    const batchSize = 50;
    
    // Récupérer les informations sur les colonnes pour savoir quelles colonnes sont de type JSONB
    const columnsQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = $1 AND table_schema = 'public';
    `;
    
    const columnsResult = await client.query(columnsQuery, [tableName]);
    const jsonColumns = new Set(
      columnsResult.rows
        .filter(col => col.data_type === 'jsonb')
        .map(col => col.column_name)
    );
    
    console.log(`Colonnes JSONB détectées: ${Array.from(jsonColumns).join(', ') || 'aucune'}`);
    
    // Fonction pour préparer une valeur selon son type de colonne
    const prepareValue = (field, value) => {
      // Si c'est une colonne JSON et que la valeur est un objet ou un tableau
      if (jsonColumns.has(field) && value !== null) {
        // Si c'est déjà une chaîne JSON, la retourner telle quelle
        if (typeof value === 'string') {
          try {
            // Vérifie si c'est une chaîne JSON valide
            JSON.parse(value);
            return value;
          } catch (e) {
            // Si ce n'est pas du JSON valide, on l'encapsule
            return JSON.stringify(value);
          }
        }
        // Sinon, convertir en chaîne JSON
        return JSON.stringify(value);
      }
      return value;
    };
    
    // Traiter chaque lot d'enregistrements
    for (let i = 0; i < data.length; i += batchSize) {
      // Utiliser une transaction par lot pour éviter que les erreurs n'affectent tous les enregistrements
      await client.query('BEGIN');
      
      const batch = data.slice(i, i + batchSize);
      console.log(`Import du lot ${Math.floor(i/batchSize) + 1}/${Math.ceil(data.length/batchSize)} pour ${tableName}...`);
      
      let batchSuccessCount = 0;
      let batchErrorCount = 0;
      
      // Pour chaque enregistrement dans le lot
      for (const record of batch) {
        // Construire les champs et les valeurs pour la requête
        const fields = Object.keys(record).filter(k => record[k] !== null);
        const values = fields.map(field => prepareValue(field, record[field]));
        const placeholders = fields.map((_, index) => `$${index + 1}`);
        
        // Construire la requête SQL
        const insertQuery = `
          INSERT INTO "${tableName}" (${fields.map(f => `"${f}"`).join(', ')})
          VALUES (${placeholders.join(', ')})
          ON CONFLICT (id) DO UPDATE
          SET ${fields.map((f, index) => `"${f}" = $${index + 1}`).join(', ')}
        `;
        
        try {
          await client.query(insertQuery, values);
          batchSuccessCount++;
          successCount++;
        } catch (err) {
          console.error(`Erreur lors de l'insertion de l'enregistrement ${JSON.stringify(record.id)} dans ${tableName}:`, err.message);
          batchErrorCount++;
        }
      }
      
      // Valider ou annuler la transaction selon le succès ou l'échec
      if (batchErrorCount > 0) {
        console.log(`  ⚠️ ${batchErrorCount} erreurs dans ce lot, transaction annulée`);
        await client.query('ROLLBACK');
      } else {
        await client.query('COMMIT');
        console.log(`  ✓ Lot ${Math.floor(i/batchSize) + 1} traité avec succès (${batchSuccessCount} enregistrements)`);
      }
    }
    
    // Réactiver les triggers
    await client.query(`ALTER TABLE "${tableName}" ENABLE TRIGGER ALL;`);
    
    console.log(`✓ ${successCount}/${data.length} enregistrements importés dans ${tableName}`);
    return successCount > 0;
  } catch (err) {
    console.error(`Erreur inattendue lors de l'importation dans ${tableName}:`, err);
    return false;
  }
}

/**
 * Fonction principale pour importer toutes les tables
 */
async function migrateAllData() {
  console.log('Démarrage de la migration directe PostgreSQL...');
  
  // Vérifier si le répertoire des données existe
  if (!fs.existsSync(IMPORT_DIR)) {
    console.error(`Erreur: Le répertoire de données ${IMPORT_DIR} n'existe pas.`);
    return;
  }
  
  // Lire les fichiers JSON dans le répertoire pour déterminer les tables à importer
  const tableFiles = fs.readdirSync(IMPORT_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
  
  if (tableFiles.length === 0) {
    console.error('Aucun fichier JSON trouvé dans le répertoire des données exportées.');
    return;
  }
  
  console.log(`${tableFiles.length} fichiers de données trouvés: ${tableFiles.join(', ')}`);
  
  // Connexion à la nouvelle base PostgreSQL
  console.log('Connexion à la base PostgreSQL de destination...');
  const client = new pg.Client(NEW_DB_CONFIG);
  
  try {
    await client.connect();
    console.log('Connexion PostgreSQL établie avec succès!');
    
    // Vérifier la version PostgreSQL
    const versionRes = await client.query('SELECT version();');
    console.log('Version PostgreSQL:', versionRes.rows[0].version);
    
    // Ordre d'importation optimisé pour respecter les contraintes de clés étrangères
    // Utilisez TABLES_TO_MIGRATE de .env si défini
    let importOrder = [];
    if (process.env.TABLES_TO_MIGRATE) {
      importOrder = process.env.TABLES_TO_MIGRATE.split(',').map(t => t.trim());
      console.log('Ordre d\'importation défini dans .env:', importOrder.join(', '));
    } else {
      importOrder = [
        'profiles',
        'customers',
        'products',
        'orders',
        'reviews'
      ];
      console.log('Utilisation de l\'ordre d\'importation par défaut');
    }
    
    // Filtrer les tables qui existent réellement dans les fichiers exportés
    const tablesToImport = importOrder.filter(table => tableFiles.includes(table));
    
    // Ajouter les tables restantes qui n'étaient pas dans l'ordre prédéfini
    tableFiles.forEach(table => {
      if (!tablesToImport.includes(table)) {
        tablesToImport.push(table);
      }
    });
    
    console.log('Ordre final d\'importation:', tablesToImport.join(', '));
    
    // Début de la transaction
    await client.query('BEGIN');
    
    try {
      // Désactiver temporairement les contraintes de clés étrangères pour faciliter l'import
      await client.query('SET session_replication_role = replica;');
      
      let successCount = 0;
      
      for (const table of tablesToImport) {
        console.log(`\n=== Traitement de la table: ${table} ===`);
        const success = await importTableToPg(client, table);
        if (success) successCount++;
      }
      
      // Réactiver les contraintes de clés étrangères
      await client.query('SET session_replication_role = DEFAULT;');
      
      // Validation de la transaction
      await client.query('COMMIT');
      
      console.log(`\nMigration terminée: ${successCount}/${tablesToImport.length} tables importées avec succès.`);
    } catch (err) {
      // Annulation de la transaction en cas d'erreur
      await client.query('ROLLBACK');
      console.error('Erreur lors de la migration, transaction annulée:', err);
    }
  } catch (err) {
    console.error('Erreur de connexion à PostgreSQL:', err);
  } finally {
    // Fermeture de la connexion
    await client.end();
    console.log('Connexion PostgreSQL fermée.');
  }
}

// Exécuter la migration
migrateAllData().catch(err => {
  console.error('Erreur lors de la migration:', err);
  process.exit(1);
});
