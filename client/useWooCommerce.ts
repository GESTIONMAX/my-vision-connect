import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { woocommerceApi, WooCommerceApiParams, wcUtils } from '@/services/woocommerceApi';

// Hook pour les produits WooCommerce
export const useWooCommerceProducts = (params?: WooCommerceApiParams) => {
  return useQuery({
    queryKey: ['woocommerce-products', params],
    queryFn: async () => {
      const products = await woocommerceApi.getProducts(params);
      return products.map(wcUtils.convertProduct);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour un produit spécifique par slug
export const useWooCommerceProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['woocommerce-product', slug],
    queryFn: async () => {
      const products = await woocommerceApi.getProductBySlug(slug);
      return products.length > 0 ? wcUtils.convertProduct(products[0]) : null;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
};

// Hook pour les produits populaires
export const useWooCommercePopularProducts = (count: number = 5) => {
  return useQuery({
    queryKey: ['woocommerce-popular-products', count],
    queryFn: async () => {
      const products = await woocommerceApi.getProducts({ 
        featured: true, 
        per_page: count,
        orderby: 'popularity',
        order: 'desc'
      });
      return products.map(wcUtils.convertProduct);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook pour les nouveaux produits
export const useWooCommerceNewProducts = (count: number = 5) => {
  return useQuery({
    queryKey: ['woocommerce-new-products', count],
    queryFn: async () => {
      const products = await woocommerceApi.getProducts({ 
        per_page: count,
        orderby: 'date',
        order: 'desc'
      });
      return products.map(wcUtils.convertProduct);
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Hook pour les catégories de produits
export const useWooCommerceCategories = () => {
  return useQuery({
    queryKey: ['woocommerce-categories'],
    queryFn: () => woocommerceApi.getProductCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook pour la recherche de produits
export const useWooCommerceSearch = (query: string, params?: WooCommerceApiParams) => {
  return useQuery({
    queryKey: ['woocommerce-search', query, params],
    queryFn: async () => {
      const products = await woocommerceApi.searchProducts(query, params);
      return products.map(wcUtils.convertProduct);
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!query && query.length > 2,
  });
};

// Hook pour les clients
export const useWooCommerceCustomers = (params?: WooCommerceApiParams) => {
  return useQuery({
    queryKey: ['woocommerce-customers', params],
    queryFn: async () => {
      const customers = await woocommerceApi.getCustomers(params);
      return customers.map(wcUtils.convertCustomer);
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour un client spécifique
export const useWooCommerceCustomer = (id: number) => {
  return useQuery({
    queryKey: ['woocommerce-customer', id],
    queryFn: async () => {
      const customer = await woocommerceApi.getCustomer(id);
      return wcUtils.convertCustomer(customer);
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

// Hook pour les commandes
export const useWooCommerceOrders = (params?: WooCommerceApiParams) => {
  return useQuery({
    queryKey: ['woocommerce-orders', params],
    queryFn: () => woocommerceApi.getOrders(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Mutations pour créer/modifier des données
export const useCreateWooCommerceProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: woocommerceApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['woocommerce-products'] });
    },
  });
};

export const useUpdateWooCommerceProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: any }) => 
      woocommerceApi.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['woocommerce-products'] });
    },
  });
};

export const useCreateWooCommerceCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: woocommerceApi.createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['woocommerce-customers'] });
    },
  });
};

export const useCreateWooCommerceOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: woocommerceApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['woocommerce-orders'] });
    },
  });
};