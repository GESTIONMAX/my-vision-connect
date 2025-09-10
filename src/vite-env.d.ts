/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly WORDPRESS_CLIENT_KEY: string;
  readonly WORDPRESS_CLIENT_SECRET: string;
  readonly WOOCOMMERCE_CONSUMER_KEY: string;
  // Autres variables d'environnement...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
