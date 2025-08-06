import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  collection_slug: string | null;
  price: number | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  lens_technology: string | null;
  sku: string | null;
  rating: number | null;
  review_count: number | null;
  stock_quantity: number | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
}

/**
 * Génère un slug à partir du nom du produit
 */
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
      
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
        
      if (error) throw error;
      
      // Trouver le produit par slug généré
      const product = products?.find(p => generateProductSlug(p.name) === slug);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product as Product;
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data as Product[];
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('collection_slug', collectionSlug)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data as Product[];
    },
    enabled: !!collectionSlug,
    staleTime: 1000 * 60 * 5,
  });
};