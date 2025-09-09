import { ApiResponse, PaginatedResponse } from '../../types/api';
import { Produit } from '../../types/product';
// @ts-ignore - Import du client API
import { apiClient } from '../client';

// Interface pour les filtres de produits
export interface ProduitFilters {
  category?: string;
  color?: string;
  shape?: string;
  tech?: string;
  sort?: string;
  collection?: string;
  page?: number;
  pageSize?: number;
  [key: string]: any; // Pour permettre d'autres filtres dynamiques
}

export const productService = {
  /**
   * Récupérer tous les produits avec filtrage optionnel et pagination
   */
  getAllProducts: async (filters?: ProduitFilters): Promise<ApiResponse<PaginatedResponse<Produit>>> => {
    let queryParams = '';
    
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== 'all') {
          params.append(key, String(value));
        }
      });
      queryParams = params.toString();
    }
    
    const url = queryParams ? `/api/produits?${queryParams}` : '/api/produits';
    return apiClient.get<PaginatedResponse<Produit>>(url);
  },

  /**
   * Récupérer un produit par ID
   */
  getProductById: async (id: number): Promise<ApiResponse<Produit>> => {
    return apiClient.get<Produit>(`/api/produits/${id}`);
  },

  /**
   * Créer un nouveau produit
   */
  createProduct: async (data: Partial<Produit>): Promise<ApiResponse<Produit>> => {
    return apiClient.post<Produit>('/api/produits', data);
  },

  /**
   * Mettre à jour un produit
   */
  updateProduct: async (id: number, data: Partial<Produit>): Promise<ApiResponse<Produit>> => {
    return apiClient.put<Produit>(`/api/produits/${id}`, data);
  },

  /**
   * Supprimer un produit
   */
  deleteProduct: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/api/produits/${id}`);
  },

  /**
   * Récupérer les statistiques (pour le dashboard)
   */
  getStats: async (): Promise<ApiResponse<{
    totalProducts: number;
    availableProducts: number;
    lastUpdateDate: string;
  }>> => {
    return apiClient.get('/api/produits/stats');
  }
};
