import { apiClient } from '../client';
import type { ApiResponse } from '@/types/api';
import type { Profile, SignUpData } from '@/types/auth';

/**
 * Type pour les données de connexion
 */
interface LoginData {
  email: string;
  password: string;
}

/**
 * Type pour les données de réinitialisation de mot de passe
 */
interface ResetPasswordData {
  email: string;
}

/**
 * Type pour la réponse d'authentification
 */
interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  profile: Profile;
  token: string;
  refreshToken: string;
}

/**
 * Service pour gérer les opérations API liées à l'authentification
 */
export const authService = {
  /**
   * Connexion d'un utilisateur
   * @param data Données de connexion (email, password)
   */
  login: async (data: LoginData) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    
    if (response.data.success && response.data.data.token) {
      // Stockage du token JWT dans le localStorage
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('refresh_token', response.data.data.refreshToken);
    }
    
    return response.data;
  },
  
  /**
   * Inscription d'un nouvel utilisateur
   * @param data Données d'inscription
   */
  signUp: async (data: SignUpData) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    
    if (response.data.success && response.data.data.token) {
      // Stockage du token JWT dans le localStorage
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('refresh_token', response.data.data.refreshToken);
    }
    
    return response.data;
  },
  
  /**
   * Déconnexion de l'utilisateur
   */
  logout: async () => {
    // Appel optionnel au backend pour invalider le token
    try {
      await apiClient.post<ApiResponse<void>>('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    // Suppression des tokens du localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    
    return { success: true };
  },
  
  /**
   * Récupération du profil utilisateur
   */
  getProfile: async () => {
    const response = await apiClient.get<ApiResponse<Profile>>('/auth/profile');
    return response.data;
  },
  
  /**
   * Mise à jour du profil utilisateur
   * @param data Données du profil à mettre à jour
   */
  updateProfile: async (data: Partial<Profile>) => {
    const response = await apiClient.put<ApiResponse<Profile>>('/auth/profile', data);
    return response.data;
  },
  
  /**
   * Demande de réinitialisation de mot de passe
   * @param data Données pour la réinitialisation (email)
   */
  resetPassword: async (data: ResetPasswordData) => {
    const response = await apiClient.post<ApiResponse<void>>('/auth/reset-password', data);
    return response.data;
  },
  
  /**
   * Vérification de l'authentification en cours
   * @returns L'état d'authentification et les données utilisateur si disponibles
   */
  checkAuth: async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return { authenticated: false, user: null, profile: null };
    }
    
    try {
      const response = await apiClient.get<ApiResponse<{ user: any; profile: Profile }>>('/auth/check');
      
      if (response.data.success) {
        return { 
          authenticated: true, 
          user: response.data.data.user,
          profile: response.data.data.profile 
        };
      } else {
        // Token invalide, nettoyage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        return { authenticated: false, user: null, profile: null };
      }
    } catch (error) {
      // Erreur d'API, probablement token invalide
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      return { authenticated: false, user: null, profile: null };
    }
  },
  
  /**
   * Rafraîchissement du token d'authentification
   */
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return { success: false, message: 'No refresh token available' };
    }
    
    try {
      const response = await apiClient.post<ApiResponse<{ token: string, refreshToken: string }>>('/auth/refresh-token', { refreshToken });
      
      if (response.data.success) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('refresh_token', response.data.data.refreshToken);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: 'Failed to refresh token' };
    }
  }
};
