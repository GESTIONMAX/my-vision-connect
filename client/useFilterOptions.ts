
import { useQuery } from '@tanstack/react-query';

export interface FilterOption {
  id: string;
  filter_type: string;
  name: string;
  value: string;
  hex_color?: string;
  sort_order: number;
}

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ['filter_options'],
    queryFn: async () => {
        .from('filter_options')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as FilterOption[];
    },
  });
};
