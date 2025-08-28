import React from 'react';
import { WordPressPost } from '@/services/wordpressApi';
import { BlogPostCard } from './BlogPostCard';

interface BlogPostListProps {
  posts: WordPressPost[];
  viewMode?: 'grid' | 'list';
  className?: string;
}

export const BlogPostList = ({ posts, viewMode = 'grid', className }: BlogPostListProps) => {
  // Séparer les posts épinglés des autres
  const stickyPosts = posts.filter(post => post.sticky);
  const regularPosts = posts.filter(post => !post.sticky);
  
  // Réorganiser : posts épinglés en premier, puis les autres
  const orderedPosts = [...stickyPosts, ...regularPosts];

  if (viewMode === 'list') {
    return (
      <div className={`space-y-6 ${className || ''}`}>
        {orderedPosts.map((post, index) => (
          <div key={post.id} className="transform transition-all duration-300 hover:scale-[1.02]">
            <BlogPostCard 
              post={post} 
              variant={post.sticky ? 'featured' : 'default'}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className || ''}`}>
      {/* Posts épinglés en vedette */}
      {stickyPosts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Articles en vedette
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stickyPosts.map((post) => (
              <div key={post.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                <BlogPostCard post={post} variant="featured" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts réguliers */}
      {regularPosts.length > 0 && (
        <div className="space-y-6">
          {stickyPosts.length > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Derniers articles
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message si aucun post */}
      {orderedPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun article disponible</h3>
          <p className="text-muted-foreground">
            Les articles du blog apparaîtront ici une fois configurés.
          </p>
        </div>
      )}

    </div>
  );
};