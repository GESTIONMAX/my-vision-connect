import { ApiResponse } from '../../types/api';
import { apiClient } from '../client';

/**
 * Interface pour les collections de produits
 */
export interface Collection {
  id: number;
  nom: string;
  description?: string;
  dateCreation: string;
  dateModification?: string;
  nombreProduits?: number;
  image?: string;
}

/**
 * Service pour la gestion des collections
 */
export const collectionService = {
  /**
   * Récupérer toutes les collections
   */
  getAllCollections: async (): Promise<ApiResponse<Collection[]>> => {
    return apiClient.get<Collection[]>('/api/collections');
  },

  /**
   * Récupérer une collection par ID
   */
  getCollectionById: async (id: number): Promise<ApiResponse<Collection>> => {
    return apiClient.get<Collection>(`/api/collections/${id}`);
  },

  /**
   * Récupérer les produits d'une collection
   */
  getCollectionProducts: async (id: number): Promise<ApiResponse<any[]>> => {
    return apiClient.get<any[]>(`/api/collections/${id}/produits`);
  },

  /**
   * Créer une nouvelle collection
   */
  createCollection: async (data: Partial<Collection>): Promise<ApiResponse<Collection>> => {
    return apiClient.post<Collection>('/api/collections', data);
  },

  /**
   * Mettre à jour une collection
   */
  updateCollection: async (id: number, data: Partial<Collection>): Promise<ApiResponse<Collection>> => {
    return apiClient.put<Collection>(`/api/collections/${id}`, data);
  },

  /**
   * Supprimer une collection
   */
  deleteCollection: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/api/collections/${id}`);
  }
};
