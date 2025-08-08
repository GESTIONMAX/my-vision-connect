import { useQuery } from '@tanstack/react-query';
import { productService } from '@/api/services/productService';
import type { ProductFilters } from '@/types/product';

/**
 * Hook pour récupérer et filtrer des produits depuis l'API REST
 * @param filters Options de filtrage et pagination
 */
export function useProductsNew(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    select: (response) => {
      // Extraire les données de la réponse API
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch products');
    },
    // Options de cache et refetch
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer un produit par son ID depuis l'API REST
 * @param id Identifiant du produit
 */
export function useProductNew(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) throw new Error('Product ID is required');
      return productService.getProductById(id);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch product');
    },
    // Ne pas exécuter la requête si l'ID n'est pas défini
    enabled: !!id,
    // Options de cache et refetch
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer les produits d'une collection
 * @param collectionId Identifiant de la collection
 */
export function useCollectionProductsNew(collectionId: string | undefined) {
  return useQuery({
    queryKey: ['collection-products', collectionId],
    queryFn: () => {
      if (!collectionId) throw new Error('Collection ID is required');
      return productService.getProductsByCollection(collectionId);
    },
    select: (response) => {
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch collection products');
    },
    enabled: !!collectionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
