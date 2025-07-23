import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFeaturedWordPressPosts } from '@/hooks/useWordPress';
import { wpUtils } from '@/services/wordpressApi';

export const BlogHero = () => {
  const { data: featuredPosts = [], isLoading } = useFeaturedWordPressPosts();
  const featuredPost = featuredPosts[0];

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="h-8 bg-white/20 rounded animate-pulse mb-4 w-1/2 mx-auto"></div>
            <div className="h-4 bg-white/20 rounded animate-pulse w-3/4 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blog & Actualités
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Découvrez les dernières innovations en matière de lunettes intelligentes, 
            nos conseils d'experts et les tendances du secteur.
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1 text-white">
                    <Badge className="bg-white/20 text-white border-white/30 mb-4">
                      Article en vedette
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {featuredPost.title.rendered}
                    </h2>
                    <p className="text-blue-100 text-lg mb-6 line-clamp-3">
                      {wpUtils.createExcerpt(featuredPost.content.rendered, 200)}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex items-center gap-4 text-blue-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {wpUtils.formatDate(featuredPost.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Équipe Chamelo</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="secondary" 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        Lire l'article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                  
                  {wpUtils.getFeaturedImage(featuredPost) && (
                    <div className="lg:w-80">
                      <img 
                        src={wpUtils.getFeaturedImage(featuredPost) || '/placeholder.svg'} 
                        alt={featuredPost.title.rendered}
                        className="w-full h-48 lg:h-64 object-cover rounded-lg"
                        onError={(e) => {
                          console.error(`Failed to load hero image: ${wpUtils.getFeaturedImage(featuredPost)}`, e);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => console.log(`Successfully loaded hero image: ${wpUtils.getFeaturedImage(featuredPost)}`)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-blue-100">Articles publiés</div>
          </div>
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-blue-100">Lecteurs mensuels</div>
          </div>
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">5</div>
            <div className="text-blue-100">Experts contributeurs</div>
          </div>
        </div>
      </div>
    </section>
  );
};