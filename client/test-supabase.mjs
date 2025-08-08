// Script de test de connexion Supabase en utilisant ESM
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

// Obtenir le chemin actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger manuellement le fichier .env
const envConfig = dotenv.parse(readFileSync('.env'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

// Afficher les variables d'environnement utilisées
console.log('URL Supabase utilisée:', process.env.VITE_SUPABASE_URL);
console.log('Clé Supabase disponible:', !!process.env.VITE_SUPABASE_KEY);

// Créer le client Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

async function testConnection() {
  try {
    console.log('Test de connexion à Supabase en cours...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Erreur de connexion à Supabase:', error);
      return;
    }
    
    console.log('✅ Connexion à Supabase réussie!');
    console.log('Données reçues:', data);
  } catch (err) {
    console.error('❌ Exception lors de la connexion à Supabase:', err);
  }
}

testConnection();
