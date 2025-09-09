import { apiClient } from '../client';
import type { ApiResponse } from '@/types/api';
import type {
  Specification,
  CreateSpecificationDto,
  UpdateSpecificationDto,
  CreateManySpecificationsDto
} from '@/types/specification';

/**
 * Service pour gérer les opérations API liées aux spécifications de produits
 */
export const specificationService = {
  /**
   * Récupère toutes les spécifications d'un produit
   * @param produitId Identifiant du produit
   */
  getSpecificationsByProductId: async (produitId: string) => {
    const response = await apiClient.get<ApiResponse<Specification[]>>(`/new/specifications/produit/${produitId}`);
    return response.data;
  },
  
  /**
   * Récupère une spécification par son identifiant
   * @param id Identifiant de la spécification
   */
  getSpecificationById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Specification>>(`/new/specifications/${id}`);
    return response.data;
  },
  
  /**
   * Crée une nouvelle spécification
   * @param specificationData Données de la spécification à créer
   */
  createSpecification: async (specificationData: CreateSpecificationDto) => {
    const response = await apiClient.post<ApiResponse<Specification>>('/new/specifications', specificationData);
    return response.data;
  },
  
  /**
   * Crée plusieurs spécifications pour un produit
   * @param specificationsData Données des spécifications à créer
   */
  createManySpecifications: async (specificationsData: CreateManySpecificationsDto) => {
    const response = await apiClient.post<ApiResponse<Specification[]>>('/new/specifications/batch', specificationsData);
    return response.data;
  },
  
  /**
   * Met à jour une spécification existante
   * @param id Identifiant de la spécification
   * @param specificationData Données de mise à jour de la spécification
   */
  updateSpecification: async (id: string, specificationData: UpdateSpecificationDto) => {
    const response = await apiClient.put<ApiResponse<Specification>>(`/new/specifications/${id}`, specificationData);
    return response.data;
  },
  
  /**
   * Supprime une spécification
   * @param id Identifiant de la spécification à supprimer
   */
  deleteSpecification: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/new/specifications/${id}`);
    return response.data;
  },
  
  /**
   * Récupère toutes les spécifications groupées par groupe
   * @param produitId Identifiant du produit
   */
  getGroupedSpecifications: async (produitId: string) => {
    const response = await apiClient.get<ApiResponse<Record<string, Specification[]>>>(`/new/specifications/produit/${produitId}/grouped`);
    return response.data;
  }
};
