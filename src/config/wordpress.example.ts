// Exemple de configuration WordPress
// Copiez ce fichier vers wordpress.ts et personnalisez les valeurs

export const WORDPRESS_CONFIG = {
  // 🔧 CONFIGURATION REQUISE
  // Remplacez par l'URL de votre site WordPress
  BASE_URL: 'https://votre-site-wordpress.com',
  
  // Endpoints de l'API REST WordPress (ne pas modifier)
  API_BASE: '/wp-json/wp/v2',
  
  // 📝 EXEMPLES DE CONFIGURATION POUR DIFFÉRENTS CAS :
  
  // Cas 1: WordPress.com hébergé
  // BASE_URL: 'https://monsite.wordpress.com',
  
  // Cas 2: WordPress auto-hébergé
  // BASE_URL: 'https://mondomaine.com',
  
  // Cas 3: WordPress avec sous-dossier
  // BASE_URL: 'https://mondomaine.com/blog',
  
  // Cas 4: WordPress local (développement)
  // BASE_URL: 'http://localhost:8000',
  
  // 🔐 AUTHENTIFICATION (optionnelle pour contenu public)
  AUTH: {
    // Méthode 1: Application Passwords (recommandée)
    // Aller dans WordPress Admin > Utilisateurs > Profil > Application Passwords
    // username: 'votre-nom-utilisateur',
    // password: 'xxxx xxxx xxxx xxxx', // Format: 4 groupes de 4 caractères
    
    // Méthode 2: JWT Token (nécessite un plugin JWT)
    // jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
  },
  
  // ⚙️ PARAMÈTRES PAR DÉFAUT
  DEFAULT_PARAMS: {
    _embed: true,  // Inclure les médias et métadonnées
    per_page: 10,  // Nombre d'éléments par page
  },
  
  // 🕐 CONFIGURATION DU CACHE (en millisecondes)
  CACHE_TIMES: {
    POSTS: 5 * 60 * 1000,        // 5 minutes
    PAGES: 10 * 60 * 1000,       // 10 minutes
    CATEGORIES: 30 * 60 * 1000,  // 30 minutes
    TAGS: 30 * 60 * 1000,        // 30 minutes
    SEARCH: 1 * 60 * 1000,       // 1 minute
  },
  
  // 🎨 PARAMÈTRES D'AFFICHAGE
  FORMATTING: {
    EXCERPT_LENGTH: 150,   // Longueur des extraits
    DATE_LOCALE: 'fr-FR',  // Format des dates
  },
  
  // 🔌 TYPES DE CONTENU PERSONNALISÉS (si vous en utilisez)
  CUSTOM_POST_TYPES: {
    // Exemples:
    // 'portfolio': '/wp-json/wp/v2/portfolio',
    // 'testimonials': '/wp-json/wp/v2/testimonials',
  },
  
  // 📋 CHAMPS PERSONNALISÉS (ACF, Pods, etc.)
  CUSTOM_FIELDS: {
    // Exemples:
    // 'featured_image_alt': 'acf.featured_image_alt',
    // 'custom_excerpt': 'acf.custom_excerpt',
  }
};

// 🚀 ÉTAPES POUR CONFIGURER :
/*

1. COPIEZ CE FICHIER :
   cp src/config/wordpress.example.ts src/config/wordpress.ts

2. MODIFIEZ BASE_URL :
   Remplacez 'https://votre-site-wordpress.com' par l'URL de votre WordPress

3. TESTEZ L'API :
   Allez sur : https://votre-site-wordpress.com/wp-json/wp/v2/posts
   Vous devriez voir vos articles en JSON

4. AUTHENTIFICATION (optionnelle) :
   - Pour du contenu public : pas besoin d'authentification
   - Pour du contenu privé : configurez username/password ou JWT

5. VÉRIFIEZ LES CORS :
   Si vous avez des erreurs CORS, ajoutez ce code à functions.php :
   
   function allow_cors() {
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
       header("Access-Control-Allow-Headers: Content-Type, Authorization");
   }
   add_action('rest_api_init', 'allow_cors');

6. PLUGINS RECOMMANDÉS :
   - Yoast SEO (pour les métadonnées)
   - Advanced Custom Fields (pour les champs personnalisés)
   - JWT Authentication (pour l'auth JWT)

*/

// 🔍 COMMENT TESTER VOTRE CONFIGURATION :
/*

1. Dans la console du navigateur :
   fetch('https://votre-site-wordpress.com/wp-json/wp/v2/posts')
     .then(r => r.json())
     .then(console.log)

2. Vérifiez que vous obtenez une liste d'articles

3. Si erreur 404 : l'API REST n'est pas activée
4. Si erreur CORS : configurez les headers CORS
5. Si erreur 401/403 : problème d'authentification

*/