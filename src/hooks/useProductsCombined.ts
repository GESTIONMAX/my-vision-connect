/**
 * Hooks combinés pour les produits qui servent de point d'entrée unique
 * Ils basculent automatiquement entre l'ancienne implémentation Supabase
 * et la nouvelle implémentation API REST/Prisma selon la configuration
 */
import { shouldUseNewApi } from '../utils/migration';

// Import des deux implémentations
import { 
  useProducts as useProductsSupabase,
  useProduct as useProductSupabase,
  usePopularProducts as usePopularProductsSupabase,
  useFeaturedProducts as useFeaturedProductsSupabase,
  useNewProducts as useNewProductsSupabase,
  useProductSearch as useProductSearchSupabase,
  type Product as ProductSupabase,
  type ProductFilters as ProductFiltersSupabase
} from './useProducts';

import {
  useProductsNew,
  useProductNew,
  useCollectionProductsNew,
} from './useProductsNew';

import type { ProductFilters } from '@/types/product';

// Hooks combinés qui choisissent l'implémentation en fonction de la configuration
export const useProducts = shouldUseNewApi() 
  ? (filters?: ProductFilters) => useProductsNew(filters) 
  : useProductsSupabase;

export const useProduct = shouldUseNewApi()
  ? useProductNew
  : useProductSupabase;

// Pour les hooks spécialisés, nous utilisons les filtres correspondants avec le nouveau système
export const usePopularProducts = shouldUseNewApi()
  ? (count: number = 5) => useProductsNew({ limit: count, isPopular: true })
  : usePopularProductsSupabase;

export const useFeaturedProducts = shouldUseNewApi()
  ? (count: number = 5) => useProductsNew({ limit: count, isFeatured: true })
  : useFeaturedProductsSupabase;

export const useNewProducts = shouldUseNewApi()
  ? (count: number = 5) => useProductsNew({ limit: count, sort: 'newest' })
  : useNewProductsSupabase;

export const useProductSearch = shouldUseNewApi()
  ? (searchQuery: string, filters?: ProductFilters) => useProductsNew({
      ...filters,
      search: searchQuery
    })
  : useProductSearchSupabase;

// Nouveau hook disponible uniquement dans la nouvelle API
export const useCollectionProducts = shouldUseNewApi()
  ? useCollectionProductsNew
  : (collectionId: string | undefined) => {
      // Fallback pour compatibilité - utilise le hook général avec un filtre de collection
      return useProductsSupabase({ collection: collectionId });
    };

// Re-exporter les types
export type Product = ProductSupabase;
export type { ProductFilters };
