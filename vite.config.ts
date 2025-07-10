import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configuration pour le build
  build: {
    outDir: "dist",
    // Assurer que l'historique de navigation HTML5 fonctionne correctement
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // Base URL - important pour les sous-dossiers de déploiement
  base: "/"
}));
