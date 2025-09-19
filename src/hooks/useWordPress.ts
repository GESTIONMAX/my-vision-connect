import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wordpressApi, type WordPressProduct, type WordPressCollection } from '@/services/wordpressApi';
import { WORDPRESS_CONFIG } from '@/config/wordpress';

/**
 * Hook pour récupérer tous les produits WordPress
 */
export function useWordPressProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  featured?: boolean;
  search?: string;
}) {
  return useQuery({
    queryKey: ['wordpress-products', params],
    queryFn: () => wordpressApi.getProducts(params),
    staleTime: WORDPRESS_CONFIG.cache.products,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer un produit WordPress par ID ou slug
 */
export function useWordPressProduct(idOrSlug: string | number | undefined) {
  return useQuery({
    queryKey: ['wordpress-product', idOrSlug],
    queryFn: () => {
      if (!idOrSlug) throw new Error('Product ID or slug is required');
      return wordpressApi.getProduct(idOrSlug);
    },
    enabled: !!idOrSlug,
    staleTime: WORDPRESS_CONFIG.cache.products,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer toutes les collections WordPress
 */
export function useWordPressCollections(params?: {
  page?: number;
  per_page?: number;
  hide_empty?: boolean;
}) {
  return useQuery({
    queryKey: ['wordpress-collections', params],
    queryFn: () => wordpressApi.getCollections(params),
    staleTime: WORDPRESS_CONFIG.cache.collections,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer une collection WordPress par ID ou slug
 */
export function useWordPressCollection(idOrSlug: string | number | undefined) {
  return useQuery({
    queryKey: ['wordpress-collection', idOrSlug],
    queryFn: () => {
      if (!idOrSlug) throw new Error('Collection ID or slug is required');
      return wordpressApi.getCollection(idOrSlug);
    },
    enabled: !!idOrSlug,
    staleTime: WORDPRESS_CONFIG.cache.collections,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer les produits d'une collection spécifique
 */
export function useWordPressProductsByCollection(collectionId: string | number | undefined) {
  return useQuery({
    queryKey: ['wordpress-products-by-collection', collectionId],
    queryFn: () => {
      if (!collectionId) throw new Error('Collection ID is required');
      return wordpressApi.getProductsByCollection(collectionId);
    },
    enabled: !!collectionId,
    staleTime: WORDPRESS_CONFIG.cache.products,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer les spécifications d'un produit
 */
export function useWordPressProductSpecifications(productId: string | number | undefined) {
  return useQuery({
    queryKey: ['wordpress-product-specifications', productId],
    queryFn: () => {
      if (!productId) throw new Error('Product ID is required');
      return wordpressApi.getProductSpecifications(productId);
    },
    enabled: !!productId,
    staleTime: WORDPRESS_CONFIG.cache.defaultTtl,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour rechercher des produits WordPress
 */
export function useWordPressProductSearch(
  query: string,
  filters?: {
    category?: string;
    price_min?: number;
    price_max?: number;
    featured?: boolean;
  },
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['wordpress-product-search', query, filters],
    queryFn: () => wordpressApi.searchProducts(query, filters),
    enabled: enabled && !!query,
    staleTime: WORDPRESS_CONFIG.cache.defaultTtl,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer les médias d'un produit
 */
export function useWordPressProductMedia(productId: string | number | undefined) {
  return useQuery({
    queryKey: ['wordpress-product-media', productId],
    queryFn: () => {
      if (!productId) throw new Error('Product ID is required');
      return wordpressApi.getProductMedia(productId);
    },
    enabled: !!productId,
    staleTime: WORDPRESS_CONFIG.cache.media,
    refetchOnWindowFocus: false,
  });
}

// ==========================================
// HELPERS DE TRANSFORMATION
// ==========================================

/**
 * Transforme un produit WordPress en format utilisable par les composants
 */
export function transformWordPressProduct(wpProduct: WordPressProduct) {
  const carbonFields = wpProduct.carbon_fields || {};
  
  return {
    id: wpProduct.id.toString(),
    name: wpProduct.title.rendered,
    slug: wpProduct.slug,
    description: wpProduct.excerpt.rendered.replace(/<[^>]*>/g, ''), // Strip HTML
    description_short: wpProduct.excerpt.rendered.replace(/<[^>]*>/g, ''),
    description_long: wpProduct.content.rendered,
    
    // Prix
    price: carbonFields.price_base || 0,
    price_base: carbonFields.price_base || 0,
    original_price: carbonFields.price_original,
    
    // Statuts
    is_featured: carbonFields.is_featured || false,
    is_new: carbonFields.is_new || false,
    is_active: wpProduct.status === 'publish',
    in_stock: (carbonFields.stock_quantity || 0) > 0,
    stock_quantity: carbonFields.stock_quantity || 0,
    
    // Catégorisation
    category: carbonFields.category || 'lifestyle',
    collection: carbonFields.collection || '',
    usage: carbonFields.usage_type || 'quotidien',
    genre: carbonFields.target_audience || 'mixte',
    
    // Images
    images: carbonFields.gallery?.map(img => img.url) || [],
    
    // Caractéristiques
    specifications: carbonFields.specifications || {},
    features: carbonFields.features || [],
    
    // Évaluation (à implémenter selon vos besoins)
    rating: 0, // TODO: Implémenter un système de notation
    review_count: 0,
    
    // Métadonnées WordPress
    created_at: wpProduct.date,
    updated_at: wpProduct.date, // WordPress ne fournit pas modified dans l'API standard
    
    // SKU
    sku: carbonFields.sku || '',
  };
}

/**
 * Transforme une collection WordPress en format utilisable
 */
export function transformWordPressCollection(wpCollection: WordPressCollection) {
  const carbonFields = wpCollection.carbon_fields || {};
  
  return {
    id: wpCollection.id.toString(),
    name: wpCollection.name,
    slug: wpCollection.slug,
    description: wpCollection.description,
    description_long: carbonFields.description_long || wpCollection.description,
    
    // Image d'en-tête
    hero_image: carbonFields.hero_image?.url || '',
    
    // Type de collection
    collection_type: carbonFields.collection_type || 'lifestyle',
    
    // Produits vedettes
    featured_products: carbonFields.featured_products || [],
    
    // Métadonnées
    product_count: wpCollection.count,
    launch_date: carbonFields.launch_date,
  };
}

/**
 * Hook combiné pour récupérer et transformer les produits
 */
export function useTransformedWordPressProducts(params?: Parameters<typeof useWordPressProducts>[0]) {
  const query = useWordPressProducts(params);
  
  return {
    ...query,
    data: query.data ? query.data.map(transformWordPressProduct) : undefined,
  };
}

/**
 * Hook combiné pour récupérer et transformer un produit
 */
export function useTransformedWordPressProduct(idOrSlug: string | number | undefined) {
  const query = useWordPressProduct(idOrSlug);
  
  return {
    ...query,
    data: query.data ? transformWordPressProduct(query.data) : undefined,
  };
}