import React, { useState } from 'react';
import { Search, Filter, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { BlogPostList } from '../components/blog/BlogPostList';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogSidebar } from '../components/blog/BlogSidebar';
import { useWordPressPosts, useWordPressCategories, useWordPressSearch } from '../useWordPress';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'popularity'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Hooks WordPress
  const { data: categories = [], isLoading: categoriesLoading } = useWordPressCategories();
  
  // Posts avec pagination
  const postsParams = {
    per_page: postsPerPage,
    page: currentPage,
    orderby: (sortBy === 'date' ? 'date' : sortBy === 'title' ? 'title' : 'modified') as 'date' | 'title' | 'modified',
    order: 'desc' as const,
    ...(selectedCategory !== 'all' && { categories: [parseInt(selectedCategory)] })
  };
  
  const { data: posts = [], isLoading: postsLoading, error } = useWordPressPosts(postsParams);
  
  // Recherche
  const { data: searchResults = [], isLoading: searchLoading } = useWordPressSearch(
    searchQuery,
    { per_page: postsPerPage, page: currentPage }
  );

  // Données à afficher (recherche ou posts normaux)
  const displayPosts = searchQuery.length > 2 ? searchResults : posts;
  const isLoading = searchQuery.length > 2 ? searchLoading : postsLoading;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset à la première page lors d'une recherche
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery(''); // Clear search when changing category
  };

  const handleSortChange = (sort: 'date' | 'title' | 'popularity') => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <BlogHero />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Search Bar */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort Filter */}
                  <Select value={sortBy} onValueChange={(value: string) => handleSortChange(value as 'date' | 'title' | 'popularity')}>
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Plus récents</SelectItem>
                      <SelectItem value="title">Alphabétique</SelectItem>
                      <SelectItem value="popularity">Plus populaires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-10 px-3"
                  >
                    <div className="grid grid-cols-2 gap-1 h-4 w-4">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-10 px-3"
                  >
                    <div className="space-y-1 h-4 w-4">
                      <div className="bg-current h-0.5 w-full rounded-full"></div>
                      <div className="bg-current h-0.5 w-full rounded-full"></div>
                      <div className="bg-current h-0.5 w-full rounded-full"></div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      <Search className="h-3 w-3" />
                      "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      <Tag className="h-3 w-3" />
                      {categories.find(c => c.id.toString() === selectedCategory)?.name}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-destructive mb-2">
                      Erreur de chargement
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Impossible de charger les articles du blog. 
                      Veuillez vérifier la configuration WordPress.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => window.location.reload()}
                    >
                      Réessayer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            {!isLoading && !error && (
              <>
                {displayPosts.length > 0 ? (
                  <BlogPostList 
                    posts={displayPosts} 
                    viewMode={viewMode}
                  />
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Aucun article trouvé
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {searchQuery 
                            ? `Aucun résultat pour "${searchQuery}"`
                            : 'Aucun article disponible pour cette catégorie'
                          }
                        </p>
                        {(searchQuery || selectedCategory !== 'all') && (
                          <div className="space-x-2">
                            {searchQuery && (
                              <Button 
                                variant="outline" 
                                onClick={() => setSearchQuery('')}
                              >
                                Effacer la recherche
                              </Button>
                            )}
                            {selectedCategory !== 'all' && (
                              <Button 
                                variant="outline" 
                                onClick={() => setSelectedCategory('all')}
                              >
                                Voir tous les articles
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Pagination */}
                {displayPosts.length === postsPerPage && (
                  <div className="flex justify-center mt-8">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Précédent
                      </Button>
                      <div className="flex items-center px-4 py-2 bg-muted rounded-md">
                        Page {currentPage}
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Suivant
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
};

export default Blog;