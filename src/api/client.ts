import axios from 'axios';

// Configuration de l'URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important pour les cookies d'authentification
});

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les réponses et erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion globale des erreurs
    if (error.response) {
      // Erreur 401 - Non autorisé
      if (error.response.status === 401) {
        localStorage.removeItem('auth_token');
        // Redirection vers la page de connexion si on est pas déjà dessus
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Gestion des erreurs de validation
      if (error.response.status === 422 && error.response.data?.errors) {
        return Promise.reject({
          ...error,
          validationErrors: error.response.data.errors
        });
      }
    }
    
    return Promise.reject(error);
  }
);

// Fonctions utilitaires pour les appels API
export const api = {
  get: (url: string, config = {}) => apiClient.get(url, config),
  post: (url: string, data: any, config = {}) => apiClient.post(url, data, config),
  put: (url: string, data: any, config = {}) => apiClient.put(url, data, config),
  delete: (url: string, config = {}) => apiClient.delete(url, config),
  patch: (url: string, data: any, config = {}) => apiClient.patch(url, data, config)
};

export default apiClient;
