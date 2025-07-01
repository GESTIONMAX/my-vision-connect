
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { useCollections } from '@/hooks/useCollections';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Percent } from 'lucide-react';

const Shop = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: collections = [] } = useCollections();

  const [filters, setFilters] = useState({
    category: 'all',
    color: 'all',
    usage: 'all',
    genre: 'all',
    sort: 'popularity',
    collection: 'all'
  });

  const [activeTab, setActiveTab] = useState('all');

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      color: 'all',
      usage: 'all',
      genre: 'all',
      sort: 'popularity',
      collection: 'all'
    });
    setActiveTab('all');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setFilters(prev => ({ ...prev, category: 'all', sort: 'popularity' }));
    } else if (tab === 'bestsellers') {
      setFilters(prev => ({ ...prev, category: 'all', sort: 'popularity' }));
    } else if (tab === 'sport') {
      setFilters(prev => ({ ...prev, category: 'sport' }));
    } else if (tab === 'lifestyle') {
      setFilters(prev => ({ ...prev, category: 'lifestyle' }));
    } else if (tab === 'prismatic') {
      setFilters(prev => ({ ...prev, collection: 'prismatic' }));
    } else if (tab === 'bundles') {
      setFilters(prev => ({ ...prev, collection: 'chamelo-bundles' }));
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Apply tab-specific filtering
      if (activeTab === 'bestsellers' && !product.isPopular) return false;
      if (activeTab === 'sport' && product.category !== 'sport') return false;
      if (activeTab === 'lifestyle' && product.category !== 'lifestyle') return false;
      if (activeTab === 'prismatic' && product.collection !== 'prismatic') return false;
      if (activeTab === 'bundles' && product.collection !== 'chamelo-bundles') return false;
      
      // Apply additional filters
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.color !== 'all' && !product.color?.includes(filters.color)) return false;
      if (filters.usage !== 'all' && product.usage !== filters.usage) return false;
      if (filters.genre !== 'all' && product.genre !== filters.genre) return false;
      if (filters.collection !== 'all' && product.collection !== filters.collection) return false;
      return true;
    });

    // Sort products
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, filters, activeTab]);

  // Get category products
  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  const sportProducts = getProductsByCategory('sport');
  const lifestyleProducts = getProductsByCategory('lifestyle'); 
  const classicProducts = getProductsByCategory('classic');
  const bestsellers = products.filter(p => p.isPopular);

  const categoryTabs = [
    { id: 'all', label: 'ALL', count: products.length },
    { id: 'bestsellers', label: 'BEST SELLERS', count: bestsellers.length },
    { id: 'sport', label: 'SPORT', count: sportProducts.length },
    { id: 'lifestyle', label: 'LIFESTYLE', count: lifestyleProducts.length },
    { id: 'prismatic', label: 'PRISMATIC™', count: products.filter(p => p.collection === 'prismatic').length },
    { id: 'bundles', label: 'CHAMELO BUNDLES', count: products.filter(p => p.collection === 'chamelo-bundles').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              CHAMELO SHOP
            </h1>
            <p className="text-lg text-blue-100">
              Lunettes connectées à teinte électronique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Percent className="h-6 w-6" />
              <h2 className="text-2xl font-bold">NOTRE PLUS GROSSE PROMOTION DE L'ANNÉE!</h2>
              <Percent className="h-6 w-6" />
            </div>
            <p className="text-orange-100 mb-4">Jusqu'à -40% sur une sélection de lunettes connectées</p>
            <Button variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Découvrir les offres
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600 dark:text-gray-400">
            <span>HOME</span> / <span className="font-semibold text-gray-900 dark:text-white">SHOP ALL</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shop All
          </h1>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`px-6 py-2 font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
            
            {/* Sort & Filter Button */}
            <div className="ml-auto">
              <Button 
                variant="outline" 
                className="px-6 py-2 font-medium bg-white text-black border-gray-300 hover:bg-gray-50"
              >
                🎚️ SORT & FILTER
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Shop Collections */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block flex-shrink-0 w-64"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  SHOP BY COLLECTION
                </h3>
                
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 h-auto"
                    onClick={() => handleTabChange('all')}
                  >
                    <div>
                      <div className="font-medium">SHOP ALL</div>
                      <div className="text-sm text-gray-500">{products.length} produits</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 h-auto"
                    onClick={() => handleTabChange('bestsellers')}
                  >
                    <div>
                      <div className="font-medium">BESTSELLERS</div>
                      <div className="text-sm text-gray-500">Nos plus populaires</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 h-auto"
                    onClick={() => handleFilterChange('sort', 'newest')}
                  >
                    <div>
                      <div className="font-medium">NEW ARRIVALS</div>
                      <div className="text-sm text-gray-500">Dernières nouveautés</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 h-auto"
                    onClick={() => handleTabChange('sport')}
                  >
                    <div>
                      <div className="font-medium">SPORT</div>
                      <div className="text-sm text-gray-500">{sportProducts.length} produits</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 h-auto"
                    onClick={() => handleTabChange('lifestyle')}
                  >
                    <div>
                      <div className="font-medium">LIFESTYLE</div>
                      <div className="text-sm text-gray-500">{lifestyleProducts.length} produits</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 h-auto"
                    onClick={() => handleFilterChange('category', 'classic')}
                  >
                    <div>
                      <div className="font-medium">CLASSIC</div>
                      <div className="text-sm text-gray-500">{classicProducts.length} produits</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-6">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                resultCount={filteredAndSortedProducts.length}
              />
            </div>
          </motion.div>

          {/* Main Products Grid */}
          <div className="flex-1">
            {/* Sort & Filter Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeTab === 'all' ? 'Tous les produits' : 
                   activeTab === 'bestsellers' ? 'Meilleures ventes' :
                   activeTab === 'sport' ? 'Sport' :
                   activeTab === 'lifestyle' ? 'Lifestyle' :
                   activeTab === 'prismatic' ? 'Prismatic™' :
                   activeTab === 'bundles' ? 'Chamelo Bundles' : 'Tous les produits'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length > 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="popularity">Plus populaires</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="newest">Nouveautés</option>
                  <option value="rating">Mieux notés</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 || productsLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {productsLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-[4/3] mb-4"></div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"></div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
                    </div>
                  ))
                ) : (
                  filteredAndSortedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-gray-400 text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun produit trouvé
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Essayez de modifier vos filtres pour voir plus de résultats
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                  >
                    Effacer tous les filtres
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
