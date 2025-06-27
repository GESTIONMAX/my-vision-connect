
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
  category: string;
  color: string[];
  usage: string;
  genre?: string;
  rating: number;
  reviewCount: number;
  originalPrice?: number;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Transform the data to match the expected format
      return data.map((product: any): Product => ({
        ...product,
        rating: 4.5, // Default rating since it's not in DB yet
        reviewCount: product.review_count || 0,
        originalPrice: product.original_price,
        inStock: product.in_stock,
        isNew: product.is_new,
        isPopular: product.is_popular,
      }));
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Transform the data to match the expected format
      return {
        ...data,
        rating: 4.5, // Default rating since it's not in DB yet
        reviewCount: data.review_count || 0,
        originalPrice: data.original_price,
        inStock: data.in_stock,
        isNew: data.is_new,
        isPopular: data.is_popular,
      } as Product;
    },
  });
};
