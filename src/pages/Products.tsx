
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { products, Product } from '@/data/products';

const Products = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    color: 'all',
    usage: 'all',
    genre: 'all',
    sort: 'popularity'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      color: 'all',
      usage: 'all',
      genre: 'all',
      sort: 'popularity'
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.color !== 'all' && !product.color.includes(filters.color)) return false;
      if (filters.usage !== 'all' && product.usage !== filters.usage) return false;
      if (filters.genre !== 'all' && product.genre !== filters.genre) return false;
      return true;
    });

    // Tri
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
  }, [filters]);

  // Créer une grille avec des images d'ambiance intégrées
  const createGridWithAmbientImages = () => {
    const items = [];
    let productIndex = 0;

    for (let i = 0; i < Math.ceil(filteredAndSortedProducts.length * 1.4); i++) {
      // Ajouter une image d'ambiance tous les 6-8 produits
      if (i > 0 && i % 7 === 0 && productIndex < filteredAndSortedProducts.length - 2) {
        items.push(
          <motion.div
            key={`ambient-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
          >
            <div className="relative aspect-[4/3] md:aspect-[3/2] rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {i % 14 === 0 ? "Style & Performance" : "Innovation NeoShades"}
                  </h3>
                  <p className="text-blue-100">
                    {i % 14 === 0 
                      ? "Découvrez l'élégance de la technologie adaptive"
                      : "La révolution des lunettes connectées"
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      } else if (productIndex < filteredAndSortedProducts.length) {
        items.push(
          <ProductCard
            key={filteredAndSortedProducts[productIndex].id}
            product={filteredAndSortedProducts[productIndex]}
            index={i}
          />
        );
        productIndex++;
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Catalogue NeoShades
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez notre collection complète de lunettes connectées à teinte électronique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultCount={filteredAndSortedProducts.length}
          />
        </motion.div>

        {/* Grille de produits avec images d'ambiance */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-max"
          >
            {createGridWithAmbientImages()}
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
              <button
                onClick={handleClearFilters}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Effacer tous les filtres
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
