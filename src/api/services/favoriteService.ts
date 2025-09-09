import { apiClient } from '../client';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { Favorite, CreateFavoriteDto, FavoriteFilters } from '@/types/favorite';

/**
 * Service pour gérer les opérations API liées aux favoris
 */
export const favoriteService = {
  /**
   * Récupère tous les favoris de l'utilisateur courant
   * @param filters Options de filtrage et pagination
   */
  getFavorites: async (filters?: FavoriteFilters) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Favorite>>>('/new/favoris', {
      params: filters
    });
    return response.data;
  },
  
  /**
   * Vérifie si un produit est dans les favoris de l'utilisateur
   * @param produitId Identifiant du produit
   */
  isFavorite: async (produitId: string) => {
    const response = await apiClient.get<ApiResponse<{isFavorite: boolean}>>(`/new/favoris/check/${produitId}`);
    return response.data;
  },
  
  /**
   * Ajoute un produit aux favoris
   * @param data Données du favori à créer
   */
  addFavorite: async (data: CreateFavoriteDto) => {
    const response = await apiClient.post<ApiResponse<Favorite>>('/new/favoris', data);
    return response.data;
  },
  
  /**
   * Supprime un produit des favoris
   * @param produitId Identifiant du produit à retirer des favoris
   */
  removeFavorite: async (produitId: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/new/favoris/produit/${produitId}`);
    return response.data;
  },
  
  /**
   * Supprime un favori par son identifiant
   * @param id Identifiant du favori à supprimer
   */
  deleteFavorite: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/new/favoris/${id}`);
    return response.data;
  },
  
  /**
   * Supprime tous les favoris de l'utilisateur courant
   */
  clearAllFavorites: async () => {
    const response = await apiClient.delete<ApiResponse<void>>('/new/favoris');
    return response.data;
  }
};
