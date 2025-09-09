import { apiClient } from '../client';
import type { ApiResponse } from '@/types/api';
import type {
  Variante,
  CreateVarianteDto,
  UpdateVarianteDto,
  CreateManyVariantesDto
} from '@/types/variante';

/**
 * Service pour gérer les opérations API liées aux variantes de produits
 */
export const varianteService = {
  /**
   * Récupère toutes les variantes d'un produit
   * @param produitId Identifiant du produit
   */
  getVariantesByProductId: async (produitId: string) => {
    const response = await apiClient.get<ApiResponse<Variante[]>>(`/new/variantes/produit/${produitId}`);
    return response.data;
  },
  
  /**
   * Récupère une variante par son identifiant
   * @param id Identifiant de la variante
   */
  getVarianteById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Variante>>(`/new/variantes/${id}`);
    return response.data;
  },
  
  /**
   * Crée une nouvelle variante
   * @param varianteData Données de la variante à créer
   */
  createVariante: async (varianteData: CreateVarianteDto) => {
    const response = await apiClient.post<ApiResponse<Variante>>('/new/variantes', varianteData);
    return response.data;
  },
  
  /**
   * Crée plusieurs variantes pour un produit
   * @param variantesData Données des variantes à créer
   */
  createManyVariantes: async (variantesData: CreateManyVariantesDto) => {
    const response = await apiClient.post<ApiResponse<Variante[]>>('/new/variantes/batch', variantesData);
    return response.data;
  },
  
  /**
   * Met à jour une variante existante
   * @param id Identifiant de la variante
   * @param varianteData Données de mise à jour de la variante
   */
  updateVariante: async (id: string, varianteData: UpdateVarianteDto) => {
    const response = await apiClient.put<ApiResponse<Variante>>(`/new/variantes/${id}`, varianteData);
    return response.data;
  },
  
  /**
   * Supprime une variante
   * @param id Identifiant de la variante à supprimer
   */
  deleteVariante: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/new/variantes/${id}`);
    return response.data;
  },
  
  /**
   * Vérifie si un SKU existe déjà
   * @param sku Code SKU à vérifier
   * @param varianteId Identifiant de la variante à exclure de la vérification (optionnel)
   */
  checkSkuExists: async (sku: string, varianteId?: string) => {
    const response = await apiClient.get<ApiResponse<{exists: boolean}>>('/new/variantes/check-sku', {
      params: { sku, varianteId }
    });
    return response.data;
  }
};
