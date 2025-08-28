// Configuration WordPress basée sur le fichier wordpress.example.ts

export const WORDPRESS_CONFIG = {
  // 🔧 CONFIGURATION REQUISE
  // URL du site WordPress
  BASE_URL: 'https://wordpress.example.com', // À remplacer avec la vraie URL en production
  
  // Endpoints de l'API REST WordPress
  API_BASE: '/wp-json/wp/v2',
  
  // 🔐 AUTHENTIFICATION (à configurer si nécessaire)
  AUTH: {
    // À configurer selon les besoins
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
  
  // 🔌 TYPES DE CONTENU PERSONNALISÉS
  CUSTOM_POST_TYPES: {
    // À configurer si nécessaire
  },
  
  // 📋 CHAMPS PERSONNALISÉS
  CUSTOM_FIELDS: {
    // À configurer si nécessaire
  }
};
