import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export const useCollectionProducts = (collectionSlug: string) => {
  return useQuery({
    queryKey: ['collection-products', collectionSlug],
    queryFn: async () => {
      // Query products through the product_collections junction table
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_collections!inner(
            collections!inner(
              slug
            )
          )
        `)
        .eq('is_active', true)
        .eq('product_collections.collections.slug', collectionSlug);

      if (error) {
        console.error('Error fetching collection products:', error);
        return [];
      }

      // Transform to Product interface
      const transformedProducts: Product[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.id,
        description: item.description_long || '',
        description_short: item.description_short,
        description_long: item.description_long,
        price: Number(item.price_base) || 0,
        price_base: Number(item.price_base) || 0,
        original_price: undefined,
        specifications: {},
        is_new: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        is_popular: false,
        is_featured: false,
        in_stock: item.is_active || false,
        stock_quantity: 0,
        review_count: 0,
        images: [],
        features: [],
        collection: collectionSlug,
        category: 'lifestyle' as const,
        color: [],
        usage: 'quotidien' as const,
        genre: 'mixte' as const,
        rating: 0,
        reviewCount: 0,
        originalPrice: undefined,
        inStock: item.is_active || false,
        isNew: item.created_at ? new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
        isPopular: false,
        created_at: item.created_at,
        updated_at: item.updated_at,
        is_active: item.is_active
      }));

      return transformedProducts;
    },
    enabled: !!collectionSlug,
  });
};