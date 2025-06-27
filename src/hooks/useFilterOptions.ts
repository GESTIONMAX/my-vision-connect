
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase
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
