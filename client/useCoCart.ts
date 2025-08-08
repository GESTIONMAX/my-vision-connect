import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cocartApi, CoCartApiParams, cocartUtils } from '@/services/cocartApi';

// Hook pour les produits via CoCart
export const useCoCartProducts = (params?: CoCartApiParams) => {
  return useQuery({
    queryKey: ['cocart-products', params],
    queryFn: async () => {
      const products = await cocartApi.getProducts(params);
      return products.map(cocartUtils.convertProduct);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour un produit spécifique par slug
export const useCoCartProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['cocart-product', slug],
    queryFn: async () => {
      const products = await cocartApi.getProductBySlug(slug);
      return products.length > 0 ? cocartUtils.convertProduct(products[0]) : null;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
};

// Hook pour les produits populaires
export const useCoCartPopularProducts = (count: number = 5) => {
  return useQuery({
    queryKey: ['cocart-popular-products', count],
    queryFn: async () => {
      const products = await cocartApi.getProducts({ 
        featured: true, 
        per_page: count,
        orderby: 'popularity',
        order: 'desc'
      });
      return products.map(cocartUtils.convertProduct);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook pour les nouveaux produits
export const useCoCartNewProducts = (count: number = 5) => {
  return useQuery({
    queryKey: ['cocart-new-products', count],
    queryFn: async () => {
      const products = await cocartApi.getProducts({ 
        per_page: count,
        orderby: 'date',
        order: 'desc'
      });
      return products.map(cocartUtils.convertProduct);
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Hook pour les catégories de produits
export const useCoCartCategories = () => {
  return useQuery({
    queryKey: ['cocart-categories'],
    queryFn: () => cocartApi.getProductCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook pour la recherche de produits
export const useCoCartSearch = (query: string, params?: CoCartApiParams) => {
  return useQuery({
    queryKey: ['cocart-search', query, params],
    queryFn: async () => {
      const products = await cocartApi.searchProducts(query, params);
      return products.map(cocartUtils.convertProduct);
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!query && query.length > 2,
  });
};

// Hooks pour le panier (force de CoCart)
export const useCoCartCart = () => {
  return useQuery({
    queryKey: ['cocart-cart'],
    queryFn: () => cocartApi.getCart(),
    staleTime: 30 * 1000, // 30 secondes
  });
};

// Mutations pour le panier
export const useCoCartAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => 
      cocartApi.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocart-cart'] });
    },
  });
};

export const useCoCartUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemKey, quantity }: { itemKey: string; quantity: number }) => 
      cocartApi.updateCartItem(itemKey, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocart-cart'] });
    },
  });
};

export const useCoCartRemoveCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (itemKey: string) => cocartApi.removeCartItem(itemKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocart-cart'] });
    },
  });
};

export const useCoCartClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => cocartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocart-cart'] });
    },
  });
};