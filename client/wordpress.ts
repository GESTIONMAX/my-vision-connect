// Configuration centralisée pour WordPress
export const WORDPRESS_CONFIG = {
  // URL de base de votre site WordPress (à personnaliser)
  BASE_URL: 'http://wordpress-kk4gw0gs40ock4800ccoogkk.91.99.22.54.sslip.io',
  
  // Endpoints de l'API REST WordPress
  API_BASE: '/wp-json/wp/v2',
  
  // Paramètres par défaut pour les requêtes
  DEFAULT_PARAMS: {
    _embed: true, // Inclure les médias et métadonnées associées
    per_page: 10, // Nombre d'éléments par page par défaut
  },
  
  // Configuration du cache (en millisecondes)
  CACHE_TIMES: {
    POSTS: 5 * 60 * 1000,        // 5 minutes pour les posts
    PAGES: 10 * 60 * 1000,       // 10 minutes pour les pages  
    CATEGORIES: 30 * 60 * 1000,  // 30 minutes pour les catégories
    TAGS: 30 * 60 * 1000,        // 30 minutes pour les tags
    SEARCH: 1 * 60 * 1000,       // 1 minute pour les recherches
  },
  
  // Paramètres d'authentification (optionnels)
  AUTH: {
    // Utilisez les Application Passwords de WordPress pour l'authentification
    // username: 'your-username',
    // password: 'your-app-password',
    
    // Ou utilisez JWT si vous avez installé le plugin JWT Authentication
    // jwt: 'your-jwt-token',
  },
  
  // Paramètres de formatage
  FORMATTING: {
    EXCERPT_LENGTH: 150,  // Longueur des extraits générés
    DATE_LOCALE: 'fr-FR', // Locale pour le formatage des dates
  },
  
  // Types de contenu personnalisés (si vous en utilisez)
  CUSTOM_POST_TYPES: {
    // Exemple : 'portfolio', 'testimonials', 'products', etc.
  },
  
  // Champs personnalisés (ACF, Pods, etc.)
  CUSTOM_FIELDS: {
    // Exemple : featured_image_alt, custom_excerpt, etc.
  }
};

// Types pour la configuration
export interface WordPressEndpoint {
  url: string;
  cache: number;
  auth?: boolean;
}

// Fonction pour valider la configuration
export const validateWordPressConfig = (): boolean => {
  if (!WORDPRESS_CONFIG.BASE_URL || WORDPRESS_CONFIG.BASE_URL === 'https://your-wordpress-site.com') {
    console.warn('⚠️ WordPress: BASE_URL non configurée. Veuillez modifier src/config/wordpress.ts');
    return false;
  }
  
  try {
    new URL(WORDPRESS_CONFIG.BASE_URL);
    return true;
  } catch {
    console.error('❌ WordPress: BASE_URL invalide');
    return false;
  }
};

// Fonction pour construire les URLs d'API
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = WORDPRESS_CONFIG.BASE_URL.replace(/\/$/, '');
  const apiBase = WORDPRESS_CONFIG.API_BASE;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${baseUrl}${apiBase}${cleanEndpoint}`;
};

// Configuration pour différents environnements
export const getWordPressConfig = (environment: 'development' | 'staging' | 'production' = 'production') => {
  const configs = {
    development: {
      ...WORDPRESS_CONFIG,
      BASE_URL: 'http://localhost:8000', // WordPress local
    },
    staging: {
      ...WORDPRESS_CONFIG,
      BASE_URL: 'https://staging.your-wordpress-site.com',
    },
    production: {
      ...WORDPRESS_CONFIG,
      BASE_URL: 'https://your-wordpress-site.com',
    },
  };
  
  return configs[environment];
};