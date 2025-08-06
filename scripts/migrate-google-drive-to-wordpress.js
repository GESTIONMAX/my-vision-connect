#!/usr/bin/env node

/**
 * Script de migration Google Drive vers WordPress
 * Ce script vous guide pour migrer vos assets depuis Google Drive vers WordPress
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Script de migration Google Drive → WordPress pour Chamelo');
console.log('=====================================================\n');

console.log('📋 ÉTAPES DE MIGRATION:');
console.log('');

console.log('1️⃣ PRÉPARATION GOOGLE DRIVE');
console.log('   • Organisez vos dossiers selon cette structure:');
console.log('     Chamelo-Assets/');
console.log('     ├── music-shield/');
console.log('     │   ├── base/');
console.log('     │   │   ├── hero-front.jpg');
console.log('     │   │   ├── hero-side.jpg');
console.log('     │   │   └── lifestyle-front.jpg');
console.log('     │   ├── variants/');
console.log('     │   │   ├── black-smoke/');
console.log('     │   │   │   ├── variant-front.jpg');
console.log('     │   │   │   ├── variant-side.jpg');
console.log('     │   │   │   └── variant-angle.jpg');
console.log('     │   │   └── white-clear/');
console.log('     │   └── options/');
console.log('     ├── sport-pro/');
console.log('     └── urban-classic/');
console.log('');

console.log('2️⃣ TÉLÉCHARGEMENT DEPUIS GOOGLE DRIVE');
console.log('   • Sélectionnez le dossier Chamelo-Assets');
console.log('   • Clic droit → Télécharger');
console.log('   • Décompressez le fichier ZIP');
console.log('');

console.log('3️⃣ ORGANISATION POUR WORDPRESS');
console.log('   • Créez la structure dans wp-content/uploads/products/');
console.log('   • Respectez exactement les noms de dossiers et fichiers');
console.log('');

console.log('4️⃣ UPLOAD VERS WORDPRESS');
console.log('   Méthode A - Via FTP/SFTP:');
console.log('   • Connectez-vous à votre serveur WordPress');
console.log('   • Uploadez dans wp-content/uploads/products/');
console.log('');
console.log('   Méthode B - Via WordPress Media Library:');
console.log('   • Admin WordPress → Médias → Ajouter');
console.log('   • Uploadez par lot en respectant la structure');
console.log('');

console.log('5️⃣ VÉRIFICATION');
console.log('   • Testez quelques URLs dans votre navigateur:');
console.log('   • https://votre-site.com/wp-content/uploads/products/music-shield/base/hero-front.jpg');
console.log('   • https://votre-site.com/wp-content/uploads/products/music-shield/variants/black-smoke/variant-front.jpg');
console.log('');

console.log('6️⃣ CONFIGURATION DE L\'APPLICATION');
console.log('   • Mettez à jour WORDPRESS_URL dans votre fichier de configuration');
console.log('   • Testez l\'affichage des produits dans l\'application');
console.log('');

console.log('📁 STRUCTURE FINALE ATTENDUE:');
console.log('wp-content/uploads/products/');
console.log('├── music-shield/');
console.log('│   ├── base/');
console.log('│   │   ├── hero-front.jpg      (Image principale face)');
console.log('│   │   ├── hero-side.jpg       (Image principale profil)');
console.log('│   │   ├── hero-angle.jpg      (Image principale angle)');
console.log('│   │   ├── lifestyle-front.jpg (Image lifestyle)');
console.log('│   │   └── technical-front.jpg (Schéma technique)');
console.log('│   ├── variants/');
console.log('│   │   ├── black-smoke/');
console.log('│   │   │   ├── variant-front.jpg');
console.log('│   │   │   ├── variant-side.jpg');
console.log('│   │   │   └── variant-angle.jpg');
console.log('│   │   ├── white-clear/');
console.log('│   │   └── blue-mirror/');
console.log('│   └── options/');
console.log('│       ├── protection-case/');
console.log('│       └── cleaning-kit/');
console.log('├── sport-pro/');
console.log('└── urban-classic/');
console.log('');

console.log('🔧 CONFIGURATION APPLICATION:');
console.log('Dans src/utils/wordpressAssets.ts:');
console.log('export const WORDPRESS_CONFIG = {');
console.log('  baseUrl: "https://votre-wordpress.com",');
console.log('  mediaPath: "/wp-content/uploads",');
console.log('  // ... reste de la config');
console.log('};');
console.log('');

console.log('✅ VÉRIFICATIONS FINALES:');
console.log('• Toutes les images se chargent correctement');
console.log('• Les variants affichent leurs images spécifiques');
console.log('• Les fallbacks fonctionnent en cas d\'image manquante');
console.log('• Les performances sont optimales (utilisez WebP si possible)');
console.log('');

console.log('🚀 Votre migration est prête ! Les images seront automatiquement');
console.log('   chargées depuis WordPress avec fallback vers Supabase si nécessaire.');

// Créer un fichier de configuration d'exemple
const configExample = `
// Configuration WordPress pour les assets Chamelo
export const WORDPRESS_CONFIG = {
  baseUrl: "https://votre-wordpress.com", // ⬅️ MODIFIER ICI
  mediaPath: "/wp-content/uploads",
  apiEndpoint: "/wp-json/wp/v2/media"
};

// URLs d'exemple générées:
// ${process.env.WORDPRESS_URL || 'https://votre-wordpress.com'}/wp-content/uploads/products/music-shield/base/hero-front.jpg
// ${process.env.WORDPRESS_URL || 'https://votre-wordpress.com'}/wp-content/uploads/products/music-shield/variants/black-smoke/variant-front.jpg
`;

fs.writeFileSync('wordpress-config-example.txt', configExample);
console.log('📄 Fichier de configuration créé: wordpress-config-example.txt');