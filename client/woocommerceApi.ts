// Types pour WooCommerce
export interface WooCommerceProduct {
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
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity?: number;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
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

export interface WooCommerceCustomer {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
  };
}

export interface WooCommerceOrder {
  id: number;
  status: string;
  currency: string;
  total: string;
  customer_id: number;
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    price: number;
    total: string;
  }>;
  billing: any;
  shipping: any;
  date_created: string;
  date_modified: string;
}

export interface WooCommerceApiParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  status?: string;
  stock_status?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
  include?: number[];
  exclude?: number[];
}

class WooCommerceAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async makeRequest<T>(endpoint: string, params?: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): Promise<T> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const requestBody = {
        endpoint: `/wc/v3${endpoint}`,
        params,
        method
      };

      const { data, error } = await supabase.functions.invoke('woocommerce-api', {
        body: requestBody
      });

      if (error) {
        throw new Error(`WooCommerce API Error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('WooCommerce API Request failed:', error);
      throw error;
    }
  }

  // Products
  async getProducts(params?: WooCommerceApiParams): Promise<WooCommerceProduct[]> {
    return this.makeRequest<WooCommerceProduct[]>('/products', params);
  }

  async getProduct(id: number): Promise<WooCommerceProduct> {
    return this.makeRequest<WooCommerceProduct>(`/products/${id}`);
  }

  async getProductBySlug(slug: string): Promise<WooCommerceProduct[]> {
    return this.makeRequest<WooCommerceProduct[]>('/products', { slug });
  }

  async createProduct(product: Partial<WooCommerceProduct>): Promise<WooCommerceProduct> {
    return this.makeRequest<WooCommerceProduct>('/products', product, 'POST');
  }

  async updateProduct(id: number, product: Partial<WooCommerceProduct>): Promise<WooCommerceProduct> {
    return this.makeRequest<WooCommerceProduct>(`/products/${id}`, product, 'PUT');
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/products/${id}`, null, 'DELETE');
  }

  // Customers
  async getCustomers(params?: WooCommerceApiParams): Promise<WooCommerceCustomer[]> {
    return this.makeRequest<WooCommerceCustomer[]>('/customers', params);
  }

  async getCustomer(id: number): Promise<WooCommerceCustomer> {
    return this.makeRequest<WooCommerceCustomer>(`/customers/${id}`);
  }

  async createCustomer(customer: Partial<WooCommerceCustomer>): Promise<WooCommerceCustomer> {
    return this.makeRequest<WooCommerceCustomer>('/customers', customer, 'POST');
  }

  async updateCustomer(id: number, customer: Partial<WooCommerceCustomer>): Promise<WooCommerceCustomer> {
    return this.makeRequest<WooCommerceCustomer>(`/customers/${id}`, customer, 'PUT');
  }

  // Orders
  async getOrders(params?: WooCommerceApiParams): Promise<WooCommerceOrder[]> {
    return this.makeRequest<WooCommerceOrder[]>('/orders', params);
  }

  async getOrder(id: number): Promise<WooCommerceOrder> {
    return this.makeRequest<WooCommerceOrder>(`/orders/${id}`);
  }

  async createOrder(order: Partial<WooCommerceOrder>): Promise<WooCommerceOrder> {
    return this.makeRequest<WooCommerceOrder>('/orders', order, 'POST');
  }

  // Categories
  async getProductCategories(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
    return this.makeRequest('/products/categories');
  }

  // Search
  async searchProducts(query: string, params?: WooCommerceApiParams): Promise<WooCommerceProduct[]> {
    return this.makeRequest<WooCommerceProduct[]>('/products', { search: query, ...params });
  }
}

// Instance par défaut
import { WORDPRESS_CONFIG } from '@/config/wordpress';

export const woocommerceApi = new WooCommerceAPI(WORDPRESS_CONFIG.BASE_URL);

// Export de la classe pour créer d'autres instances si nécessaire
export { WooCommerceAPI };

// Fonctions utilitaires pour le mapping
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

// Utilitaires pour traiter les données WooCommerce
export const wcUtils = {
  // Mapper les catégories WooCommerce vers les catégories de l'app
  mapCategory,

  // Mapper l'usage WooCommerce vers l'usage de l'app
  mapUsage,

  // Convertir un produit WooCommerce vers le format de l'app
  convertProduct: (wcProduct: WooCommerceProduct) => ({
    id: wcProduct.id.toString(),
    slug: wcProduct.slug,
    name: wcProduct.name,
    description: wcProduct.description || wcProduct.short_description,
    price: parseFloat(wcProduct.price) || 0,
    original_price: wcProduct.sale_price ? parseFloat(wcProduct.regular_price) : undefined,
    originalPrice: wcProduct.sale_price ? parseFloat(wcProduct.regular_price) : undefined,
    category: mapCategory(wcProduct.categories[0]?.name || 'lifestyle'),
    collection: wcProduct.categories[0]?.slug || 'general',
    images: wcProduct.images.map(img => img.src),
    in_stock: wcProduct.stock_status === 'instock',
    inStock: wcProduct.stock_status === 'instock',
    stock_quantity: wcProduct.stock_quantity || 0,
    stockQuantity: wcProduct.stock_quantity || 0,
    is_new: wcProduct.meta_data?.find(m => m.key === '_is_new')?.value === 'yes',
    isNew: wcProduct.meta_data?.find(m => m.key === '_is_new')?.value === 'yes',
    is_popular: wcProduct.featured,
    isPopular: wcProduct.featured,
    is_featured: wcProduct.featured,
    isFeatured: wcProduct.featured,
    features: wcProduct.attributes.map(attr => attr.name),
    specifications: wcProduct.attributes.reduce((acc, attr) => {
      acc[attr.name] = attr.options.join(', ');
      return acc;
    }, {} as Record<string, any>),
    rating: 4.5, // Default rating
    reviewCount: Math.floor(Math.random() * 100) + 10,
    review_count: Math.floor(Math.random() * 100) + 10,
    color: wcProduct.attributes.find(attr => attr.name.toLowerCase().includes('couleur'))?.options || [],
    genre: wcProduct.meta_data?.find(m => m.key === '_genre')?.value || 'mixte',
    usage: mapUsage(wcProduct.meta_data?.find(m => m.key === '_usage')?.value || 'quotidien'),
    created_at: new Date().toISOString()
  }),

  // Convertir un client WooCommerce vers le format de l'app
  convertCustomer: (wcCustomer: WooCommerceCustomer) => ({
    id: wcCustomer.id.toString(),
    email: wcCustomer.email,
    firstName: wcCustomer.first_name,
    lastName: wcCustomer.last_name,
    companyName: wcCustomer.billing.company,
    phone: wcCustomer.billing.phone,
    userType: wcCustomer.billing.company ? 'business' : 'individual'
  }),

  // Formater le prix
  formatPrice: (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `${numPrice.toFixed(2)}€`;
  }
};