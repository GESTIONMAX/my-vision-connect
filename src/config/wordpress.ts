/**
 * Configuration WordPress Headless + Carbon Fields
 */
export const WORDPRESS_CONFIG = {
  // URL de base de votre instance WordPress
  baseUrl: import.meta.env.VITE_WP_URL || 'https://your-wordpress-site.com',
  
  // Endpoints API WordPress
  endpoints: {
    // WordPress REST API standard
    posts: '/wp-json/wp/v2/posts',
    pages: '/wp-json/wp/v2/pages',
    media: '/wp-json/wp/v2/media',
    categories: '/wp-json/wp/v2/categories',
    tags: '/wp-json/wp/v2/tags',
    
    // Carbon Fields API (si vous utilisez le plugin REST API)
    carbonFields: '/wp-json/carbon-fields/v1',
    
    // Custom Post Types (à adapter selon votre configuration)
    products: '/wp-json/wp/v2/products',
    collections: '/wp-json/wp/v2/collections',
    specifications: '/wp-json/wp/v2/specifications',
  },
  
  // Configuration d'authentification
  auth: {
    // Application Passwords (recommandé pour headless)
    applicationPassword: {
      enabled: true,
      username: import.meta.env.VITE_WP_USERNAME || '',
      password: import.meta.env.VITE_WP_APP_PASSWORD || '',
    },
    
    // JWT (alternative)
    jwt: {
      enabled: false,
      endpoint: '/wp-json/jwt-auth/v1/token',
    }
  },
  
  // Configuration de cache
  cache: {
    // Durée de cache par défaut (en millisecondes)
    defaultTtl: 5 * 60 * 1000, // 5 minutes
    
    // Cache spécifique par type de contenu
    products: 10 * 60 * 1000, // 10 minutes
    collections: 30 * 60 * 1000, // 30 minutes
    media: 60 * 60 * 1000, // 1 heure
  }
} as const;

/**
 * Types pour la configuration WordPress
 */
export type WordPressEndpoint = keyof typeof WORDPRESS_CONFIG.endpoints;

/**
 * Helper pour construire les URLs complètes
 */
export const buildWordPressUrl = (endpoint: string): string => {
  return `${WORDPRESS_CONFIG.baseUrl}${endpoint}`;
};

/**
 * Helper pour les headers d'authentification
 */
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (WORDPRESS_CONFIG.auth.applicationPassword.enabled) {
    const { username, password } = WORDPRESS_CONFIG.auth.applicationPassword;
    if (username && password) {
      const credentials = btoa(`${username}:${password}`);
      headers.Authorization = `Basic ${credentials}`;
    }
  }

  return headers;
};