/**
 * Script de migration des fichiers Storage pour Lovable
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

// Configuration des instances Supabase
const OLD_SUPABASE_URL = process.env.OLD_SUPABASE_URL;
const OLD_SUPABASE_KEY = process.env.OLD_SUPABASE_SERVICE_KEY;

const NEW_SUPABASE_URL = process.env.NEW_SUPABASE_URL;
const NEW_SUPABASE_KEY = process.env.NEW_SUPABASE_SERVICE_KEY;

// Créer les clients Supabase
const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

// Répertoire temporaire pour les fichiers
const TEMP_DIR = path.join(__dirname, 'temp-storage');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Liste des buckets à migrer depuis la variable d'environnement
const BUCKETS_TO_MIGRATE = (process.env.STORAGE_BUCKETS || '').split(',').filter(Boolean);

/**
 * Télécharge un fichier depuis l'ancienne instance
 */
async function downloadFile(bucket, filePath) {
  const tempFilePath = path.join(TEMP_DIR, `${bucket}_${filePath.replace(/\//g, '_')}`);
  
  const { data, error } = await oldSupabase
    .storage
    .from(bucket)
    .download(filePath);
  
  if (error) {
    console.error(`Erreur lors du téléchargement de ${bucket}/${filePath}:`, error);
    return null;
  }
  
  // Convertir le blob en buffer et sauvegarder
  const buffer = Buffer.from(await data.arrayBuffer());
  fs.writeFileSync(tempFilePath, buffer);
  
  return tempFilePath;
}

/**
 * Télécharge la liste des fichiers d'un bucket
 */
async function listFiles(bucket) {
  const { data, error } = await oldSupabase
    .storage
    .from(bucket)
    .list();
  
  if (error) {
    console.error(`Erreur lors de la récupération de la liste des fichiers du bucket ${bucket}:`, error);
    return [];
  }
  
  return data;
}

/**
 * Migre un bucket entier
 */
async function migrateBucket(bucket) {
  console.log(`Migration du bucket: ${bucket}`);
  
  try {
    // Créer le bucket dans la nouvelle instance s'il n'existe pas
    const { error: createError } = await newSupabase
      .storage
      .createBucket(bucket, { public: true });
    
    if (createError && !createError.message.includes('already exists')) {
      console.error(`Erreur lors de la création du bucket ${bucket}:`, createError);
      return false;
    }
    
    // Lister tous les fichiers
    const files = await listFiles(bucket);
    
    if (!files || files.length === 0) {
      console.log(`Aucun fichier dans le bucket ${bucket}`);
      return true;
    }
    
    for (const file of files) {
      if (file.id) { // C'est un fichier, pas un dossier
        const tempFilePath = await downloadFile(bucket, file.name);
        
        if (!tempFilePath) continue;
        
        // Uploader vers la nouvelle instance
        const { error: uploadError } = await newSupabase
          .storage
          .from(bucket)
          .upload(file.name, fs.readFileSync(tempFilePath));
        
        if (uploadError) {
          console.error(`Erreur lors de l'upload de ${file.name}:`, uploadError);
          continue;
        }
        
        // Supprimer le fichier temporaire
        fs.unlinkSync(tempFilePath);
        
        console.log(`✓ Fichier migré: ${bucket}/${file.name}`);
      }
    }
    
    return true;
  } catch (err) {
    console.error(`Erreur inattendue lors de la migration du bucket ${bucket}:`, err);
    return false;
  }
}

/**
 * Fonction principale pour migrer tous les buckets
 */
async function migrateAllStorage() {
  console.log('Démarrage de la migration des fichiers Storage...');
  
  let successCount = 0;
  
  for (const bucket of BUCKETS_TO_MIGRATE) {
    const success = await migrateBucket(bucket);
    if (success) successCount++;
  }
  
  console.log(`\nMigration terminée: ${successCount}/${BUCKETS_TO_MIGRATE.length} buckets migrés avec succès.`);
  
  // Nettoyer le répertoire temporaire
  fs.rmdirSync(TEMP_DIR, { recursive: true });
}

// Exécuter la migration
migrateAllStorage().catch(err => {
  console.error('Erreur lors de la migration Storage:', err);
  process.exit(1);
});

