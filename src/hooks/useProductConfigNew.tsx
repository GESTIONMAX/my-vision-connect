import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productConfigService } from '@/api/services/productConfigService';
import type { 
  CreateProductConfigurationDto,
  UpdateProductConfigurationDto,
  PriceCalculationRequest
} from '@/types/productConfig';
import { useAuthNew } from './useAuthNew';

/**
 * Hook pour récupérer toutes les configurations de l'utilisateur courant
 */
export function useUserConfigurationsNew() {
  const { isAuthenticated } = useAuthNew();

  return useQuery({
    queryKey: ['user-configurations'],
    queryFn: () => productConfigService.getUserConfigurations(),
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch user configurations');
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour récupérer une configuration spécifique
 * @param id Identifiant de la configuration
 */
export function useProductConfigurationNew(id: string | undefined) {
  const { isAuthenticated } = useAuthNew();

  return useQuery({
    queryKey: ['configuration', id],
    queryFn: () => {
      if (!id) throw new Error('Configuration ID is required');
      return productConfigService.getConfigurationById(id);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch configuration');
    },
    enabled: !!id && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour récupérer les configurations d'un produit spécifique
 * @param produitId Identifiant du produit
 */
export function useProductConfigurationsNew(produitId: string | undefined) {
  const { isAuthenticated } = useAuthNew();

  return useQuery({
    queryKey: ['configurations', produitId],
    queryFn: () => {
      if (!produitId) throw new Error('Product ID is required');
      return productConfigService.getConfigurationsForProduct(produitId);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch product configurations');
    },
    enabled: !!produitId && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour calculer le prix d'une configuration
 */
export function useCalculatePriceNew() {
  return useMutation({
    mutationFn: (data: PriceCalculationRequest) => 
      productConfigService.calculatePrice(data),
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to calculate price');
    }
  });
}

/**
 * Hook pour créer une nouvelle configuration
 */
export function useCreateConfigurationNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProductConfigurationDto) => 
      productConfigService.createConfiguration(data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des configurations
        queryClient.invalidateQueries({
          queryKey: ['user-configurations']
        });
        
        // Invalider le cache des configurations pour ce produit
        queryClient.invalidateQueries({
          queryKey: ['configurations', variables.produitId]
        });
      }
    }
  });
}

/**
 * Hook pour mettre à jour une configuration existante
 */
export function useUpdateConfigurationNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateProductConfigurationDto }) => 
      productConfigService.updateConfiguration(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache de cette configuration
        queryClient.invalidateQueries({
          queryKey: ['configuration', variables.id]
        });
        
        // Invalider le cache des configurations de l'utilisateur
        queryClient.invalidateQueries({
          queryKey: ['user-configurations']
        });
        
        // Si nous avons un produitId, invalider le cache des configurations pour ce produit
        if (variables.data.produitId) {
          queryClient.invalidateQueries({
            queryKey: ['configurations', variables.data.produitId]
          });
        }
      }
    }
  });
}

/**
 * Hook pour supprimer une configuration
 */
export function useDeleteConfigurationNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, produitId }: { id: string, produitId?: string }) => 
      productConfigService.deleteConfiguration(id),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalider le cache des configurations de l'utilisateur
        queryClient.invalidateQueries({
          queryKey: ['user-configurations']
        });
        
        // Si nous avons un produitId, invalider le cache des configurations pour ce produit
        if (variables.produitId) {
          queryClient.invalidateQueries({
            queryKey: ['configurations', variables.produitId]
          });
        }
      }
    }
  });
}
