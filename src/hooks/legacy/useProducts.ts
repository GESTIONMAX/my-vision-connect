import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  description_short?: string;
  description_long?: string;
  price: number;
  price_base: number;
  original_price?: number;
  specifications: Record<string, string>;
  is_new: boolean;
  is_popular: boolean;
  is_featured: boolean;
  in_stock: boolean;
  stock_quantity: number;
  review_count: number;
  images: string[];
  features: string[];
  collection: string;
  category: 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle';
  color: string[];
  usage: 'quotidien' | 'sport' | 'conduite' | 'travail';
  genre?: 'mixte' | 'homme' | 'femme';
  rating: number;
  reviewCount: number;
  originalPrice?: number;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

export interface ProductFilters {
  category?: string;
  collection?: string;
  color?: string;
  usage?: string;
  genre?: string;
  search?: string;
  sort?: string;
  is_featured?: boolean;
  is_popular?: boolean;
  is_new?: boolean;
  limit?: number;
}

// Hook principal pour récupérer les produits depuis Supabase
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
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
        .eq('is_active', true);

      // Application des filtres
      if (filters?.collection && filters.collection !== 'all') {
        // Pour les filtres de collection, on doit faire une jointure
          .from('products')
          .select(`
            *,
            product_collections!inner(
              collections!inner(
                id,
                slug
              )
            )
          `)
          .eq('is_active', true)
          .eq('product_collections.collections.slug', filters.collection);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description_long.ilike.%${filters.search}%`);
      }

      // Tri
      switch (filters?.sort) {
        case 'price-asc':
          query = query.order('price_base', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price_base', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      // Limite
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Conversion des données Supabase au format Product
      return (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.id,
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour un produit spécifique par ID
export const useProduct = (id: string) => {
  return useQuery({
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
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        slug: data.id,
        description: data.description_long || '',
        description_short: data.description_short,
        description_long: data.description_long,
        price: Number(data.price_base) || 0,
        price_base: Number(data.price_base) || 0,
        original_price: undefined,
        specifications: {},
        is_new: data.created_at ? new Date(data.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        is_popular: false,
        is_featured: false,
        in_stock: data.is_active || false,
        stock_quantity: 0,
        review_count: 0,
        images: [],
        features: [],
        collection: data.product_collections?.[0]?.collections?.slug || '',
        category: 'lifestyle' as const,
        color: [],
        usage: 'quotidien' as const,
        genre: 'mixte' as const,
        rating: 0,
        reviewCount: 0,
        originalPrice: undefined,
        inStock: data.is_active || false,
        isNew: data.created_at ? new Date(data.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        isPopular: false,
        created_at: data.created_at,
        updated_at: data.updated_at,
        is_active: data.is_active
      } as Product;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

// Hooks spécialisés pour maintenir la compatibilité
export const usePopularProducts = (count: number = 5) => {
  return useProducts({ 
    limit: count
  });
};

export const useFeaturedProducts = (count: number = 5) => {
  return useProducts({ 
    limit: count
  });
};

export const useNewProducts = (count: number = 5) => {
  return useProducts({ 
    limit: count,
    sort: 'newest'
  });
};

// Hook de recherche pour maintenir la compatibilité
export const useProductSearch = (searchQuery: string, filters?: ProductFilters) => {
  return useProducts({
    ...filters,
    search: searchQuery
  });
};