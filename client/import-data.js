/**
 * Script d'importation des données Supabase pour Lovable
 * 
 * Ce script permet d'importer les données exportées vers votre nouvelle instance Supabase.
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir __dirname dans un contexte ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
config({ path: path.join(__dirname, '.env') });

// Nouvelle instance Supabase
const NEW_SUPABASE_URL = process.env.NEW_SUPABASE_URL;
const NEW_SUPABASE_KEY = process.env.NEW_SUPABASE_SERVICE_KEY; // Utilisation de la clé service_role pour l'import

// Vérification des variables d'environnement
if (!NEW_SUPABASE_URL || !NEW_SUPABASE_KEY) {
  console.error('Erreur: Les variables d\'environnement NEW_SUPABASE_URL et NEW_SUPABASE_SERVICE_KEY sont requises.');
  process.exit(1);
}

console.log('URL de la nouvelle instance Supabase:', NEW_SUPABASE_URL);
console.log('Import depuis le répertoire:', path.join(__dirname, 'exported-data'));

// Configuration du client Supabase pour Supabase auto-hébergé via Coolify
// Selon la configuration Docker Compose, Kong gère les routes API
// et le chemin /rest/v1/ est utilisé pour l'API REST
let supabaseUrl = NEW_SUPABASE_URL;
// S'assurer que l'URL ne contient pas déjà /rest/v1
if (!supabaseUrl.endsWith('/rest/v1') && !supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = `${supabaseUrl}/rest/v1`;
}

console.log('URL de l\'API REST Supabase:', supabaseUrl);
console.log('Clé API (préview):', NEW_SUPABASE_KEY.substring(0, 20) + '...');

// Options spécifiques pour Kong API Gateway
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'apikey': NEW_SUPABASE_KEY,
      'Authorization': `Bearer ${NEW_SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  }
};

// Créer le client Supabase avec la configuration spécifique à Kong
console.log('Initialisation du client Supabase pour instance auto-hébergée...');
const supabase = createClient(supabaseUrl, NEW_SUPABASE_KEY, options);
console.log('Client Supabase initialisé');

// Répertoire contenant les données exportées
const IMPORT_DIR = path.join(__dirname, 'exported-data');

/**
 * Importe les données d'un fichier JSON vers une table
 */
async function importTable(tableName) {
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
    
    console.log(`Tentative de désactivation de RLS pour ${tableName}...`);
    try {
      // Désactiver temporairement RLS
      const { error: rpcError } = await supabase.rpc('disable_rls');
      if (rpcError) {
        console.warn(`Impossible de désactiver RLS. L'erreur sera ignorée et l'import continuera:`, rpcError.message);
      } else {
        console.log('RLS désactivé avec succès.');
      }
    } catch (rpcErr) {
      console.warn('Erreur lors de l\'appel RPC pour désactiver RLS, l\'import continuera:', rpcErr.message);
    }
    
    // Importation des données par lots plus petits
    const batchSize = 50;
    let successCount = 0;
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      console.log(`Import du lot ${Math.floor(i/batchSize) + 1}/${Math.ceil(data.length/batchSize)} pour ${tableName}...`);
      
      try {
        const { data: insertedData, error } = await supabase
          .from(tableName)
          .upsert(batch, { 
            onConflict: 'id',
            returning: 'minimal' // Réduit la taille de la réponse
          });
        
        if (error) {
          console.error(`Erreur lors de l'importation dans ${tableName} (lot ${Math.floor(i/batchSize) + 1}):`, error);
          // Continuer avec le lot suivant malgré l'erreur
          continue;
        }
        
        successCount += batch.length;
        console.log(`  ✓ Lot ${Math.floor(i/batchSize) + 1} importé avec succès`);
      } catch (batchError) {
        console.error(`Exception lors de l'importation dans ${tableName} (lot ${Math.floor(i/batchSize) + 1}):`, batchError);
        // Continuer avec le lot suivant malgré l'erreur
        continue;
      }
    }
    
    try {
      // Réactiver RLS
      const { error: rpcError } = await supabase.rpc('enable_rls');
      if (rpcError) {
        console.warn(`Impossible de réactiver RLS:`, rpcError.message);
      } else {
        console.log('RLS réactivé avec succès.');
      }
    } catch (rpcErr) {
      console.warn('Erreur lors de l\'appel RPC pour réactiver RLS:', rpcErr.message);
    }
    
    console.log(`✓ ${successCount}/${data.length} enregistrements importés dans ${tableName}`);
    return successCount > 0 || data.length === 0;
  } catch (err) {
    console.error(`Erreur inattendue lors de l'importation dans ${tableName}:`, err);
    return false;
  }
}

/**
 * Fonction principale pour importer toutes les tables
 * L'ordre est important pour respecter les contraintes de clés étrangères
 */
async function importAllData() {
  console.log('Démarrage de l\'importation des données vers la nouvelle instance Supabase...');
  
  // Tester la connexion avant de procéder
  try {
    console.log('Test de connexion à la nouvelle instance Supabase...');
    const { data: versionData, error: versionError } = await supabase.rpc('version');
    
    if (versionError) {
      if (versionError.message.includes('relation') || versionError.message.includes('function')) {
        console.log('La fonction RPC "version" n\'est pas disponible, mais la connexion semble fonctionner.');
      } else {
        console.warn('Problème de connexion à Supabase:', versionError.message);
        console.log('Tentative de continuer malgré l\'erreur de connexion...');
      }
    } else {
      console.log('Connexion réussie à Supabase! Version PostgreSQL:', versionData);
    }
  } catch (connErr) {
    console.warn('Erreur lors du test de connexion:', connErr.message);
    console.log('Tentative de continuer malgré l\'erreur de connexion...');
  }

  // Vérifier si le répertoire des données existe
  if (!fs.existsSync(IMPORT_DIR)) {
    console.error(`Erreur: Le répertoire de données ${IMPORT_DIR} n'existe pas.`);
    return;
  }
  
  // Lisez les fichiers JSON dans le répertoire pour déterminer les tables à importer
  const tableFiles = fs.readdirSync(IMPORT_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
  
  if (tableFiles.length === 0) {
    console.error('Aucun fichier JSON trouvé dans le répertoire des données exportées.');
    return;
  }
  
  console.log(`${tableFiles.length} fichiers de données trouvés: ${tableFiles.join(', ')}`);
  
  // Ordre d'importation optimisé pour respecter les contraintes de clés étrangères
  // Utilisez TABLES_TO_MIGRATE de .env si défini
  let importOrder = [];
  if (process.env.TABLES_TO_MIGRATE) {
    importOrder = process.env.TABLES_TO_MIGRATE.split(',').map(t => t.trim());
    console.log('Ordre d\'importation défini dans .env:', importOrder.join(', '));
  } else {
    importOrder = [
      'users',         // Généralement les utilisateurs en premier
      'profiles',      // Profils utilisateurs
      'categories',    // Catégories avant produits
      'products',      // Produits avant commandes
      'orders',        // Commandes avant articles de commande
      'order_items',   // Articles de commande
      'settings'       // Paramètres généraux
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
  
  let successCount = 0;
  
  for (const table of tablesToImport) {
    console.log(`\n=== Traitement de la table: ${table} ===`);
    const success = await importTable(table);
    if (success) successCount++;
  }
  
  console.log(`\nImportation terminée: ${successCount}/${tablesToImport.length} tables importées avec succès.`);
}

// Exécuter l'importation
importAllData().catch(err => {
  console.error('Erreur lors de l\'importation:', err);
  process.exit(1);
});

