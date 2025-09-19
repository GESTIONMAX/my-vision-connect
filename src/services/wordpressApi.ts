import { WORDPRESS_CONFIG, buildWordPressUrl, getAuthHeaders } from '@/config/wordpress';

/**
 * Client API WordPress Headless avec Carbon Fields
 */
class WordPressApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = WORDPRESS_CONFIG.baseUrl;
    this.headers = getAuthHeaders();
  }

  /**
   * Requête GET générique vers WordPress REST API
   */
  private async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(buildWordPressUrl(endpoint));
    
    // Ajouter les paramètres de requête
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Requête POST générique vers WordPress REST API
   */
  private async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(buildWordPressUrl(endpoint), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // ==========================================
  // MÉTHODES SPÉCIFIQUES POUR MYTECHGEAR
  // ==========================================

  /**
   * Récupère tous les produits avec leurs champs Carbon Fields
   */
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    category?: string;
    featured?: boolean;
    search?: string;
  }) {
    return this.get<WordPressProduct[]>(WORDPRESS_CONFIG.endpoints.products, {
      ...params,
      // Inclure les champs Carbon Fields dans la réponse
      _embed: true,
      acf_format: 'standard',
    });
  }

  /**
   * Récupère un produit par son ID ou slug
   */
  async getProduct(idOrSlug: string | number) {
    return this.get<WordPressProduct>(`${WORDPRESS_CONFIG.endpoints.products}/${idOrSlug}`, {
      _embed: true,
      acf_format: 'standard',
    });
  }

  /**
   * Récupère toutes les collections
   */
  async getCollections(params?: {
    page?: number;
    per_page?: number;
    hide_empty?: boolean;
  }) {
    return this.get<WordPressCollection[]>(WORDPRESS_CONFIG.endpoints.collections, {
      ...params,
      _embed: true,
    });
  }

  /**
   * Récupère une collection par son ID ou slug
   */
  async getCollection(idOrSlug: string | number) {
    return this.get<WordPressCollection>(`${WORDPRESS_CONFIG.endpoints.collections}/${idOrSlug}`, {
      _embed: true,
    });
  }

  /**
   * Récupère les produits d'une collection spécifique
   */
  async getProductsByCollection(collectionId: string | number) {
    return this.get<WordPressProduct[]>(WORDPRESS_CONFIG.endpoints.products, {
      collections: collectionId,
      _embed: true,
      per_page: 100, // Ajuster selon vos besoins
    });
  }

  /**
   * Récupère les spécifications d'un produit
   */
  async getProductSpecifications(productId: string | number) {
    return this.get<WordPressSpecification[]>(WORDPRESS_CONFIG.endpoints.specifications, {
      product: productId,
      _embed: true,
    });
  }

  /**
   * Recherche de produits
   */
  async searchProducts(query: string, filters?: {
    category?: string;
    price_min?: number;
    price_max?: number;
    featured?: boolean;
  }) {
    return this.get<WordPressProduct[]>(WORDPRESS_CONFIG.endpoints.products, {
      search: query,
      ...filters,
      _embed: true,
      per_page: 50,
    });
  }

  /**
   * Récupère les médias (images) d'un produit
   */
  async getProductMedia(productId: string | number) {
    return this.get<WordPressMedia[]>(WORDPRESS_CONFIG.endpoints.media, {
      parent: productId,
      media_type: 'image',
      per_page: 20,
    });
  }
}

// Export de l'instance singleton
export const wordpressApi = new WordPressApiClient();

// ==========================================
// TYPES WORDPRESS + CARBON FIELDS
// ==========================================

/**
 * Structure d'un produit WordPress avec Carbon Fields
 */
export interface WordPressProduct {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  
  // Champs Carbon Fields pour MyTechGear
  carbon_fields?: {
    // Prix et informations commerciales
    price_base?: number;
    price_original?: number;
    is_featured?: boolean;
    is_new?: boolean;
    stock_quantity?: number;
    sku?: string;
    
    // Catégorisation
    category?: string;
    collection?: string;
    usage_type?: 'quotidien' | 'sport' | 'lifestyle';
    target_audience?: 'homme' | 'femme' | 'mixte';
    
    // Caractéristiques techniques
    specifications?: {
      frame_material?: string;
      lens_type?: string;
      uv_protection?: string;
      dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
      };
      weight?: number;
      color_frame?: string;
      color_lens?: string;
    };
    
    // Galerie d'images
    gallery?: Array<{
      id: number;
      url: string;
      alt: string;
    }>;
    
    // Technologies et fonctionnalités
    features?: string[];
    technologies?: string[];
    benefits?: string[];
    
    // Informations complémentaires
    care_instructions?: string;
    warranty_period?: number;
    included_accessories?: string[];
  };
  
  // Métadonnées WordPress
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: any[];
  };
}

/**
 * Structure d'une collection WordPress
 */
export interface WordPressCollection {
  id: number;
  count: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  
  // Champs Carbon Fields pour les collections
  carbon_fields?: {
    hero_image?: {
      id: number;
      url: string;
      alt: string;
    };
    description_long?: string;
    featured_products?: number[];
    collection_type?: 'sport' | 'lifestyle' | 'tech';
    launch_date?: string;
  };
}

/**
 * Structure d'une spécification WordPress
 */
export interface WordPressSpecification {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  
  carbon_fields?: {
    specification_type?: string;
    specification_value?: string;
    specification_unit?: string;
    display_order?: number;
  };
}

/**
 * Structure d'un média WordPress
 */
export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  title: {
    rendered: string;
  };
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        source_url: string;
      };
    };
  };
}

export default wordpressApi;