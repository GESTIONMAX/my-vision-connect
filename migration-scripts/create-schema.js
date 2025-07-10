/**
 * Script pour générer et appliquer la structure de base de données 
 * à partir des fichiers JSON exportés
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

// Configuration pour la connexion PostgreSQL
const PG_CONFIG = {
  host: process.env.NEW_PG_HOST,
  port: process.env.NEW_PG_PORT || 5432,
  database: process.env.NEW_PG_DATABASE || 'postgres',
  user: process.env.NEW_PG_USER || 'postgres',
  password: process.env.NEW_PG_PASSWORD,
  ssl: process.env.NEW_PG_SSL === 'true' ? { rejectUnauthorized: false } : false
};

console.log('Configuration de connexion PostgreSQL:', {
  host: PG_CONFIG.host,
  port: PG_CONFIG.port,
  database: PG_CONFIG.database,
  user: PG_CONFIG.user
});

/**
 * Détermine le type SQL approprié en fonction de la valeur JavaScript
 */
function getSqlType(value) {
  if (value === null || value === undefined) return 'TEXT';
  
  if (typeof value === 'string') {
    // Détecter les dates ISO
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return 'TIMESTAMP WITH TIME ZONE';
    }
    // Détecter les UUID
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
      return 'UUID';
    }
    return 'TEXT';
  }
  
  if (typeof value === 'number') {
    // Détecter si c'est un entier ou un nombre à virgule flottante
    return Number.isInteger(value) ? 'INTEGER' : 'NUMERIC';
  }
  
  if (typeof value === 'boolean') {
    return 'BOOLEAN';
  }
  
  if (Array.isArray(value)) {
    return 'JSONB';
  }
  
  if (typeof value === 'object') {
    return 'JSONB';
  }
  
  return 'TEXT';
}

/**
 * Analyse un fichier JSON pour générer une structure de table
 */
function analyzeJsonFile(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!Array.isArray(data) || data.length === 0) {
      console.log(`Le fichier ${filePath} ne contient pas de données valides.`);
      return null;
    }
    
    // Utiliser le premier objet comme référence, puis examiner les autres pour améliorer le typage
    const structure = {};
    let primaryKey = 'id'; // Clé primaire par défaut
    
    // Identifier les champs et leurs types en examinant tous les enregistrements
    data.forEach((record, index) => {
      Object.entries(record).forEach(([key, value]) => {
        if (index === 0) {
          structure[key] = { type: getSqlType(value), nullable: value === null };
          
          // Identifier la clé primaire potentielle (priorité à 'id')
          if (key === 'id' || (!structure[primaryKey] && key.toLowerCase().endsWith('_id'))) {
            primaryKey = key;
          }
        } else {
          // Affiner le type basé sur les valeurs des autres enregistrements
          if (value !== null && structure[key].type === 'TEXT') {
            const newType = getSqlType(value);
            if (newType !== 'TEXT') {
              structure[key].type = newType;
            }
          }
          
          // Déterminer si un champ est nullable
          if (value === null) {
            structure[key].nullable = true;
          }
        }
      });
    });
    
    return { structure, primaryKey };
  } catch (err) {
    console.error(`Erreur lors de l'analyse du fichier ${filePath}:`, err);
    return null;
  }
}

/**
 * Génère une instruction SQL CREATE TABLE à partir de la structure analysée
 */
function generateCreateTableSql(tableName, { structure, primaryKey }) {
  const columns = Object.entries(structure).map(([columnName, info]) => {
    const nullableStr = info.nullable ? 'NULL' : 'NOT NULL';
    
    // Cas spécial pour la colonne ID
    if (columnName === primaryKey) {
      if (info.type === 'UUID') {
        return `"${columnName}" UUID PRIMARY KEY`;
      }
      if (info.type === 'INTEGER') {
        return `"${columnName}" SERIAL PRIMARY KEY`;
      }
      return `"${columnName}" ${info.type} PRIMARY KEY`;
    }
    
    return `"${columnName}" ${info.type} ${nullableStr}`;
  });
  
  return `CREATE TABLE IF NOT EXISTS "${tableName}" (\n  ${columns.join(',\n  ')}\n);`;
}

/**
 * Crée les tables dans la base de données
 */
async function createTables() {
  console.log('Génération et création des tables...');
  
  // Vérifier si le répertoire des données existe
  if (!fs.existsSync(IMPORT_DIR)) {
    console.error(`Erreur: Le répertoire ${IMPORT_DIR} n'existe pas.`);
    return;
  }
  
  // Lire les fichiers JSON dans le répertoire
  const tableFiles = fs.readdirSync(IMPORT_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
  
  if (tableFiles.length === 0) {
    console.error('Aucun fichier JSON trouvé dans le répertoire des données exportées.');
    return;
  }
  
  console.log(`${tableFiles.length} fichiers de données trouvés: ${tableFiles.join(', ')}`);
  
  // Connexion à la base PostgreSQL
  const client = new pg.Client(PG_CONFIG);
  
  try {
    await client.connect();
    console.log('Connexion PostgreSQL établie avec succès!');
    
    // Vérifier la version PostgreSQL
    const versionRes = await client.query('SELECT version();');
    console.log('Version PostgreSQL:', versionRes.rows[0].version);
    
    // Créer un schéma public s'il n'existe pas déjà
    await client.query(`CREATE SCHEMA IF NOT EXISTS public;`);
    
    for (const tableName of tableFiles) {
      console.log(`\nAnalyse du fichier ${tableName}.json...`);
      
      const filePath = path.join(IMPORT_DIR, `${tableName}.json`);
      const tableStructure = analyzeJsonFile(filePath);
      
      if (!tableStructure) {
        console.log(`Impossible de déterminer la structure de la table ${tableName}, ignorée.`);
        continue;
      }
      
      const createTableSql = generateCreateTableSql(tableName, tableStructure);
      console.log(`\nCréation de la table "${tableName}" avec la structure suivante:`);
      console.log(createTableSql);
      
      try {
        await client.query(createTableSql);
        console.log(`✓ Table "${tableName}" créée avec succès!`);
      } catch (err) {
        console.error(`Erreur lors de la création de la table "${tableName}":`, err.message);
      }
    }
    
    console.log('\nCréation des tables terminée!');
  } catch (err) {
    console.error('Erreur de connexion à PostgreSQL:', err);
  } finally {
    await client.end();
    console.log('Connexion PostgreSQL fermée.');
  }
}

// Exécuter la création des tables
createTables().catch(err => {
  console.error('Erreur lors de la création des tables:', err);
  process.exit(1);
});
