
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
  // Nouvelles propriétés enrichies
  lens_technology?: string;
  ecommerce_readiness?: string;
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

// Fonctions de mapping
const mapCategory = (dbCategory: string): 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle' => {
  const categoryMap: { [key: string]: 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle' } = {
    'Sport': 'sport',
    'Lifestyle': 'lifestyle', 
    'Technology': 'pro', // Mapper Technology vers pro
    'Classic': 'classic',
    'Femme': 'femme',
    'Homme': 'homme'
  };
  return categoryMap[dbCategory] || 'lifestyle';
};

const mapUsage = (dbCategory: string): 'quotidien' | 'sport' | 'conduite' | 'travail' => {
  const usageMap: { [key: string]: 'quotidien' | 'sport' | 'conduite' | 'travail' } = {
    'Sport': 'sport',
    'Technology': 'travail',
    'Lifestyle': 'quotidien'
  };
  return usageMap[dbCategory] || 'quotidien';
};

// Fonction pour parser les spécifications depuis ecommerce_readiness
const parseSpecifications = (ecommerceReadiness: string, lensTechnology: string): Record<string, string> => {
  const specs: Record<string, string> = {};
  
  if (ecommerceReadiness) {
    const items = ecommerceReadiness.split(' • ');
    items.forEach((spec, index) => {
      const trimmed = spec.trim();
      if (trimmed) {
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex > 0) {
          specs[trimmed.substring(0, colonIndex)] = trimmed.substring(colonIndex + 1).trim();
        } else {
          const parts = trimmed.split(' ');
          if (parts.length > 1) {
            specs[parts[0]] = parts.slice(1).join(' ');
          } else {
            specs[`Caractéristique ${index + 1}`] = trimmed;
          }
        }
      }
    });
  }
  
  if (lensTechnology) {
    specs['Technologie des verres'] = lensTechnology;
  }
  
  return specs;
};

// Fonction pour transformer un produit Supabase en Product
const transformProduct = (item: any): Product => {
  return {
    id: item.id,
    name: item.name,
    slug: item.sku || item.id,
    description: item.description || '',
    price: Number(item.price) || 0,
    original_price: undefined,
    specifications: parseSpecifications(item.ecommerce_readiness || '', item.lens_technology || ''),
    is_new: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
    is_popular: item.rating >= 4.5 && item.review_count > 100,
    is_featured: item.is_featured || false,
    in_stock: item.is_active && item.stock_quantity > 0,
    stock_quantity: item.stock_quantity || 0,
    review_count: item.review_count || 0,
    images: item.images || [],
    features: [],
    collection: item.collection_slug || '',
    category: mapCategory(item.category || 'Lifestyle'),
    color: [],
    usage: mapUsage(item.category || 'Lifestyle'),
    genre: 'mixte',
    rating: Number(item.rating) || 0,
    reviewCount: item.review_count || 0,
    originalPrice: undefined,
    inStock: item.is_active && item.stock_quantity > 0,
    isNew: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
    isPopular: item.rating >= 4.5 && item.review_count > 100,
    created_at: item.created_at,
    lens_technology: item.lens_technology,
    ecommerce_readiness: item.ecommerce_readiness
  };
};

// Hook principal pour récupérer les produits depuis Supabase
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['supabase-products', filters],
    queryFn: async () => {
      let query = supabase
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
        specifications: parseSpecifications(item.ecommerce_readiness || '', item.lens_technology || ''),
        is_new: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false, // Nouveau si créé dans les 30 derniers jours
        is_popular: item.rating >= 4.5 && item.review_count > 100, // Populaire si note >= 4.5 et >100 avis
        is_featured: item.is_featured || false,
        in_stock: item.is_active && item.stock_quantity > 0,
        stock_quantity: item.stock_quantity || 0,
        review_count: item.review_count || 0,
        images: item.images || [],
        features: [], // À implémenter si nécessaire
        collection: item.collection_slug || '',
        category: mapCategory(item.category || 'Lifestyle'), // Mapper les catégories correctement
        color: [], // À extraire des spécifications si nécessaire
        usage: mapUsage(item.category || 'Lifestyle'), // Mapper usage depuis category
        genre: 'mixte', // À mapper depuis les données si nécessaire
        rating: Number(item.rating) || 0,
        // Alias pour compatibilité
        reviewCount: item.review_count || 0,
        originalPrice: undefined, // Pas encore dans le schéma
        inStock: item.is_active && item.stock_quantity > 0,
        isNew: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        isPopular: item.rating >= 4.5 && item.review_count > 100,
        created_at: item.created_at
      })) as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour un produit spécifique par slug/SKU
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['supabase-product', slug],
    queryFn: async () => {
      // D'abord essayer par SKU
      const { data: productBySku, error: skuError } = await supabase
        .from('products')
        .select('*')
        .eq('sku', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (skuError) {
        throw new Error(skuError.message);
      }

      if (productBySku) {
        return transformProduct(productBySku);
      }

      // Si pas trouvé par SKU, essayer par ID uniquement si le slug ressemble à un UUID
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
      
      if (isUUID) {
        const { data: productById, error: idError } = await supabase
          .from('products')
          .select('*')
          .eq('id', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (idError) {
          throw new Error(idError.message);
        }

        if (productById) {
          return transformProduct(productById);
        }
      }

      return null;
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
