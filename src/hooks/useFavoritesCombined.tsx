/**
 * Hooks combinés pour les favoris qui servent de point d'entrée unique
 * Ils basculent automatiquement entre l'ancienne implémentation Supabase
 * et la nouvelle implémentation API REST/Prisma selon la configuration
 */
import { shouldUseNewApi } from '../utils/migration';
import type { FavoriteFilters } from '../types/favorite';

// Import des deux implémentations
import {
  useFavorites as useFavoritesSupabase,
  useIsFavorite as useIsFavoriteSupabase,
  useAddToFavorites as useAddToFavoritesSupabase,
  useRemoveFromFavorites as useRemoveFromFavoritesSupabase,
  useToggleFavorite as useToggleFavoriteSupabase,
  type UserFavorite
} from './useFavorites';

import {
  useFavoritesNew,
  useIsFavoriteNew,
  useAddFavoriteNew,
  useRemoveFavoriteNew,
  useToggleFavoriteNew,
  useClearFavoritesNew
} from './useFavoritesNew';

// Hooks combinés qui choisissent l'implémentation en fonction de la configuration
export const useFavorites = shouldUseNewApi()
  ? useFavoritesNew
  : useFavoritesSupabase;

export const useIsFavorite = shouldUseNewApi()
  ? useIsFavoriteNew
  : useIsFavoriteSupabase;

export const useAddToFavorites = shouldUseNewApi()
  ? () => {
    const addFavorite = useAddFavoriteNew();
    return {
      ...addFavorite,
      mutate: (produitId: string) => addFavorite.mutate(produitId),
      mutateAsync: async (produitId: string) => await addFavorite.mutateAsync(produitId)
    };
  }
  : useAddToFavoritesSupabase;

export const useRemoveFromFavorites = shouldUseNewApi()
  ? () => {
    const removeFavorite = useRemoveFavoriteNew();
    return {
      ...removeFavorite,
      mutate: (produitId: string) => removeFavorite.mutate(produitId),
      mutateAsync: async (produitId: string) => await removeFavorite.mutateAsync(produitId)
    };
  }
  : useRemoveFromFavoritesSupabase;

export const useToggleFavorite = shouldUseNewApi()
  ? () => {
    const toggleFavorite = useToggleFavoriteNew();
    return {
      toggleFavorite: toggleFavorite.toggle,
      isLoading: toggleFavorite.isLoading
    };
  }
  : useToggleFavoriteSupabase;

// Nouveau hook disponible uniquement dans la nouvelle API
export const useClearFavorites = shouldUseNewApi()
  ? useClearFavoritesNew
  : () => {
    // Fallback pour compatibilité - pour l'instant ne fait rien
    return {
      mutate: () => {},
      mutateAsync: async () => ({ success: false, message: 'Non disponible avec Supabase' }),
      isPending: false,
      isError: false,
      error: null
    };
  };

// Re-exporter les types
export type { UserFavorite };
export type { FavoriteFilters };
