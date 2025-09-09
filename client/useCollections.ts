
import { useQuery } from '@tanstack/react-query';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  sort_order: number | null;
  image_url: string | null;
  created_at: string | null;
}

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
        .from('collections')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as Collection[];
    },
  });
};
