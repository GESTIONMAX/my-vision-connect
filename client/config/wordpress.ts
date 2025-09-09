// Configuration WordPress pour MyTechGear

export const WORDPRESS_CONFIG = {
  // CONFIGURATION REQUISE
  // URL du site WordPress
  BASE_URL: import.meta.env.VITE_WORDPRESS_API_URL || 'https://votre-site-wordpress.com',
  
  // Endpoints de l'API REST WordPress
  API_BASE: '/wp-json/wp/v2',
  JWT_AUTH: '/jwt-auth/v1',
  
  // AUTHENTIFICATION
  AUTH: {
    // Endpoints d'authentification
    ENDPOINTS: {
      LOGIN: '/token',
      VALIDATE: '/token/validate',
      REFRESH: '/token/refresh',
      REGISTER: '/users/register',
      PROFILE: '/wp/v2/users/me',
    },
    // Configuration du token JWT
    TOKEN: {
      STORAGE_KEY: 'wordpress_jwt_token',
      REFRESH_KEY: 'wordpress_refresh_token',
      EXPIRY_BUFFER: 300, // 5 minutes avant l'expiration pour le rafraîchissement
    },
  },
  
  // PARAMÈTRES PAR DÉFAUT
  DEFAULT_PARAMS: {
    _embed: true,  // Inclure les médias et métadonnées
    per_page: 10,  // Nombre d'éléments par page
  },
  
  // CONFIGURATION DU CACHE (en millisecondes)
  CACHE_TIMES: {
    POSTS: 5 * 60 * 1000,        // 5 minutes
    PAGES: 10 * 60 * 1000,       // 10 minutes
    CATEGORIES: 30 * 60 * 1000,  // 30 minutes
    TAGS: 30 * 60 * 1000,        // 30 minutes
    SEARCH: 1 * 60 * 1000,       // 1 minute
  },
  
  // CONFIGURATION DES TENTATIVES DE REQUÊTES
  RETRY_CONFIG: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 seconde
  },
  
  // CONFIGURATION RESPONSIVE
  RESPONSIVE: {
    BREAKPOINTS: {
      MOBILE: 480,
      TABLET: 768,
      DESKTOP: 1024,
    },
  },
} as const;

// Types utilitaires
type ValueOf<T> = T[keyof T];
export type WordPressConfig = typeof WORDPRESS_CONFIG;
export type AuthEndpoints = ValueOf<typeof WORDPRESS_CONFIG.AUTH.ENDPOINTS>;
