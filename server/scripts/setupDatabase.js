#!/usr/bin/env node
const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Exécute une commande et affiche sa sortie
 */
function runCommand(command) {
  try {
    console.log(`\n🔄 Exécution de: ${command}\n`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n❌ Erreur lors de l'exécution de la commande: ${command}`);
    console.error(error.message);
    return false;
  }
}

/**
 * Vérifie si le fichier .env existe, sinon le crée à partir de .env.example
 */
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');

  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log(`\n✅ Fichier .env créé à partir de .env.example.`);
      console.log(`⚠️  N'oubliez pas de personnaliser vos variables d'environnement dans .env !`);
    } else {
      console.log(`\n⚠️  Le fichier .env.example n'existe pas. Création d'un fichier .env basique.`);
      fs.writeFileSync(envPath, 'DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/my_vision_connect?schema=public"\nPORT=5000\nJWT_SECRET=changez_moi_en_production\n');
    }
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🔧 Assistant de configuration de la base de données pour My Vision Connect 🔧\n');
  
  // Vérifier le fichier .env
  checkEnvFile();

  // Menu d'options
  const showMenu = () => {
    console.log('\n📋 Que souhaitez-vous faire ?');
    console.log('1. Générer le client Prisma (npx prisma generate)');
    console.log('2. Créer la migration initiale (npx prisma migrate dev --name init)');
    console.log('3. Appliquer les migrations existantes (npx prisma migrate deploy)');
    console.log('4. Créer des données de test (seed)');
    console.log('5. Visualiser la base de données (Prisma Studio)');
    console.log('6. Réinitialiser la base de données (⚠️ Supprime toutes les données)');
    console.log('7. Tout faire (1 + 2 + 4)');
    console.log('0. Quitter');
  };

  const askOption = () => {
    showMenu();
    rl.question('\nEntrez votre choix (0-7): ', async (answer) => {
      switch (answer) {
        case '1':
          runCommand('npx prisma generate');
          askOption();
          break;
        case '2':
          rl.question('\nNom de la migration (defaut: "init"): ', (name) => {
            const migrationName = name || 'init';
            runCommand(`npx prisma migrate dev --name ${migrationName}`);
            askOption();
          });
          break;
        case '3':
          runCommand('npx prisma migrate deploy');
          askOption();
          break;
        case '4':
          runCommand('node -e "require(\'../dist/utils/prismaUtils\').seedDatabase()"');
          askOption();
          break;
        case '5':
          console.log('\n🔍 Lancement de Prisma Studio...');
          console.log('⚠️  Pour revenir à ce menu, fermez Prisma Studio (Ctrl+C dans le terminal)');
          runCommand('npx prisma studio');
          askOption();
          break;
        case '6':
          rl.question('\n⚠️  Cette action va supprimer toutes les données. Êtes-vous sûr ? (oui/non): ', (confirm) => {
            if (confirm.toLowerCase() === 'oui') {
              runCommand('npx prisma migrate reset --force');
            } else {
              console.log('❌ Opération annulée');
            }
            askOption();
          });
          break;
        case '7':
          console.log('\n🚀 Configuration complète de la base de données...');
          runCommand('npx prisma generate');
          runCommand('npx prisma migrate dev --name initial');
          runCommand('node -e "require(\'../dist/utils/prismaUtils\').seedDatabase()"');
          console.log('\n✅ Configuration terminée !');
          askOption();
          break;
        case '0':
          console.log('\n👋 Au revoir !');
          rl.close();
          break;
        default:
          console.log('\n❌ Option invalide, veuillez réessayer.');
          askOption();
      }
    });
  };

  // Démarrer le menu
  askOption();
}

// Exécuter la fonction principale
main().catch(console.error);
