import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku?: string;
  frame_color?: string;
  lens_color?: string;
  hex_color?: string;
  price_modifier: number;
  images: string[];
  stock_quantity: number;
  is_default: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: ['product_variants', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductVariant[];
    },
    enabled: !!productId,
  });
};

export const useDefaultVariant = (productId: string) => {
  return useQuery({
    queryKey: ['default_variant', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .eq('is_default', true)
        .single();

      if (error) {
        // Si pas de variant par défaut, prendre le premier
        const { data: fallback, error: fallbackError } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', productId)
          .order('sort_order', { ascending: true })
          .limit(1)
          .single();

        if (fallbackError) {
          return null;
        }
        return fallback as ProductVariant;
      }

      return data as ProductVariant;
    },
    enabled: !!productId,
  });
};