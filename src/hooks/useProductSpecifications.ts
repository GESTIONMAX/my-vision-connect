import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_category: string;
  spec_name: string;
  spec_value: string;
  spec_unit?: string;
  display_order: number;
  is_highlight: boolean;
  created_at: string;
}

export const useProductSpecifications = (productId: string) => {
  return useQuery({
    queryKey: ['product_specifications', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_specifications')
        .select('*')
        .eq('product_id', productId)
        .order('spec_category', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductSpecification[];
    },
    enabled: !!productId,
  });
};

export const useProductSpecificationsByCategory = (productId: string, category: string) => {
  return useQuery({
    queryKey: ['product_specifications', productId, category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_specifications')
        .select('*')
        .eq('product_id', productId)
        .eq('spec_category', category)
        .order('display_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductSpecification[];
    },
    enabled: !!productId && !!category,
  });
};

export const useHighlightedSpecifications = (productId: string) => {
  return useQuery({
    queryKey: ['highlighted_specifications', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_specifications')
        .select('*')
        .eq('product_id', productId)
        .eq('is_highlight', true)
        .order('display_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductSpecification[];
    },
    enabled: !!productId,
  });
};

export const useGroupedSpecifications = (productId: string) => {
  return useQuery({
    queryKey: ['grouped_specifications', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_specifications')
        .select('*')
        .eq('product_id', productId)
        .order('spec_category', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      // Grouper par catégorie
      const grouped = (data as ProductSpecification[]).reduce((acc, spec) => {
        if (!acc[spec.spec_category]) {
          acc[spec.spec_category] = [];
        }
        acc[spec.spec_category].push(spec);
        return acc;
      }, {} as Record<string, ProductSpecification[]>);

      return grouped;
    },
    enabled: !!productId,
  });
};