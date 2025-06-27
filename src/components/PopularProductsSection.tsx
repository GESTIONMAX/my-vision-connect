
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';

export const PopularProductsSection = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get the first 6 popular products
  const popularProducts = products
    .filter(product => product.isPopular)
    .slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nos Best-Sellers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Les modèles préférés de nos clients
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-t-lg h-64 mb-4"></div>
                <div className="p-6">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-3"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded h-8 w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Best-Sellers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Les modèles préférés de nos clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        {product.name}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                        {product.isNew ? "Nouveau" : "Best-seller"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {product.rating} ({product.reviewCount} avis)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price}€
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice}€
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/products/${product.slug}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Voir le produit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Voir toute la collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
