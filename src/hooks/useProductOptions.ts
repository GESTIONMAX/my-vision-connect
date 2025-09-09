import { useQuery } from '@tanstack/react-query';

export interface ProductOption {
  id: string;
  product_id: string;
  option_type: string;
  name: string;
  description?: string;
  price_modifier: number;
  is_default: boolean;
  is_available: boolean;
  sort_order: number;
  created_at: string;
}

export const useProductOptions = (productId: string) => {
  return useQuery({
    queryKey: ['product_options', productId],
    queryFn: async () => {
        .from('product_options')
        .select('*')
        .eq('product_id', productId)
        .eq('is_available', true)
        .order('option_type', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductOption[];
    },
    enabled: !!productId,
  });
};

export const useProductOptionsByType = (productId: string, optionType: string) => {
  return useQuery({
    queryKey: ['product_options', productId, optionType],
    queryFn: async () => {
        .from('product_options')
        .select('*')
        .eq('product_id', productId)
        .eq('option_type', optionType)
        .eq('is_available', true)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductOption[];
    },
    enabled: !!productId && !!optionType,
  });
};

export const useDefaultOptions = (productId: string) => {
  return useQuery({
    queryKey: ['default_options', productId],
    queryFn: async () => {
        .from('product_options')
        .select('*')
        .eq('product_id', productId)
        .eq('is_default', true)
        .eq('is_available', true);

      if (error) {
        throw new Error(error.message);
      }

      return data as ProductOption[];
    },
    enabled: !!productId,
  });
};