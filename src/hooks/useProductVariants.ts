import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductVariant {
  id: string;
  product_id: string;
  sku?: string;
  color_frame?: string;
  color_lens?: string;
  price: number;
  has_audio: boolean;
  created_at: string;
  updated_at: string;
}

export const useProductVariants = (productSlug: string) => {
  return useQuery({
    queryKey: ['product_variants', productSlug],
    queryFn: async () => {
      if (!productSlug) throw new Error('Product slug is required');
      
      // D'abord, récupérer le produit par son slug
      const { data: products, error: productError } = await supabase
        .from('products')
        .select('id, name')
        .eq('is_active', true);
        
      if (productError) throw productError;
      
      // Importer la fonction generateProductSlug
      const generateProductSlug = (name: string): string => {
        return name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      // Trouver le produit par slug généré
      const product = products?.find(p => generateProductSlug(p.name) === productSlug);
      
      if (!product) {
        throw new Error('Product not found');
      }

      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', product.id)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data.map(variant => ({
        id: variant.id,
        product_id: variant.product_id,
        sku: variant.sku,
        color_frame: variant.color_frame,
        color_lens: variant.color_lens,
        price: variant.price,
        has_audio: variant.has_audio,
        created_at: variant.created_at,
        updated_at: variant.updated_at
      })) as ProductVariant[];
    },
    enabled: !!productSlug,
  });
};
