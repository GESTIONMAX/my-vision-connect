// API CoCart pour WooCommerce Headless
export interface CoCartProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  status: 'publish' | 'draft' | 'private';
  featured: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity?: number;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  meta_data: Array<{
    key: string;
    value: any;
  }>;
}

export interface CoCartApiParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  status?: string;
  stock_status?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
}

class CoCartAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async makeRequest<T>(endpoint: string, params?: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): Promise<T> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const requestBody = {
        endpoint: `/cocart/v2${endpoint}`,
        params,
        method
      };

      const { data, error } = await supabase.functions.invoke('cocart-api', {
        body: requestBody
      });

      if (error) {
        throw new Error(`CoCart API Error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('CoCart API Request failed:', error);
      throw error;
    }
  }

  // Products via CoCart
  async getProducts(params?: CoCartApiParams): Promise<CoCartProduct[]> {
    return this.makeRequest<CoCartProduct[]>('/products', params);
  }

  async getProduct(id: number): Promise<CoCartProduct> {
    return this.makeRequest<CoCartProduct>(`/products/${id}`);
  }

  async getProductBySlug(slug: string): Promise<CoCartProduct[]> {
    return this.makeRequest<CoCartProduct[]>('/products', { slug });
  }

  // Categories via CoCart
  async getProductCategories(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
    return this.makeRequest('/products/categories');
  }

  // Search via CoCart
  async searchProducts(query: string, params?: CoCartApiParams): Promise<CoCartProduct[]> {
    return this.makeRequest<CoCartProduct[]>('/products', { search: query, ...params });
  }

  // Cart operations (CoCart's strength)
  async getCart(): Promise<any> {
    return this.makeRequest('/cart');
  }

  async addToCart(productId: number, quantity: number = 1): Promise<any> {
    return this.makeRequest('/cart/add-item', {
      id: productId,
      quantity
    }, 'POST');
  }

  async updateCartItem(itemKey: string, quantity: number): Promise<any> {
    return this.makeRequest(`/cart/item/${itemKey}`, {
      quantity
    }, 'POST');
  }

  async removeCartItem(itemKey: string): Promise<any> {
    return this.makeRequest(`/cart/item/${itemKey}`, null, 'DELETE');
  }

  async clearCart(): Promise<any> {
    return this.makeRequest('/cart/clear', null, 'POST');
  }
}

// Instance par défaut
import { WORDPRESS_CONFIG } from '@/config/wordpress';

export const cocartApi = new CoCartAPI(WORDPRESS_CONFIG.BASE_URL);

// Export de la classe pour créer d'autres instances si nécessaire
export { CoCartAPI };

// Fonctions utilitaires pour le mapping (réutilisées de woocommerceApi)
const mapCategory = (wcCategory: string): 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle' => {
  const categoryMap: Record<string, 'classic' | 'sport' | 'pro' | 'femme' | 'homme' | 'lifestyle'> = {
    'classic': 'classic',
    'sport': 'sport',
    'pro': 'pro',
    'femme': 'femme',
    'homme': 'homme',
    'lifestyle': 'lifestyle',
    'classique': 'classic',
    'professionnel': 'pro',
    'women': 'femme',
    'men': 'homme',
    'style': 'lifestyle'
  };
  return categoryMap[wcCategory.toLowerCase()] || 'lifestyle';
};

const mapUsage = (wcUsage: string): 'quotidien' | 'sport' | 'conduite' | 'travail' => {
  const usageMap: Record<string, 'quotidien' | 'sport' | 'conduite' | 'travail'> = {
    'quotidien': 'quotidien',
    'sport': 'sport',
    'conduite': 'conduite',
    'travail': 'travail',
    'daily': 'quotidien',
    'driving': 'conduite',
    'work': 'travail'
  };
  return usageMap[wcUsage.toLowerCase()] || 'quotidien';
};

// Utilitaires CoCart
export const cocartUtils = {
  // Mapper les catégories
  mapCategory,
  
  // Mapper l'usage
  mapUsage,
  
  // Convertir un produit CoCart vers le format de l'app
  convertProduct: (coProduct: CoCartProduct) => ({
    id: coProduct.id.toString(),
    slug: coProduct.slug,
    name: coProduct.name,
    description: coProduct.description || coProduct.short_description,
    price: parseFloat(coProduct.price) || 0,
    original_price: coProduct.sale_price ? parseFloat(coProduct.regular_price) : undefined,
    originalPrice: coProduct.sale_price ? parseFloat(coProduct.regular_price) : undefined,
    category: mapCategory(coProduct.categories[0]?.name || 'lifestyle'),
    collection: coProduct.categories[0]?.slug || 'general',
    images: coProduct.images.map(img => img.src),
    in_stock: coProduct.stock_status === 'instock',
    inStock: coProduct.stock_status === 'instock',
    stock_quantity: coProduct.stock_quantity || 0,
    stockQuantity: coProduct.stock_quantity || 0,
    is_new: coProduct.meta_data?.find(m => m.key === '_is_new')?.value === 'yes',
    isNew: coProduct.meta_data?.find(m => m.key === '_is_new')?.value === 'yes',
    is_popular: coProduct.featured,
    isPopular: coProduct.featured,
    is_featured: coProduct.featured,
    isFeatured: coProduct.featured,
    features: coProduct.attributes.map(attr => attr.name),
    specifications: coProduct.attributes.reduce((acc, attr) => {
      acc[attr.name] = attr.options.join(', ');
      return acc;
    }, {} as Record<string, any>),
    rating: 4.5, // Default rating
    reviewCount: Math.floor(Math.random() * 100) + 10,
    review_count: Math.floor(Math.random() * 100) + 10,
    color: coProduct.attributes.find(attr => attr.name.toLowerCase().includes('couleur'))?.options || [],
    genre: coProduct.meta_data?.find(m => m.key === '_genre')?.value || 'mixte',
    usage: mapUsage(coProduct.meta_data?.find(m => m.key === '_usage')?.value || 'quotidien'),
    created_at: new Date().toISOString()
  }),

  // Formater le prix
  formatPrice: (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `${numPrice.toFixed(2)}€`;
  }
};