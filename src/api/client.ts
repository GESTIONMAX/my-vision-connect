import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    if (error.response && error.response.status === 401) {
      // Gérer la déconnexion ou le rafraîchissement du token
      localStorage.removeItem('auth_token');
      // Rediriger vers la page de login si nécessaire
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
