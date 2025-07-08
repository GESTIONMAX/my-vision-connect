// Types pour les données WordPress
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  type: string;
  link: string;
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
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ embeddable: boolean; href: string }>;
    replies: Array<{ embeddable: boolean; href: string }>;
    'version-history': Array<{ count: number; href: string }>;
    'wp:featuredmedia': Array<{ embeddable: boolean; href: string }>;
    'wp:attachment': Array<{ href: string }>;
    'wp:term': Array<{ taxonomy: string; embeddable: boolean; href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}

export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  type: string;
  link: string;
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
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  parent: number;
  menu_order: number;
  meta: Record<string, any>;
  _links: any;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, any>;
  _links: any;
}

export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: Record<string, any>;
  _links: any;
}

export interface WordPressMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Record<string, any>;
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }>;
    image_meta: Record<string, any>;
  };
  source_url: string;
  _links: any;
}

export interface WordPressApiParams {
  page?: number;
  per_page?: number;
  search?: string;
  author?: number;
  author_exclude?: number[];
  before?: string;
  after?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'include_slugs' | 'title';
  slug?: string[];
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  categories?: number[];
  categories_exclude?: number[];
  tags?: number[];
  tags_exclude?: number[];
  sticky?: boolean;
  _embed?: boolean;
}

// Configuration de l'API WordPress
interface WordPressConfig {
  baseUrl: string;
  username?: string;
  password?: string;
  jwt?: string;
}

class WordPressAPI {
  private config: WordPressConfig;

  constructor(config: WordPressConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl.replace(/\/$/, '') // Enlever le slash final
    };
  }

  private async makeRequest<T>(endpoint: string, params?: WordPressApiParams): Promise<T> {
    try {
      // Use Supabase edge function for secure API calls
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('wordpress-api', {
        body: { endpoint, params }
      });

      if (error) {
        throw new Error(`WordPress API Error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('WordPress API Request failed:', error);
      throw error;
    }
  }

  // Posts
  async getPosts(params?: WordPressApiParams): Promise<WordPressPost[]> {
    return this.makeRequest<WordPressPost[]>('/posts', { _embed: true, ...params });
  }

  async getPost(id: number, params?: { _embed?: boolean }): Promise<WordPressPost> {
    return this.makeRequest<WordPressPost>(`/posts/${id}`, params);
  }

  async getPostBySlug(slug: string, params?: WordPressApiParams): Promise<WordPressPost[]> {
    return this.makeRequest<WordPressPost[]>('/posts', { slug: [slug], _embed: true, ...params });
  }

  // Pages
  async getPages(params?: WordPressApiParams): Promise<WordPressPage[]> {
    return this.makeRequest<WordPressPage[]>('/pages', { _embed: true, ...params });
  }

  async getPage(id: number, params?: { _embed?: boolean }): Promise<WordPressPage> {
    return this.makeRequest<WordPressPage>(`/pages/${id}`, params);
  }

  async getPageBySlug(slug: string, params?: WordPressApiParams): Promise<WordPressPage[]> {
    return this.makeRequest<WordPressPage[]>('/pages', { slug: [slug], _embed: true, ...params });
  }

  // Categories
  async getCategories(params?: Omit<WordPressApiParams, 'categories' | 'tags'>): Promise<WordPressCategory[]> {
    return this.makeRequest<WordPressCategory[]>('/categories', params);
  }

  async getCategory(id: number): Promise<WordPressCategory> {
    return this.makeRequest<WordPressCategory>(`/categories/${id}`);
  }

  // Tags
  async getTags(params?: Omit<WordPressApiParams, 'categories' | 'tags'>): Promise<WordPressTag[]> {
    return this.makeRequest<WordPressTag[]>('/tags', params);
  }

  async getTag(id: number): Promise<WordPressTag> {
    return this.makeRequest<WordPressTag>(`/tags/${id}`);
  }

  // Media
  async getMedia(params?: Omit<WordPressApiParams, 'categories' | 'tags' | 'sticky'>): Promise<WordPressMedia[]> {
    return this.makeRequest<WordPressMedia[]>('/media', params);
  }

  async getMediaItem(id: number): Promise<WordPressMedia> {
    return this.makeRequest<WordPressMedia>(`/media/${id}`);
  }

  // Search
  async search(query: string, params?: WordPressApiParams): Promise<WordPressPost[]> {
    return this.makeRequest<WordPressPost[]>('/posts', { search: query, _embed: true, ...params });
  }

  // Méthodes utilitaires
  async getPostsWithCategories(params?: WordPressApiParams): Promise<WordPressPost[]> {
    return this.getPosts({ _embed: true, ...params });
  }

  async getRecentPosts(count: number = 5): Promise<WordPressPost[]> {
    return this.getPosts({ per_page: count, orderby: 'date', order: 'desc' });
  }

  async getPopularPosts(count: number = 5): Promise<WordPressPost[]> {
    // Note: Nécessite un plugin pour les statistiques de popularité
    return this.getPosts({ per_page: count, orderby: 'modified', order: 'desc' });
  }

  async getFeaturedPosts(): Promise<WordPressPost[]> {
    return this.getPosts({ sticky: true, _embed: true });
  }
}

// Instance par défaut utilisant la configuration
import { WORDPRESS_CONFIG } from '@/config/wordpress';

export const wordpressApi = new WordPressAPI({
  baseUrl: WORDPRESS_CONFIG.BASE_URL,
  // username: WORDPRESS_CONFIG.AUTH.username, // Optionnel pour les contenus publics
  // password: WORDPRESS_CONFIG.AUTH.password, // Optionnel pour les contenus publics
});

// Export de la classe pour créer d'autres instances si nécessaire
export { WordPressAPI };

// Utilitaires pour traiter les données WordPress
export const wpUtils = {
  // Nettoyer le contenu HTML de WordPress
  stripHtml: (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  },

  // Extraire l'image featured d'un post
  getFeaturedImage: (post: WordPressPost): string | null => {
    if (post._links && post._links['wp:featuredmedia']) {
      // L'URL de l'image est généralement dans les données embedded
      const embedded = (post as any)._embedded;
      if (embedded && embedded['wp:featuredmedia'] && embedded['wp:featuredmedia'][0]) {
        return embedded['wp:featuredmedia'][0].source_url;
      }
    }
    return null;
  },

  // Formater la date
  formatDate: (dateString: string, locale: string = 'fr-FR'): string => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Créer un extrait à partir du contenu
  createExcerpt: (content: string, maxLength: number = 150): string => {
    const stripped = wpUtils.stripHtml(content);
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength).trim() + '...';
  },

  // Obtenir les catégories d'un post
  getPostCategories: (post: WordPressPost): string[] => {
    const embedded = (post as any)._embedded;
    if (embedded && embedded['wp:term'] && embedded['wp:term'][0]) {
      return embedded['wp:term'][0].map((term: any) => term.name);
    }
    return [];
  },

  // Obtenir les tags d'un post
  getPostTags: (post: WordPressPost): string[] => {
    const embedded = (post as any)._embedded;
    if (embedded && embedded['wp:term'] && embedded['wp:term'][1]) {
      return embedded['wp:term'][1].map((term: any) => term.name);
    }
    return [];
  }
};