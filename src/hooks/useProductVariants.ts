
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export const useProductVariants = (productSlug: string) => {
  return useQuery({
    queryKey: ['product-variants', productSlug],
    queryFn: async () => {
      // Get variants for Music Shield products
      if (productSlug === 'music-shield' || productSlug === 'music-shield-standard') {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('slug', ['music-shield', 'music-shield-standard'])
          .order('price', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        // Transform the data to match the expected format
        return data.map((product: any): Product => ({
          ...product,
          rating: 4.5,
          reviewCount: product.review_count || 0,
          originalPrice: product.original_price,
          inStock: product.in_stock,
          isNew: product.is_new,
          isPopular: product.is_popular,
          category: (product.category as Product['category']) || 'lifestyle',
          usage: (product.usage as Product['usage']) || 'quotidien',
          genre: (product.genre as Product['genre']) || 'mixte',
          created_at: product.created_at,
        }));
      }

      // For other products, return empty array (no variants)
      return [];
    },
  });
};
