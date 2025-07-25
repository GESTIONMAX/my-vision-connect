import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  category?: string;
}

interface EnhancedProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export const EnhancedProductCard = ({ product, index = 0, className = "" }: EnhancedProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    setIsLoading(true);
    
    try {
      addItem({
        id: product.slug,
        name: product.name,
        price: product.price,
        quantity: quantity,
        reference: product.slug,
        category: product.category || 'Lunettes',
        originalPrice: product.originalPrice
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
    } finally {
      setIsLoading(false);
    }
  };

  const getProductLink = () => {
    if (product.slug.includes('music-shield')) {
      return `/products/${product.slug}`;
    }
    return `/products/${product.slug}`;
  };

  const displayImages = product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const currentImage = displayImages[selectedImageIndex] || displayImages[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group ${className}`}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-border">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/40 relative overflow-hidden">
              {currentImage !== '/placeholder.svg' ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-lg font-medium">
                    {product.name}
                  </span>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Thumbnails */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {displayImages.slice(0, 4).map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      selectedImageIndex === index 
                        ? 'bg-primary scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category */}
            <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
              {product.category || 'Lunettes'}
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg mb-2 line-clamp-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate(getProductLink())}>
              {product.name}
            </h3>

            {/* Rating */}
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
              <span className="text-sm text-muted-foreground">
                ({product.rating}) • {product.reviewCount} avis
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>
              <div className="text-green-600 text-sm font-medium flex items-center gap-1 mt-1">
                <Truck className="h-3 w-3" />
                Livraison gratuite dès 50€
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantité :</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuantity(quantity + 1);
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? "En stock" : "Rupture de stock"}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full mb-4"
              disabled={!product.inStock || isLoading}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {!product.inStock ? 'Rupture de stock' : 'Ajouter au panier'}
            </Button>

            {/* Service Badges */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-green-600">
                <Truck className="h-3 w-3" />
                <span>Livraison gratuite dès 50€</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Shield className="h-3 w-3" />
                <span>Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <RotateCcw className="h-3 w-3" />
                <span>Retour gratuit 30 jours</span>
              </div>
            </div>

            {/* View Details Button */}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate(getProductLink())}
            >
              Voir les détails
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};