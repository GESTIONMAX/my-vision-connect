import { useQuery } from '@tanstack/react-query';

export interface ProductSpecification {
  product_id: string;
  specification_id: string;
  value: string;
  unit?: string;
  display_order: number;
  is_highlight: boolean;
}

export const useProductSpecifications = (productId: string) => {
  return useQuery({
    queryKey: ['product_specifications', productId],
    queryFn: async () => {
        .from('product_specifications')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data.map(item => ({
        product_id: item.product_id,
        specification_id: item.specification_id,
        value: item.value,
        unit: item.unit,
        display_order: item.display_order,
        is_highlight: item.is_highlight
      })) as ProductSpecification[];
    },
    enabled: !!productId,
  });
};


