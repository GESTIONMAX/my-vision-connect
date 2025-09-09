import { useQuery } from '@tanstack/react-query';
import { Product } from './useProducts';

/**
 * Génère un slug à partir du nom du produit
 */
export type { Product } from './useProducts';

export const generateProductSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Hook pour récupérer un produit par son slug
 */
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');
      
        .from('products')
        .select(`
          *,
          product_collections(
            collections(
              id,
              slug
            )
          )
        `)
        .eq('is_active', true);
        
      if (error) throw error;
      
      // Trouver le produit par slug généré
      const productData = products?.find(p => generateProductSlug(p.name) === slug);
      
      if (!productData) {
        throw new Error('Product not found');
      }
      
      return {
        id: productData.id,
        name: productData.name,
        slug: generateProductSlug(productData.name),
        description: productData.description_long || '',
        description_short: productData.description_short,
        description_long: productData.description_long,
        price: Number(productData.price_base) || 0,
        price_base: Number(productData.price_base) || 0,
        original_price: undefined,
        specifications: {},
        is_new: productData.created_at ? new Date(productData.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        is_popular: false,
        is_featured: false,
        in_stock: productData.is_active || false,
        stock_quantity: 0,
        review_count: 0,
        images: [],
        features: [],
        collection: productData.product_collections?.[0]?.collections?.slug || '',
        category: 'lifestyle' as const,
        color: [],
        usage: 'quotidien' as const,
        genre: 'mixte' as const,
        rating: 0,
        reviewCount: 0,
        originalPrice: undefined,
        inStock: productData.is_active || false,
        isNew: productData.created_at ? new Date(productData.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        isPopular: false,
        created_at: productData.created_at,
        updated_at: productData.updated_at,
        is_active: productData.is_active
      } as Product;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook pour récupérer tous les produits
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
        .from('products')
        .select(`
          *,
          product_collections(
            collections(
              id,
              slug
            )
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: generateProductSlug(item.name),
        description: item.description_long || '',
        description_short: item.description_short,
        description_long: item.description_long,
        price: Number(item.price_base) || 0,
        price_base: Number(item.price_base) || 0,
        original_price: undefined,
        specifications: {},
        is_new: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        is_popular: false,
        is_featured: false,
        in_stock: item.is_active || false,
        stock_quantity: 0,
        review_count: 0,
        images: [],
        features: [],
        collection: item.product_collections?.[0]?.collections?.slug || '',
        category: 'lifestyle' as const,
        color: [],
        usage: 'quotidien' as const,
        genre: 'mixte' as const,
        rating: 0,
        reviewCount: 0,
        originalPrice: undefined,
        inStock: item.is_active || false,
        isNew: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        isPopular: false,
        created_at: item.created_at,
        updated_at: item.updated_at,
        is_active: item.is_active
      })) as Product[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook pour récupérer les produits d'une collection
 */
export const useProductsByCollection = (collectionSlug: string) => {
  return useQuery({
    queryKey: ['products', 'collection', collectionSlug],
    queryFn: async () => {
        .from('products')
        .select(`
          *,
          product_collections!inner(
            collections!inner(
              slug
            )
          )
        `)
        .eq('is_active', true)
        .eq('product_collections.collections.slug', collectionSlug)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: generateProductSlug(item.name),
        description: item.description_long || '',
        description_short: item.description_short,
        description_long: item.description_long,
        price: Number(item.price_base) || 0,
        price_base: Number(item.price_base) || 0,
        original_price: undefined,
        specifications: {},
        is_new: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        is_popular: false,
        is_featured: false,
        in_stock: item.is_active || false,
        stock_quantity: 0,
        review_count: 0,
        images: [],
        features: [],
        collection: collectionSlug,
        category: 'lifestyle' as const,
        color: [],
        usage: 'quotidien' as const,
        genre: 'mixte' as const,
        rating: 0,
        reviewCount: 0,
        originalPrice: undefined,
        inStock: item.is_active || false,
        isNew: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        isPopular: false,
        created_at: item.created_at,
        updated_at: item.updated_at,
        is_active: item.is_active
      })) as Product[];
    },
    enabled: !!collectionSlug,
    staleTime: 1000 * 60 * 5,
  });
};