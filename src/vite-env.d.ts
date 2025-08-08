/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_USE_NEW_API: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  readonly WORDPRESS_CLIENT_KEY: string;
  readonly WORDPRESS_CLIENT_SECRET: string;
  readonly WOOCOMMERCE_CONSUMER_KEY: string;
  // Autres variables d'environnement...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
