import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export const useCollectionProducts = (collectionSlug: string) => {
  return useQuery({
    queryKey: ['collection-products', collectionSlug],
    queryFn: async () => {
      // First get products directly by collection_slug
      const { data: directProducts, error: directError } = await supabase
        .from('products')
        .select('*')
        .eq('collection_slug', collectionSlug)
        .eq('is_active', true);

      if (directError) {
        console.error('Error fetching direct collection products:', directError);
      }

      // Then get products via product_collections junction table
      const { data: junctionProducts, error: junctionError } = await supabase
        .from('product_collections')
        .select(`
          product_id,
          products (*)
        `)
        .eq('collection_slug', collectionSlug);

      if (junctionError) {
        console.error('Error fetching junction collection products:', junctionError);
      }

      // Combine both results
      const allProducts = [
        ...(directProducts || []),
        ...(junctionProducts?.map(jp => jp.products).filter(Boolean) || [])
      ];

      // Remove duplicates based on id
      const uniqueProducts = allProducts.filter((product, index, self) => 
        index === self.findIndex(p => p.id === product.id)
      );

      // Transform to Product interface
      const transformedProducts: Product[] = uniqueProducts.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.sku || product.id,
        price: parseFloat(product.price) || 0,
        originalPrice: undefined,
        discount: undefined,
        images: Array.isArray(product.images) ? product.images : [],
        category: product.category || 'uncategorized',
        isNew: false,
        isPopular: product.is_featured || false,
        inStock: (product.stock_quantity || 0) > 0,
        isFeatured: product.is_featured || false,
        is_new: false,
        is_popular: product.is_featured || false,
        is_featured: product.is_featured || false,
        in_stock: (product.stock_quantity || 0) > 0,
        stock_quantity: product.stock_quantity || 0,
        rating: parseFloat(product.rating) || 0,
        reviewCount: product.review_count || 0,
        review_count: product.review_count || 0,
        description: product.description || '',
        features: [],
        specifications: {},
        color: undefined,
        usage: undefined,
        genre: undefined,
        collection: product.collection_slug,
        tags: [],
        source: product.source || 'supabase'
      }));

      return transformedProducts;
    },
    enabled: !!collectionSlug,
  });
};