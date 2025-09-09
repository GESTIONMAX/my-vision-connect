import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteService } from '../api/services/favoriteService';
import type { CreateFavoriteDto, FavoriteFilters, Favorite } from '../types/favorite';
import type { ApiResponse } from '../types/api';
import { useAuthNew } from './useAuthNew';

/**
 * Hook pour récupérer tous les favoris de l'utilisateur courant
 * @param filters Options de filtrage et pagination
 */
export function useFavoritesNew(filters?: FavoriteFilters) {
  const { isAuthenticated } = useAuthNew();

  return useQuery({
    queryKey: ['favorites', filters],
    queryFn: () => favoriteService.getFavorites(filters),
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch favorites');
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour vérifier si un produit est dans les favoris
 * @param produitId Identifiant du produit à vérifier
 */
export function useIsFavoriteNew(produitId: string | undefined) {
  const { isAuthenticated } = useAuthNew();

  return useQuery({
    queryKey: ['favorite-check', produitId],
    queryFn: () => {
      if (!produitId) throw new Error('Product ID is required');
      return favoriteService.isFavorite(produitId);
    },
    select: (response) => {
      if (response.success) {
        return response.data.isFavorite;
      }
      return false;
    },
    enabled: !!produitId && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour ajouter un produit aux favoris
 */
export function useAddFavoriteNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (produitId: string) => 
      favoriteService.addFavorite({ produitId }),
    onSuccess: (response, produitId) => {
      if (response.success) {
        // Invalider le cache des favoris
        queryClient.invalidateQueries({
          queryKey: ['favorites']
        });
        
        // Mettre à jour le statut de favori pour ce produit
        queryClient.setQueryData(['favorite-check', produitId], { 
          success: true, 
          data: { isFavorite: true } 
        });
      }
    }
  });
}

/**
 * Hook pour retirer un produit des favoris
 */
export function useRemoveFavoriteNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (produitId: string) => 
      favoriteService.removeFavorite(produitId),
    onSuccess: (response, produitId) => {
      if (response.success) {
        // Invalider le cache des favoris
        queryClient.invalidateQueries({
          queryKey: ['favorites']
        });
        
        // Mettre à jour le statut de favori pour ce produit
        queryClient.setQueryData(['favorite-check', produitId], { 
          success: true, 
          data: { isFavorite: false } 
        });
      }
    }
  });
}

/**
 * Hook pour basculer l'état favori d'un produit (ajouter/retirer)
 */
export function useToggleFavoriteNew() {
  const addMutation = useAddFavoriteNew();
  const removeMutation = useRemoveFavoriteNew();
  const queryClient = useQueryClient();

  const toggle = async (produitId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        return await removeMutation.mutateAsync(produitId);
      } else {
        return await addMutation.mutateAsync(produitId);
      }
    } finally {
      // Toujours invalider les caches liés aux favoris
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite-check', produitId]
      });
    }
  };

  return {
    toggle,
    isLoading: addMutation.isPending || removeMutation.isPending,
    error: addMutation.error || removeMutation.error
  };
}

/**
 * Hook pour supprimer tous les favoris
 */
export function useClearFavoritesNew() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => favoriteService.clearAllFavorites(),
    onSuccess: (response: ApiResponse<void>) => {
      if (response.success) {
        // Invalider tous les caches liés aux favoris
        queryClient.invalidateQueries({
          queryKey: ['favorites']
        });
        queryClient.invalidateQueries({
          queryKey: ['favorite-check']
        });
      }
    }
  });
}
