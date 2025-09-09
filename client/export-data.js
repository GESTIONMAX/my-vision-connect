/**
 * Script d'exportation des données Supabase pour Lovable
 * 
 * Ce script permet d'exporter les données de votre ancienne instance Supabase
 * vers des fichiers JSON qui pourront être importés dans votre nouvelle instance.
 */
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir __dirname dans un contexte ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
config({ path: path.join(__dirname, '.env') });

// Ancienne instance Supabase
const OLD_SUPABASE_URL = process.env.OLD_SUPABASE_URL;
const OLD_SUPABASE_KEY = process.env.OLD_SUPABASE_SERVICE_KEY;

// Créer le client Supabase

// Répertoire pour sauvegarder les données
const EXPORT_DIR = path.join(__dirname, 'exported-data');
if (!fs.existsSync(EXPORT_DIR)) {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

// Liste des tables à exporter depuis la variable d'environnement
const TABLES_TO_EXPORT = (process.env.TABLES_TO_MIGRATE || '').split(',').filter(Boolean);

/**
 * Exporte une table vers un fichier JSON
 */
async function exportTable(tableName) {
  console.log(`Exportation de la table: ${tableName}`);
  
  try {
      .from(tableName)
      .select('*');
    
    if (error) {
      console.error(`Erreur lors de l'exportation de ${tableName}:`, error);
      return false;
    }
    
    if (!data || data.length === 0) {
      console.log(`Aucune donnée dans la table ${tableName}`);
      return true;
    }
    
    // Sauvegarder les données dans un fichier JSON
    const filePath = path.join(EXPORT_DIR, `${tableName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`✓ ${data.length} enregistrements exportés dans ${filePath}`);
    return true;
  } catch (err) {
    console.error(`Erreur inattendue lors de l'exportation de ${tableName}:`, err);
    return false;
  }
}

/**
 * Fonction principale pour exporter toutes les tables
 */
async function exportAllData() {
  console.log('Démarrage de l\'exportation des données Supabase...');
  
  let successCount = 0;
  
  for (const table of TABLES_TO_EXPORT) {
    const success = await exportTable(table);
    if (success) successCount++;
  }
  
  console.log(`\nExportation terminée: ${successCount}/${TABLES_TO_EXPORT.length} tables exportées avec succès.`);
}

// Exécuter l'exportation
exportAllData().catch(err => {
  console.error('Erreur lors de l\'exportation:', err);
  process.exit(1);
});

