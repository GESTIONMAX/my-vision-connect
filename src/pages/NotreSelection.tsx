
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProduct';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Star, Heart } from 'lucide-react';

const NotreSelection = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const [activeFilter, setActiveFilter] = useState('all');

  // Simuler une sélection de produits avec des critères spécifiques
  const selectedProducts = useMemo(() => {
    // Prendre les produits en vedette ou avec de bonnes notes
    return products.filter(product => 
      product.is_featured || (product.rating && product.rating >= 4.5)
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return selectedProducts;
    if (activeFilter === 'bestsellers') return selectedProducts.filter(p => p.is_featured);
    if (activeFilter === 'new') return selectedProducts.filter(p => p.is_featured); // Tous les produits vedettes sont considérés comme nouveaux
    if (activeFilter === 'sport') return selectedProducts.filter(p => p.category === 'sport');
    if (activeFilter === 'lifestyle') return selectedProducts.filter(p => p.category === 'lifestyle');
    return selectedProducts;
  }, [selectedProducts, activeFilter]);

  const filterOptions = [
    { id: 'all', label: 'Tous nos coups de cœur', icon: Heart },
    { id: 'bestsellers', label: 'Meilleures ventes', icon: Star },
    { id: 'new', label: 'Nouveautés', icon: Award },
    { id: 'sport', label: 'Sport', icon: null },
    { id: 'lifestyle', label: 'Lifestyle', icon: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Award className="h-8 w-8 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Notre Sélection
              </h1>
            </div>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Découvrez nos coups de cœur sélectionnés par nos experts : 
              les modèles les plus innovants, les plus populaires et les dernières nouveautés.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 dark:text-gray-400">
            <span>HOME</span> / <span className="font-semibold text-gray-900 dark:text-white">NOTRE SÉLECTION</span>
          </nav>
        </div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sélectionnés avec soin par nos experts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chaque produit de cette sélection a été choisi pour ses performances exceptionnelles, 
            son design innovant ou sa popularité auprès de nos clients.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeFilter === option.id ? "default" : "outline"}
              className={`px-6 py-3 font-medium transition-all ${
                activeFilter === option.id 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.icon && <option.icon className="mr-2 h-4 w-4" />}
              {option.label}
            </Button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {selectedProducts.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Produits sélectionnés
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              4.7
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Note moyenne
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-green-600 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Satisfaction clients
            </div>
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {activeFilter === 'all' ? 'Tous nos coups de cœur' :
               activeFilter === 'bestsellers' ? 'Meilleures ventes' :
               activeFilter === 'new' ? 'Dernières nouveautés' :
               activeFilter === 'sport' ? 'Sélection Sport' :
               activeFilter === 'lifestyle' ? 'Sélection Lifestyle' : 'Notre sélection'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 || productsLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
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
                filteredProducts.map((product, index) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} index={index} />
                    {/* Badge de sélection */}
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-purple-600 text-white">
                        <Heart className="h-3 w-3 mr-1" />
                        Sélectionné
                      </Badge>
                    </div>
                  </div>
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
                  <Heart className="text-gray-400 text-2xl h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Aucun produit dans cette sélection
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Essayez un autre filtre pour découvrir nos autres coups de cœur
                </p>
                <Button
                  onClick={() => setActiveFilter('all')}
                  variant="outline"
                >
                  Voir tous nos coups de cœur
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white mt-12"
        >
          <h2 className="text-2xl font-bold mb-4">
            Envie de découvrir toute notre gamme ?
          </h2>
          <p className="text-purple-100 mb-6">
            Explorez notre catalogue complet avec plus de {products.length} modèles
          </p>
          <Button 
            variant="secondary" 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => window.location.href = '/shop'}
          >
            Voir tous nos produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotreSelection;
