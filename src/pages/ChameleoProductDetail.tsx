import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useChameleoProducts from '@/hooks/useChameleoData';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import type { ChameleoProduct } from '@/types/chameleo';

const ChameleoProductDetail = () => {
  const { handle } = useParams();
  const { products, loading } = useChameleoProducts();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Trouver le produit par handle
  const product = products.find((p) => p.handle === handle);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/chamelo-catalog" replace />;
  }

  const currentVariant = product.variants[selectedVariant];
  const currentImages = product.images || [];
  const currentImage = currentImages[selectedImageIndex] || { src: '/placeholder.svg', url: '/placeholder.svg' };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${currentVariant.id}`,
      name: product.name || 'Produit Chamelo',
      price: parseFloat(currentVariant.price),
      quantity: quantity,
      reference: currentVariant.sku || product.handle,
      category: product.product_type || 'Lunettes',
      image: currentImage.src || currentImage.url,
      variant: currentVariant.name || currentVariant.option1 || null
    };

    addItem(cartItem);

    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} (${quantity}) a été ajouté à votre panier`,
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

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(numPrice);
  };

  const productTitle = product.name || 'Produit Chamelo';
  const productDescription = product.description || 'Aucune description disponible.';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/chamelo-catalog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue Chamelo
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={currentImage.src || currentImage.url || '/placeholder.svg'}
                alt={productTitle}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            {/* Miniatures */}
            {currentImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {currentImages.slice(0, 4).map((image, index) => (
                  <button
                    key={image.id || index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-600 ring-2 ring-blue-600/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.src || image.url || '/placeholder.svg'}
                      alt={`${productTitle} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            {/* En-tête */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.product_type || 'Lunettes'}</Badge>
                {product.tags?.includes('new') && (
                  <Badge className="bg-green-600">Nouveau</Badge>
                )}
                {product.tags?.includes('bestseller') && (
                  <Badge className="bg-orange-600">Best Seller</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {productTitle}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    (4.8) • 127 avis
                  </span>
                </div>
              </div>
            </div>

            {/* Prix */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(currentVariant.price)}
                </span>
                {currentVariant.compare_at_price && currentVariant.compare_at_price > parseFloat(currentVariant.price) && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(currentVariant.compare_at_price)}
                  </span>
                )}
              </div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                ✓ Livraison gratuite dès 50€
              </p>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Options disponibles :</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`p-3 rounded-lg border transition-all text-left ${
                        selectedVariant === index
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">
                        {variant.name || variant.option1 || 'Standard'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPrice(variant.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Quantité :</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentVariant.available ? 'En stock' : 'Rupture de stock'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                disabled={!currentVariant.available}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {currentVariant.available ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4" />
                  Favoris
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Garanties */}
            <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Livraison gratuite dès 50€</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <span className="text-sm">Retour gratuit 30 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs avec informations détaillées */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews">Avis clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    {productDescription.includes('<') ? (
                      <div dangerouslySetInnerHTML={{ __html: productDescription }} />
                    ) : (
                      <p>{productDescription}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Informations générales</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Référence :</dt>
                          <dd className="font-medium">{currentVariant.sku || product.handle}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Type :</dt>
                          <dd className="font-medium">{product.product_type || 'Lunettes'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Marque :</dt>
                          <dd className="font-medium">{product.vendor || 'Chamelo'}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Disponibilité</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Stock :</dt>
                          <dd className="font-medium text-green-600">
                            {currentVariant.available ? 'En stock' : 'Rupture de stock'}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600 dark:text-gray-400">Expédition :</dt>
                          <dd className="font-medium">24-48h</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-2xl font-bold">4.8</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Basé sur 127 avis clients
                    </p>
                    <Button variant="outline">
                      Laisser un avis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChameleoProductDetail;