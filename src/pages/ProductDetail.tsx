
import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProduct } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/products" replace />;
  }

  if (!selectedColor && product.color.length > 0) {
    setSelectedColor(product.color[0]);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-2xl font-medium">
                  {product.name}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-blue-500' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">
                      Vue {index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  Nouveau
                </Badge>
              )}
              {product.isPopular && (
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                  Populaire
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive">
                  Rupture de stock
                </Badge>
              )}
            </div>

            {/* Title and rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviewCount} avis)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {product.price}€
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice}€
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color selection */}
            <div>
              <h3 className="font-semibold mb-3">Couleur</h3>
              <div className="flex flex-wrap gap-2">
                {product.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Caractéristiques principales</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Technical specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle>Spécifications techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="font-medium">{key}</span>
                    <span className="text-gray-600 dark:text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
