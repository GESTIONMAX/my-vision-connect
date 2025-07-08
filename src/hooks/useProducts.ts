
import { useQuery } from '@tanstack/react-query';
import { useWooCommerceProducts, useWooCommerceProductBySlug } from '@/hooks/useWooCommerce';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
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

export const useProducts = () => {
  return useWooCommerceProducts();
};

export const useProduct = (slug: string) => {
  return useWooCommerceProductBySlug(slug);
};
