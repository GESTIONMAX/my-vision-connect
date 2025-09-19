import { motion } from 'framer-motion';
import { useProductsNew } from '@/hooks/useProductsNew';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LifestyleCollection = () => {
  const { data: products = [] } = useProductsNew();
  
  const generateProductSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Filtrer les produits lifestyle et connectés
  const lifestyleProducts = products.filter(product => 
    product.category === 'lifestyle' || product.collection === 'urban-collection'
  );
  
  const connectedProducts = products.filter(product => 
    product.collection === 'tech-collection'
  );

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            COLLECTION LIFESTYLE
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Style & Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos lunettes lifestyle alliant élégance urbaine et technologies avancées
          </p>
        </motion.div>

        {/* Lifestyle Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lifestyleProducts.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white">
                        Nouveau
                      </Badge>
                    )}
                    {product.isPopular && (
                      <Badge className="bg-orange-500 text-white">
                        Populaire
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="destructive">
                        Rupture de stock
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Collection: {product.collection}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-primary">
                        {product.price}€
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}€
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/product/${generateProductSlug(product.name)}`}>
                      <Button className="group/btn">
                        Voir le produit
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connected Products Section */}
        {connectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 text-blue-600 border-blue-600">
                TECH COLLECTION
              </Badge>
              <h3 className="text-3xl font-bold mb-4">
                Lunettes Connectées
              </h3>
              <p className="text-muted-foreground">
                L'avenir de la vision avec nos technologies intelligentes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedProducts.slice(0, 3).map((product, index) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 rounded-lg mb-4 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-blue-500" />
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {product.price}€
                      </span>
                      
                      <Link to={`/product/${generateProductSlug(product.name)}`}>
                        <Button size="sm" variant="outline">
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              Voir toute la collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};