
import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
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
        .select('*')
        .eq('is_active', true);

      // Application des filtres
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.collection && filters.collection !== 'all') {
        query = query.eq('collection_slug', filters.collection);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured);
      }

      // Note: is_popular et is_new ne sont pas encore dans le schéma
      // Ces filtres seront ignorés pour l'instant

      // Tri
      switch (filters?.sort) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        default:
          // Par défaut, tri par featured puis par created_at
          query = query.order('is_featured', { ascending: false })
                      .order('created_at', { ascending: false });
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
        slug: item.sku || item.id, // Utiliser SKU comme slug ou ID en fallback
        description: item.description || '',
        price: Number(item.price) || 0,
        original_price: undefined, // Pas encore dans le schéma
        specifications: {}, // Pas encore dans le schéma
        is_new: false, // Pas encore dans le schéma
        is_popular: false, // Pas encore dans le schéma
        is_featured: item.is_featured || false,
        in_stock: item.is_active && item.stock_quantity > 0,
        stock_quantity: item.stock_quantity || 0,
        review_count: item.review_count || 0,
        images: item.images || [],
        features: [], // À implémenter si nécessaire
        collection: item.collection_slug || '',
        category: item.category || 'lifestyle',
        color: [], // À extraire des spécifications si nécessaire
        usage: 'quotidien', // À mapper depuis les données si nécessaire
        genre: 'mixte', // À mapper depuis les données si nécessaire
        rating: Number(item.rating) || 0,
        // Alias pour compatibilité
        reviewCount: item.review_count || 0,
        originalPrice: undefined, // Pas encore dans le schéma
        inStock: item.is_active && item.stock_quantity > 0,
        isNew: false, // Pas encore dans le schéma
        isPopular: false, // Pas encore dans le schéma
        created_at: item.created_at
      })) as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour un produit spécifique par slug/SKU
export const useProduct = (slug: string) => {
  return useQuery({
    queryFn: async () => {
        .from('products')
        .select('*')
        .or(`sku.eq.${slug},id.eq.${slug}`)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return null;
      }

      // Conversion similaire à useProducts
      return {
        id: data.id,
        name: data.name,
        slug: data.sku || data.id,
        description: data.description || '',
        price: Number(data.price) || 0,
        original_price: undefined, // Pas encore dans le schéma
        specifications: {}, // Pas encore dans le schéma
        is_new: false, // Pas encore dans le schéma
        is_popular: false, // Pas encore dans le schéma
        is_featured: data.is_featured || false,
        in_stock: data.is_active && data.stock_quantity > 0,
        stock_quantity: data.stock_quantity || 0,
        review_count: data.review_count || 0,
        images: data.images || [],
        features: [],
        collection: data.collection_slug || '',
        category: data.category || 'lifestyle',
        color: [],
        usage: 'quotidien',
        genre: 'mixte',
        rating: Number(data.rating) || 0,
        reviewCount: data.review_count || 0,
        originalPrice: undefined, // Pas encore dans le schéma
        inStock: data.is_active && data.stock_quantity > 0,
        isNew: false, // Pas encore dans le schéma
        isPopular: false, // Pas encore dans le schéma
        created_at: data.created_at
      } as Product;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
};

// Hooks spécialisés pour maintenir la compatibilité
export const usePopularProducts = (count: number = 5) => {
  return useProducts({ 
    is_featured: true, // Utiliser is_featured comme proxy pour popular
    limit: count,
    sort: 'rating'
  });
};

export const useFeaturedProducts = (count: number = 5) => {
  return useProducts({ 
    is_featured: true, 
    limit: count,
    sort: 'featured'
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
