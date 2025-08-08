import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { varianteService } from '@/api/services/varianteService';
import type { CreateVarianteDto, UpdateVarianteDto } from '@/types/variante';

/**
 * Hook pour récupérer toutes les variantes d'un produit
 * @param produitId Identifiant du produit
 */
export function useProductVariantesNew(produitId: string | undefined) {
  return useQuery({
    queryKey: ['variantes', produitId],
    queryFn: () => {
      if (!produitId) throw new Error('Product ID is required');
      return varianteService.getVariantesByProductId(produitId);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch variantes');
    },
    enabled: !!produitId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour récupérer une variante par son ID
 * @param id Identifiant de la variante
 */
export function useVarianteNew(id: string | undefined) {
  return useQuery({
    queryKey: ['variante', id],
    queryFn: () => {
      if (!id) throw new Error('Variante ID is required');
      return varianteService.getVarianteById(id);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch variante');
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour créer une nouvelle variante
 */
export function useCreateVarianteNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateVarianteDto) => 
      varianteService.createVariante(data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des variantes pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['variantes', variables.produitId]
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
 * Hook pour créer plusieurs variantes en une seule opération
 */
export function useCreateManyVariantesNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { produitId: string, variantes: Omit<CreateVarianteDto, 'produitId'>[] }) => 
      varianteService.createManyVariantes(data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des variantes pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['variantes', variables.produitId]
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
 * Hook pour mettre à jour une variante existante
 */
export function useUpdateVarianteNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateVarianteDto }) => 
      varianteService.updateVariante(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache de cette variante spécifique
        queryClient.invalidateQueries({
          queryKey: ['variante', variables.id]
        });
        
        // Si nous avons un produitId, invalider le cache des variantes pour ce produit
        if (variables.data.produitId) {
          queryClient.invalidateQueries({
            queryKey: ['variantes', variables.data.produitId]
          });
        }
        
        // Sinon, nous devons récupérer la variante pour connaître son produitId
        // et invalider les variantes de ce produit
        else {
          queryClient.invalidateQueries({
            queryKey: ['variantes']
          });
        }
      }
    }
  });
}

/**
 * Hook pour supprimer une variante
 */
export function useDeleteVarianteNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, produitId }: { id: string, produitId: string }) => 
      varianteService.deleteVariante(id),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des variantes pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['variantes', variables.produitId]
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
 * Hook pour vérifier si un SKU existe déjà
 */
export function useCheckSkuExistsNew() {
  return useMutation({
    mutationFn: ({ sku, varianteId }: { sku: string, varianteId?: string }) => 
      varianteService.checkSkuExists(sku, varianteId)
  });
}
