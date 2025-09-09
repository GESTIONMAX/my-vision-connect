import { useQuery } from '@tanstack/react-query';

export interface ProductVariant {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  description: string;
  specifications: Record<string, string>;
  is_new: boolean;
  is_popular: boolean;
  is_featured: boolean;
  in_stock: boolean;
  stock_quantity: number;
  review_count: number;
  images: string[];
  features: string[];
  collection: string;
  category: 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle';
  color: string[];
  usage: 'quotidien' | 'sport' | 'conduite' | 'travail';
  genre?: 'mixte' | 'homme' | 'femme';
  rating: number;
  reviewCount: number;
  originalPrice?: number;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  created_at?: string;
}

export const useProductVariants = (productSlug: string) => {
  return useQuery({
    queryKey: ['product-variants', productSlug],
    queryFn: async () => {
      // Get variants for Music Shield products
      if (productSlug === 'music-shield' || productSlug === 'music-shield-standard') {
          .from('products')
          .select('*')
          .in('sku', ['music-shield', 'music-shield-standard'])
          .order('price', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        // Transform the data to match the expected format
        return (data || []).map((product: any): ProductVariant => ({
          id: product.id,
          name: product.name,
          slug: product.sku || product.id,
          price: product.price || 0,
          original_price: product.original_price,
          description: product.description || '',
          specifications: {},
          is_new: product.is_featured || false,
          is_popular: product.is_featured || false,
          is_featured: product.is_featured || false,
          in_stock: product.stock_quantity > 0,
          stock_quantity: product.stock_quantity || 0,
          review_count: product.review_count || 0,
          images: product.images || [],
          features: [],
          collection: product.collection_slug || '',
          category: (product.category || 'lifestyle') as 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle',
          color: [],
          usage: 'quotidien' as 'quotidien' | 'sport' | 'conduite' | 'travail',
          genre: 'mixte' as 'mixte' | 'homme' | 'femme',
          rating: product.rating || 4.5,
          reviewCount: product.review_count || 0,
          originalPrice: product.original_price,
          inStock: product.stock_quantity > 0,
          isNew: product.is_featured || false,
          isPopular: product.is_featured || false,
          created_at: product.created_at,
        }));
      }

      // For other products, return empty array (no variants)
      return [];
    },
  });
};