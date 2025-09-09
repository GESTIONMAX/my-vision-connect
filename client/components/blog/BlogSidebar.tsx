import React from 'react';
import { Calendar, Tag, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Separator } from '../../separator';
import { BlogPostCard } from './BlogPostCard';
import { 
  useRecentWordPressPosts, 
  usePopularWordPressPosts, 
  useWordPressCategories,
  useWordPressTags 
} from '../../useWordPress';

export const BlogSidebar = () => {
  const { data: recentPosts = [] } = useRecentWordPressPosts(5);
  const { data: popularPosts = [] } = usePopularWordPressPosts(3);
  const { data: categories = [] } = useWordPressCategories();
  const { data: tags = [] } = useWordPressTags();

  // Limiter les catégories et tags affichés
  const topCategories = categories.slice(0, 8);
  const topTags = tags.slice(0, 12);

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Newsletter Subscription */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <BookOpen className="h-5 w-5" />
            Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 dark:text-blue-200 mb-4">
            Recevez nos derniers articles et actualités directement dans votre boîte mail.
          </p>
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="Votre email"
              className="w-full px-3 py-2 text-sm border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              S'abonner
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Articles populaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularPosts.map((post) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                variant="compact"
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Articles récents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.slice(0, 4).map((post) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                variant="compact"
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      {topCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Catégories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {topTags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Tags populaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques du blog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total articles</span>
            <span className="font-semibold">50+</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Catégories</span>
            <span className="font-semibold">{categories.length}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Lecteurs/mois</span>
            <span className="font-semibold">10K+</span>
          </div>
        </CardContent>
      </Card>

      {/* Archive */}
      <Card>
        <CardHeader>
          <CardTitle>Archives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { month: 'Décembre 2024', count: 8 },
              { month: 'Novembre 2024', count: 12 },
              { month: 'Octobre 2024', count: 15 },
              { month: 'Septembre 2024', count: 10 },
            ].map((archive) => (
              <div key={archive.month} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <span className="text-sm">{archive.month}</span>
                <Badge variant="outline" className="text-xs">
                  {archive.count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};