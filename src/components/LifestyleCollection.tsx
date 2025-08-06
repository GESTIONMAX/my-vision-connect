import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProduct';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateProductSlug } from '@/hooks/useProduct';

export const LifestyleCollection = () => {
  const { data: products = [] } = useProducts();
  
  // Filtrer les produits lifestyle et connectés
  const lifestyleProducts = products.filter(product => 
    product.category === 'lifestyle' || product.collection_slug === 'urban-collection'
  );
  
  const connectedProducts = products.filter(product => 
    product.category === 'connected' || product.collection_slug === 'tech-collection'
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
            Collection 2024
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Lifestyle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme lifestyle alliant élégance urbaine et technologie connectée pour un style de vie moderne.
          </p>
        </motion.div>

        {/* Lifestyle Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {lifestyleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Product Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                {/* Hero Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Lunettes illustration */}
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-12 rounded-full border-4 border-gray-800 dark:border-gray-200 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
                      <div className="w-4 h-2 bg-gray-800 dark:bg-gray-200 rounded"></div>
                      <div className="w-20 h-12 rounded-full border-4 border-gray-800 dark:border-gray-200 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
                    </div>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                  <Button size="sm" className="bg-primary text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>

                {/* Product Badge */}
                {product.is_featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    Premium
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      {product.price}€
                    </div>
                  </div>
                </div>

                {/* Technology Badge */}
                {product.lens_technology && (
                  <Badge variant="outline" className="mb-4">
                    {product.lens_technology}
                  </Badge>
                )}

                {/* Action Button */}
                <Link to={`/produit/${generateProductSlug(product.name)}`}>
                  <Button className="w-full group">
                    Découvrir
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connected Products Section */}
        {connectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4 border-white text-white">
                    Innovation
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">
                    Technologie Connectée
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Découvrez nos lunettes connectées révolutionnaires qui allient style lifestyle et innovation technologique.
                  </p>
                  
                  {/* Connected Product Preview */}
                  {connectedProducts[0] && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                      <h4 className="font-semibold mb-2">{connectedProducts[0].name}</h4>
                      <p className="text-sm text-blue-100 mb-3">
                        {connectedProducts[0].description?.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{connectedProducts[0].price}€</span>
                        <Link to={`/produit/${generateProductSlug(connectedProducts[0].name)}`}>
                          <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-blue-600">
                            Découvrir
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Illustration */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-28 relative">
                      {/* Lunettes connectées illustration */}
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-24 h-16 rounded-full border-4 border-white bg-gradient-to-br from-orange-400/30 to-red-400/30 relative">
                          {/* LED indicator */}
                          <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-5 h-3 bg-white rounded"></div>
                        <div className="w-24 h-16 rounded-full border-4 border-white bg-gradient-to-br from-orange-400/30 to-red-400/30 relative">
                          {/* LED indicator */}
                          <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Tech elements */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-1 bg-white/50 rounded animate-pulse"></div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 h-1 bg-white/50 rounded animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button size="lg" variant="outline" className="group">
              Voir toute la collection
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};