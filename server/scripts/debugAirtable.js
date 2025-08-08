require('dotenv').config({ path: '../.env' });
const Airtable = require('airtable');

// Configuration Airtable avec le PAT
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'pat6Ipg6brWdZAG2K.a78ab830b351b7400dfd1144d92b96caf38f19105e97cfce3818de0809897759';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appVH6EitfYVkeG9S';

// Initialiser Airtable
const airtable = new Airtable({ apiKey: AIRTABLE_API_KEY });
const base = airtable.base(AIRTABLE_BASE_ID);

// Tester l'accès à différentes tables potentielles
const tableNames = [
  'Products',
  'Categories',
  'Users',
  'Orders',
  'Carts',
  'products',
  'categories',
  'users',
  'orders',
  'carts',
  'Product',
  'Category',
  'User',
  'Order',
  'Cart'
];

async function testTableAccess() {
  console.log(`Tentative d'accès à la base Airtable avec ID: ${AIRTABLE_BASE_ID}`);
  console.log(`Utilisation de la clé API: ${AIRTABLE_API_KEY.substring(0, 10)}...`);
  console.log('\nTentative d\'accès à différentes tables potentielles:\n');

  for (const tableName of tableNames) {
    try {
      console.log(`Tentative d'accès à la table "${tableName}"...`);
      const records = await base(tableName).select({ maxRecords: 1 }).all();
      console.log(`✅ Succès pour "${tableName}"! ${records.length} enregistrement(s) trouvé(s).`);
      if (records.length > 0) {
        console.log(`Champs du premier enregistrement: ${Object.keys(records[0].fields).join(', ')}`);
      }
    } catch (error) {
      console.log(`❌ Échec pour "${tableName}": ${error.message}`);
    }
  }

  console.log('\nSuggestions:');
  console.log('1. Pour les tables accessibles, vérifiez que les noms de champs correspondent à ceux attendus dans le script d\'import.');
  console.log('2. Si aucune table n\'est accessible, vérifiez les permissions du token ou générez-en un nouveau.');
  console.log('3. Vérifiez aussi que l\'ID de la base est correct (appVH6EitfYVkeG9S).');
}

// Exécuter le test
testTableAccess();
