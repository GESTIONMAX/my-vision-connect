import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { specificationService } from '@/api/services/specificationService';
import type { CreateSpecificationDto, UpdateSpecificationDto } from '@/types/specification';

/**
 * Hook pour récupérer toutes les spécifications d'un produit
 * @param produitId Identifiant du produit
 */
export function useProductSpecificationsNew(produitId: string | undefined) {
  return useQuery({
    queryKey: ['specifications', produitId],
    queryFn: () => {
      if (!produitId) throw new Error('Product ID is required');
      return specificationService.getSpecificationsByProductId(produitId);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch specifications');
    },
    enabled: !!produitId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour récupérer les spécifications groupées d'un produit
 * @param produitId Identifiant du produit
 */
export function useGroupedSpecificationsNew(produitId: string | undefined) {
  return useQuery({
    queryKey: ['specifications', produitId, 'grouped'],
    queryFn: () => {
      if (!produitId) throw new Error('Product ID is required');
      return specificationService.getGroupedSpecifications(produitId);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch grouped specifications');
    },
    enabled: !!produitId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour récupérer une spécification par son ID
 * @param id Identifiant de la spécification
 */
export function useSpecificationNew(id: string | undefined) {
  return useQuery({
    queryKey: ['specification', id],
    queryFn: () => {
      if (!id) throw new Error('Specification ID is required');
      return specificationService.getSpecificationById(id);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch specification');
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour créer une nouvelle spécification
 */
export function useCreateSpecificationNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSpecificationDto) => 
      specificationService.createSpecification(data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des spécifications pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['specifications', variables.produitId]
        });
        
        // Mettre à jour le cache des produits associés si nécessaire
        queryClient.invalidateQueries({
          queryKey: ['product', variables.produitId]
        });
      }
    }
  });
}

/**
 * Hook pour créer plusieurs spécifications en une seule opération
 */
export function useCreateManySpecificationsNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { produitId: string, specifications: Omit<CreateSpecificationDto, 'produitId'>[] }) => 
      specificationService.createManySpecifications(data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des spécifications pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['specifications', variables.produitId]
        });
        
        // Mettre à jour le cache des produits associés
        queryClient.invalidateQueries({
          queryKey: ['product', variables.produitId]
        });
      }
    }
  });
}

/**
 * Hook pour mettre à jour une spécification existante
 */
export function useUpdateSpecificationNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateSpecificationDto }) => 
      specificationService.updateSpecification(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache de cette spécification spécifique
        queryClient.invalidateQueries({
          queryKey: ['specification', variables.id]
        });
        
        // Si nous avons un produitId, invalider le cache des spécifications pour ce produit
        if (variables.data.produitId) {
          queryClient.invalidateQueries({
            queryKey: ['specifications', variables.data.produitId]
          });
        }
        
        // Sinon, nous devons invalider toutes les spécifications
        else {
          queryClient.invalidateQueries({
            queryKey: ['specifications']
          });
        }
      }
    }
  });
}

/**
 * Hook pour supprimer une spécification
 */
export function useDeleteSpecificationNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, produitId }: { id: string, produitId: string }) => 
      specificationService.deleteSpecification(id),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des spécifications pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['specifications', variables.produitId]
        });
        
        // Mettre à jour le cache des produits associés si nécessaire
        queryClient.invalidateQueries({
          queryKey: ['product', variables.produitId]
        });
      }
    }
  });
}
