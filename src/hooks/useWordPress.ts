import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  wordpressApi, 
  WordPressPost, 
  WordPressPage, 
  WordPressCategory, 
  WordPressTag,
  WordPressApiParams 
} from '@/services/wordpressApi';

// Hook pour récupérer les posts
export const useWordPressPosts = (params?: WordPressApiParams): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-posts', params],
    queryFn: () => wordpressApi.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook pour récupérer un post par ID
export const useWordPressPost = (id: number): UseQueryResult<WordPressPost, Error> => {
  return useQuery({
    queryKey: ['wordpress-post', id],
    queryFn: () => wordpressApi.getPost(id, { _embed: true }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook pour récupérer un post par slug
export const useWordPressPostBySlug = (slug: string): UseQueryResult<WordPressPost | null, Error> => {
  return useQuery({
    queryKey: ['wordpress-post-slug', slug],
    queryFn: async () => {
      const posts = await wordpressApi.getPostBySlug(slug);
      return posts.length > 0 ? posts[0] : null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook pour récupérer les pages
export const useWordPressPages = (params?: WordPressApiParams): UseQueryResult<WordPressPage[], Error> => {
  return useQuery({
    queryKey: ['wordpress-pages', params],
    queryFn: () => wordpressApi.getPages(params),
    staleTime: 10 * 60 * 1000, // 10 minutes pour les pages (moins volatiles)
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
};

// Hook pour récupérer une page par slug
export const useWordPressPageBySlug = (slug: string): UseQueryResult<WordPressPage | null, Error> => {
  return useQuery({
    queryKey: ['wordpress-page-slug', slug],
    queryFn: async () => {
      const pages = await wordpressApi.getPageBySlug(slug);
      return pages.length > 0 ? pages[0] : null;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};

// Hook pour récupérer les catégories
export const useWordPressCategories = (): UseQueryResult<WordPressCategory[], Error> => {
  return useQuery({
    queryKey: ['wordpress-categories'],
    queryFn: () => wordpressApi.getCategories({ per_page: 100 }),
    staleTime: 30 * 60 * 1000, // 30 minutes pour les catégories
    gcTime: 60 * 60 * 1000, // 1 heure
  });
};

// Hook pour récupérer les tags
export const useWordPressTags = (): UseQueryResult<WordPressTag[], Error> => {
  return useQuery({
    queryKey: ['wordpress-tags'],
    queryFn: () => wordpressApi.getTags({ per_page: 100 }),
    staleTime: 30 * 60 * 1000, // 30 minutes pour les tags
    gcTime: 60 * 60 * 1000, // 1 heure
  });
};

// Hook pour récupérer les posts récents
export const useRecentWordPressPosts = (count: number = 5): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-recent-posts', count],
    queryFn: () => wordpressApi.getRecentPosts(count),
    staleTime: 2 * 60 * 1000, // 2 minutes pour les posts récents
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer les posts populaires
export const usePopularWordPressPosts = (count: number = 5): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-popular-posts', count],
    queryFn: () => wordpressApi.getPopularPosts(count),
    staleTime: 10 * 60 * 1000, // 10 minutes pour les posts populaires
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
};

// Hook pour récupérer les posts featured/épinglés
export const useFeaturedWordPressPosts = (): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-featured-posts'],
    queryFn: () => wordpressApi.getFeaturedPosts(),
    staleTime: 15 * 60 * 1000, // 15 minutes pour les posts featured
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook pour la recherche
export const useWordPressSearch = (query: string, params?: WordPressApiParams): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-search', query, params],
    queryFn: () => wordpressApi.search(query, params),
    enabled: !!query && query.length > 2, // Activer seulement si la requête fait plus de 2 caractères
    staleTime: 1 * 60 * 1000, // 1 minute pour les recherches
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer les posts d'une catégorie spécifique
export const useWordPressPostsByCategory = (categoryId: number, params?: WordPressApiParams): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-posts-category', categoryId, params],
    queryFn: () => wordpressApi.getPosts({ categories: [categoryId], _embed: true, ...params }),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook pour récupérer les posts avec un tag spécifique
export const useWordPressPostsByTag = (tagId: number, params?: WordPressApiParams): UseQueryResult<WordPressPost[], Error> => {
  return useQuery({
    queryKey: ['wordpress-posts-tag', tagId, params],
    queryFn: () => wordpressApi.getPosts({ tags: [tagId], _embed: true, ...params }),
    enabled: !!tagId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook personnalisé pour combiner posts et catégories avec leurs noms
export const useWordPressPostsWithCategoryNames = (params?: WordPressApiParams) => {
  const postsQuery = useWordPressPosts(params);
  const categoriesQuery = useWordPressCategories();

  return {
    ...postsQuery,
    data: postsQuery.data?.map(post => ({
      ...post,
      categoryNames: post.categories.map(categoryId => {
        const category = categoriesQuery.data?.find(cat => cat.id === categoryId);
        return category?.name || 'Uncategorized';
      })
    })),
    isLoading: postsQuery.isLoading || categoriesQuery.isLoading,
    error: postsQuery.error || categoriesQuery.error,
  };
};