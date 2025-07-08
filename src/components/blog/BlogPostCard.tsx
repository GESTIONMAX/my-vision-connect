import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WordPressPost, wpUtils } from '@/services/wordpressApi';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  post: WordPressPost;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export const BlogPostCard = ({ post, variant = 'default', className }: BlogPostCardProps) => {
  const featuredImage = wpUtils.getFeaturedImage(post);
  const categories = wpUtils.getPostCategories(post);
  const excerpt = wpUtils.createExcerpt(post.content.rendered, 120);
  const readingTime = Math.ceil(wpUtils.stripHtml(post.content.rendered).length / 1000);

  if (variant === 'compact') {
    return (
      <Card className={`hover:shadow-lg transition-all duration-300 ${className || ''}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            {featuredImage && (
              <img 
                src={featuredImage} 
                alt={post.title.rendered}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title.rendered}
                </Link>
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{wpUtils.formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className={`hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-2 ${className || ''}`}>
        {featuredImage && (
          <div className="relative h-64 overflow-hidden">
            <img 
              src={featuredImage} 
              alt={post.title.rendered}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-yellow-50">
                ⭐ En vedette
              </Badge>
            </div>
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            ))}
          </div>
          <h2 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            <Link to={`/blog/${post.slug}`}>
              {post.title.rendered}
            </Link>
          </h2>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{wpUtils.formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min</span>
              </div>
            </div>
            <Button asChild size="sm">
              <Link to={`/blog/${post.slug}`}>
                Lire la suite
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 group ${className || ''}`}>
      {featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={featuredImage} 
            alt={post.title.rendered}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.sticky && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                Épinglé
              </Badge>
            </div>
          )}
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{categories.length - 2}
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title.rendered}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{wpUtils.formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/blog/${post.slug}`}>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};