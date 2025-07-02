
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
      // Use raw SQL query since the table might not be in generated types yet
      let query = `
        SELECT * FROM sub_collections 
        WHERE is_active = true
      `;
      
      const params: any[] = [];
      
      if (parentSlug) {
        query += ` AND parent_collection_slug = $1`;
        params.push(parentSlug);
      }
      
      query += ` ORDER BY sort_order ASC`;

      const { data, error } = await supabase.rpc('exec_sql', {
        sql: query,
        params: params
      });

      if (error) {
        // Fallback: try direct table access
        let fallbackQuery = supabase
          .from('sub_collections' as any)
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (parentSlug) {
          fallbackQuery = fallbackQuery.eq('parent_collection_slug', parentSlug);
        }

        const { data: fallbackData, error: fallbackError } = await fallbackQuery;
        
        if (fallbackError) {
          console.warn('Sub-collections table not available yet:', fallbackError);
          return [];
        }
        
        return fallbackData as SubCollection[];
      }

      return data as SubCollection[];
    },
  });
};
