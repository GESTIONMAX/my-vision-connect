
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SubCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_collection_slug: string;
  is_active: boolean;
  sort_order: number | null;
  image_url: string | null;
  created_at: string | null;
}

export const useSubCollections = (parentSlug?: string) => {
  return useQuery({
    queryKey: ['sub_collections', parentSlug],
    queryFn: async () => {
      try {
        // First try to query the sub_collections table directly
        let query = supabase
          .from('sub_collections')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (parentSlug) {
          query = query.eq('parent_collection_slug', parentSlug);
        }

        const { data, error } = await query;

        if (error) {
          console.warn('Sub-collections table query failed:', error);
          return [];
        }

        return (data || []) as SubCollection[];
      } catch (err) {
        console.warn('Sub-collections not available yet:', err);
        return [];
      }
    },
  });
};
