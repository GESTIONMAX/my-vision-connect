import { apiClient } from '../client';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { 
  Product, 
  ProductFilters, 
  CreateProductDto,
  UpdateProductDto
} from '@/types/product';

/**
 * Service pour gérer les opérations API liées aux produits
 */
export const productService = {
  /**
   * Récupère une liste de produits avec filtrage optionnel
   * @param filters Options de filtrage et pagination
   */
  getProducts: async (filters?: ProductFilters) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>('/new/produits', { 
      params: filters 
    });
    return response.data;
  },
  
  /**
   * Récupère un produit par son identifiant
   * @param id Identifiant du produit
   */
  getProductById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Product>>(`/new/produits/${id}`);
    return response.data;
  },
  
  /**
   * Crée un nouveau produit
   * @param productData Données du produit à créer
   */
  createProduct: async (productData: CreateProductDto) => {
    const response = await apiClient.post<ApiResponse<Product>>('/new/produits', productData);
    return response.data;
  },
  
  /**
   * Met à jour un produit existant
   * @param id Identifiant du produit
   * @param productData Données de mise à jour du produit
   */
  updateProduct: async (id: string, productData: UpdateProductDto) => {
    const response = await apiClient.put<ApiResponse<Product>>(`/new/produits/${id}`, productData);
    return response.data;
  },
  
  /**
   * Supprime un produit
   * @param id Identifiant du produit à supprimer
   */
  deleteProduct: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/new/produits/${id}`);
    return response.data;
  },
  
  /**
   * Récupère tous les produits d'une collection
   * @param collectionId Identifiant de la collection
   */
  getProductsByCollection: async (collectionId: string) => {
    const response = await apiClient.get<ApiResponse<Product[]>>(`/new/produits/collection/${collectionId}`);
    return response.data;
  },
  
  /**
   * Récupère tous les produits pour un sportif cible
   * @param sportifCibleId Identifiant du sportif cible
   */
  getProductsBySportifCible: async (sportifCibleId: string) => {
    const response = await apiClient.get<ApiResponse<Product[]>>(`/new/produits/sportif-cible/${sportifCibleId}`);
    return response.data;
  }
};
