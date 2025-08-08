import { useQuery } from '@tanstack/react-query';
import { wordpressApi, WordPressApiParams } from '@/services/wordpressApi';
import { WORDPRESS_CONFIG } from '@/config/wordpress';

// Hook principal pour récupérer les posts
export const useWordPressPosts = (params?: WordPressApiParams) => {
  return useQuery({
    queryKey: ['wordpress-posts', params],
    queryFn: () => wordpressApi.getPosts(params),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.POSTS,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour un post spécifique par slug
export const useWordPressPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['wordpress-post', slug],
    queryFn: async () => {
      const posts = await wordpressApi.getPostBySlug(slug);
      return posts[0] || null;
    },
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.POSTS,
    enabled: !!slug && !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les posts récents
export const useRecentWordPressPosts = (count: number = 5) => {
  return useQuery({
    queryKey: ['wordpress-recent-posts', count],
    queryFn: () => wordpressApi.getRecentPosts(count),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.POSTS,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les posts en vedette
export const useFeaturedWordPressPosts = () => {
  return useQuery({
    queryKey: ['wordpress-featured-posts'],
    queryFn: () => wordpressApi.getFeaturedPosts(),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.POSTS,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les catégories WordPress
export const useWordPressCategories = () => {
  return useQuery({
    queryKey: ['wordpress-categories'],
    queryFn: () => wordpressApi.getCategories(),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.CATEGORIES,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les tags WordPress
export const useWordPressTags = () => {
  return useQuery({
    queryKey: ['wordpress-tags'],
    queryFn: () => wordpressApi.getTags(),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.TAGS,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour la recherche
export const useWordPressSearch = (query: string, params?: WordPressApiParams) => {
  return useQuery({
    queryKey: ['wordpress-search', query, params],
    queryFn: () => wordpressApi.search(query, params),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.SEARCH,
    enabled: !!query && query.length > 2 && !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les pages WordPress
export const useWordPressPages = (params?: WordPressApiParams) => {
  return useQuery({
    queryKey: ['wordpress-pages', params],
    queryFn: () => wordpressApi.getPages(params),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.PAGES,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour une page spécifique par slug
export const useWordPressPageBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['wordpress-page', slug],
    queryFn: async () => {
      const pages = await wordpressApi.getPageBySlug(slug);
      return pages[0] || null;
    },
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.PAGES,
    enabled: !!slug && !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les posts populaires
export const usePopularWordPressPosts = (count: number = 5) => {
  return useQuery({
    queryKey: ['wordpress-popular-posts', count],
    queryFn: () => wordpressApi.getPopularPosts(count),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.POSTS,
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};

// Hook pour les médias WordPress
export const useWordPressMedia = (params?: Omit<WordPressApiParams, 'categories' | 'tags' | 'sticky'>) => {
  return useQuery({
    queryKey: ['wordpress-media', params],
    queryFn: () => wordpressApi.getMedia(params),
    staleTime: WORDPRESS_CONFIG.CACHE_TIMES.POSTS, // Même durée que les posts
    enabled: !!WORDPRESS_CONFIG.BASE_URL && WORDPRESS_CONFIG.BASE_URL !== 'https://your-wordpress-site.com',
  });
};