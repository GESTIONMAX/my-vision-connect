import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid, List, Filter, SortAsc } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/ProductCard';
import { useCollectionProducts } from '@/hooks/useCollectionProducts';
import { useCollections } from '@/hooks/useCollections';
import { useState } from 'react';

const CollectionDetailPage = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  
  const { data: collections } = useCollections();
  const { data: products, isLoading, error } = useCollectionProducts(collectionSlug || '');
  
  const currentCollection = collections?.find(c => c.slug === collectionSlug);
  
  const sortedProducts = React.useMemo(() => {
    if (!products) return [];
    
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [products, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentCollection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Collection non trouvée</h1>
          <Button onClick={() => navigate('/shop')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/shop')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au catalogue
          </Button>
          
          <nav className="text-sm text-muted-foreground mb-4">
            <span>HOME / SHOP / {currentCollection.name.toUpperCase()}</span>
          </nav>
        </motion.div>

        {/* Collection Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-12">
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-4">
                Collection
              </Badge>
              <h1 className="text-5xl font-bold text-foreground mb-4">
                {currentCollection.name}
              </h1>
              {currentCollection.description && (
                <p className="text-xl text-muted-foreground max-w-2xl">
                  {currentCollection.description}
                </p>
              )}
              <div className="mt-6 flex items-center gap-4">
                <Badge variant="outline">
                  {products?.length || 0} produits
                </Badge>
              </div>
            </div>
            
            {currentCollection.image_url && (
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
                <img 
                  src={currentCollection.image_url} 
                  alt={currentCollection.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom (A-Z)</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Aucun produit dans cette collection
              </h3>
              <p className="text-muted-foreground mb-8">
                Cette collection sera bientôt enrichie avec de nouveaux produits.
              </p>
              <Button onClick={() => navigate('/shop')} variant="outline">
                Explorer d'autres collections
              </Button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard 
                    product={product} 
                    className={viewMode === 'list' ? 'flex flex-row h-48' : ''}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionDetailPage;