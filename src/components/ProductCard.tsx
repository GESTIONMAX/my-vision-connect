
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProduct';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export const ProductCard = ({ product, index = 0, className }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      quantity: 1,
      reference: product.sku || product.id,
      category: product.category || 'Lunettes',
      originalPrice: product.price || 0
    });

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier`,
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/checkout')}
        >
          Voir le panier
        </Button>
      )
    });
  };

  // Déterminer le bon lien selon le type de produit
  const getProductLink = () => {
    const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `/produit/${generateSlug(product.name)}`;
  };

  const productLink = getProductLink();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group ${className || ''}`}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full bg-white dark:bg-gray-800">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.is_featured && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                Nouveau
              </Badge>
            )}
            {product.is_featured && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                ⭐ Populaire
              </Badge>
            )}
            {/* Pas de système de discount pour le moment */}
            {(product.stock_quantity || 0) === 0 && (
              <Badge variant="secondary" className="text-xs">
                Rupture
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(productLink);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full h-8 w-8" 
              disabled={(product.stock_quantity || 0) === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          {/* Image du produit ou illustration par défaut */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {product.images && product.images.length > 0 ? (
              // Afficher la première image réelle du produit
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  // Fallback vers l'illustration si l'image ne charge pas
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            
            {/* Illustration de lunettes par défaut (fallback) */}
            <div className={`relative w-full h-full flex items-center justify-center ${product.images && product.images.length > 0 ? 'hidden' : ''}`}>
              <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center gap-1">
                  {/* Enhanced lenses with gradient */}
                  <div className={`w-16 h-12 rounded-full border-4 border-gray-800 dark:border-gray-200 ${
                    product.category === 'sport' 
                      ? 'bg-gradient-to-br from-blue-600/50 to-purple-600/50 shadow-lg' 
                      : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30'
                  }`}></div>
                  <div className="w-3 h-1 bg-gray-800 dark:bg-gray-200 rounded"></div>
                  <div className={`w-16 h-12 rounded-full border-4 border-gray-800 dark:border-gray-200 ${
                    product.category === 'sport' 
                      ? 'bg-gradient-to-br from-blue-600/50 to-purple-600/50 shadow-lg' 
                      : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30'
                  }`}></div>
                </div>
                <div className="absolute top-1/2 -left-4 w-6 h-1 bg-gray-800 dark:bg-gray-200 rounded transform -translate-y-1/2 rotate-12"></div>
                <div className="absolute top-1/2 -right-4 w-6 h-1 bg-gray-800 dark:bg-gray-200 rounded transform -translate-y-1/2 -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              <Link 
                to={productLink}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {product.name}
              </Link>
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Affichage simplifié - les features seront ajoutées plus tard */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.lens_technology && (
                <Badge variant="outline" className="text-xs">
                  {product.lens_technology}
                </Badge>
              )}
              {product.category && (
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.review_count || 0})
              </span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {product.price || 0}€
                </span>
                {/* Pas de prix original pour le moment */}
              </div>
            </div>
            <Button 
              variant={(product.stock_quantity || 0) > 0 ? "default" : "secondary"} 
              size="sm"
              disabled={(product.stock_quantity || 0) === 0}
              onClick={handleAddToCart}
            >
              {(product.stock_quantity || 0) > 0 ? "Ajouter" : "Rupture"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
