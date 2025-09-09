import { apiClient } from '../client';
import type { ApiResponse } from '@/types/api';
import type {
  ProductConfiguration,
  CreateProductConfigurationDto,
  UpdateProductConfigurationDto,
  PriceCalculationRequest,
  PriceCalculationResult
} from '@/types/productConfig';

/**
 * Service pour gérer les opérations API liées aux configurations de produits
 */
export const productConfigService = {
  /**
   * Récupère toutes les configurations de produits de l'utilisateur courant
   */
  getUserConfigurations: async () => {
    const response = await apiClient.get<ApiResponse<ProductConfiguration[]>>('/new/product-configurations');
    return response.data;
  },
  
  /**
   * Récupère une configuration de produit par son identifiant
   * @param id Identifiant de la configuration
   */
  getConfigurationById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<ProductConfiguration>>(`/new/product-configurations/${id}`);
    return response.data;
  },
  
  /**
   * Récupère les configurations de l'utilisateur pour un produit spécifique
   * @param produitId Identifiant du produit
   */
  getConfigurationsForProduct: async (produitId: string) => {
    const response = await apiClient.get<ApiResponse<ProductConfiguration[]>>(`/new/product-configurations/produit/${produitId}`);
    return response.data;
  },
  
  /**
   * Crée une nouvelle configuration de produit
   * @param data Données de la configuration à créer
   */
  createConfiguration: async (data: CreateProductConfigurationDto) => {
    const response = await apiClient.post<ApiResponse<ProductConfiguration>>('/new/product-configurations', data);
    return response.data;
  },
  
  /**
   * Met à jour une configuration existante
   * @param id Identifiant de la configuration
   * @param data Données de mise à jour de la configuration
   */
  updateConfiguration: async (id: string, data: UpdateProductConfigurationDto) => {
    const response = await apiClient.put<ApiResponse<ProductConfiguration>>(`/new/product-configurations/${id}`, data);
    return response.data;
  },
  
  /**
   * Supprime une configuration
   * @param id Identifiant de la configuration à supprimer
   */
  deleteConfiguration: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/new/product-configurations/${id}`);
    return response.data;
  },
  
  /**
   * Calcule le prix pour une configuration donnée
   * @param data Données pour le calcul de prix
   */
  calculatePrice: async (data: PriceCalculationRequest) => {
    const response = await apiClient.post<ApiResponse<PriceCalculationResult>>('/new/product-configurations/calculate-price', data);
    return response.data;
  }
};
