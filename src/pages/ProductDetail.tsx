import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct } from '@/hooks/useProduct';
import { useProductVariants } from '@/hooks/useProductVariants';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { EnhancedProductImageGallery } from '@/components/product/EnhancedProductImageGallery';
import { EnhancedProductActions } from '@/components/product/EnhancedProductActions';
import { EnhancedProductDescription } from '@/components/product/EnhancedProductDescription';
import { ProductKeyFeatures } from '@/components/product/ProductKeyFeatures';
import { ProductBenefits } from '@/components/product/ProductBenefits';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { ProductPackageContent } from '@/components/product/ProductPackageContent';
import { ProductConfigurator } from '@/components/product/ProductConfigurator';
// import { ProductSpecificationsView } from '@/components/product/ProductSpecificationsView';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug || '');
  const { data: variants = [] } = useProductVariants(slug || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [configuration, setConfiguration] = useState<{
    variantId?: string;
    optionIds: string[];
    finalPrice: number;
    isValid: boolean;
  }>({
    variantId: undefined,
    optionIds: [],
    finalPrice: product?.price || 0,
    isValid: true,
  });
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/products" replace />;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: configuration.finalPrice,
      quantity: 1,
      reference: product.id,
      category: product.category || 'Lunettes',
      originalPrice: product.price || 0,
      // Ajouter les informations de configuration
      variantId: configuration.variantId,
      selectedOptions: configuration.optionIds,
    });

    toast({
      title: "Produit ajouté",
      description: `${product.name} configuré a été ajouté à votre panier`,
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <EnhancedProductImageGallery
            productName={product.name}
            productSlug={slug || ''}
            variantSlug={variants.find(v => v.id === configuration.variantId)?.color_frame}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />

          {/* Product Information */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground">
              <span>{product.category || 'Lunettes'}</span>
            </nav>

            {/* Product Title */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-3xl font-bold text-foreground flex-1">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 ml-4">
                  <FavoriteButton 
                    productId={product.id} 
                    size="lg"
                  />
                  <ShareButton 
                    productName={product.name}
                    productUrl={window.location.href}
                    size="lg"
                  />
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({product.rating || 0}) • {product.review_count || 0} avis
                  </span>
                </div>
              </div>
            </div>

            {/* Configuration du produit */}
            {/* Configuration simplifiée - à adapter selon vos besoins */}
            <div className="mb-6 p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Configuration du produit</h3>
              <p className="text-sm text-muted-foreground">
                Variants et options disponibles à configurer
              </p>
            </div>

            {/* Prix dynamique */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-foreground">
                {configuration.finalPrice.toFixed(2)} €
              </div>
              {product.price && product.price !== configuration.finalPrice && (
                <div className="text-lg text-muted-foreground line-through">
                  {product.price.toFixed(2)} €
                </div>
              )}
              <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Livraison gratuite dès 50€
              </div>
            </div>

            {/* Product Actions */}
            <EnhancedProductActions
              product={product}
              onAddToCart={handleAddToCart}
              disabled={!configuration.isValid}
            />

            {/* Service Badges */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-green-600">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-medium">Livraison gratuite dès 50€</span>
              </div>
              <div className="flex items-center gap-3 text-blue-600">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-3 text-purple-600">
                <RotateCcw className="h-5 w-5" />
                <span className="text-sm font-medium">Retour gratuit 30 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-14 bg-muted/50">
              <TabsTrigger value="description" className="text-base font-medium">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="text-base font-medium">
                Caractéristiques
              </TabsTrigger>
              <TabsTrigger value="technical" className="text-base font-medium">
                Technique
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base font-medium">
                Avis clients
              </TabsTrigger>
            </TabsList>
            
            <div className="p-8">
              <TabsContent value="description" className="mt-0">
                <div className="space-y-6">
                  {/* Description enrichie */}
                   <EnhancedProductDescription 
                     product={{
                       name: product.name,
                       description: product.description,
                       category: product.category,
                       collection: product.collection
                     }} 
                   />
                  
                  {/* Caractéristiques clés */}
                  <ProductKeyFeatures productSlug={slug || ''} />
                  
                  {/* Bénéfices utilisateur */}
                  <ProductBenefits productSlug={slug || ''} />
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-0">
                <div className="space-y-6">
                  <ProductSpecifications 
                    specifications={{}} 
                    productSlug={slug || ''} 
                  />
                  
                  {/* Package Content */}
                  <ProductPackageContent productSlug={slug || ''} />
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Spécifications techniques</h3>
                  <p className="text-muted-foreground">
                    Les spécifications techniques détaillées seront bientôt disponibles.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4 fill-current" />
                    <h3 className="text-xl font-semibold mb-2">Excellent produit</h3>
                    <p className="text-muted-foreground mb-4">
                      Note moyenne de <span className="font-bold text-primary">{product.rating || 0}/5</span> basée sur <span className="font-bold">{product.review_count || 0} avis</span> clients vérifiés
                    </p>
                    
                    {/* Répartition des étoiles */}
                    <div className="max-w-md mx-auto space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-4">
                          <div className="flex items-center gap-1 min-w-[100px]">
                            <span className="text-sm">{stars}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ 
                                width: stars === 5 ? '60%' : 
                                       stars === 4 ? '25%' : 
                                       stars === 3 ? '10%' : 
                                       stars === 2 ? '3%' : '2%' 
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground min-w-[40px]">
                            {stars === 5 ? '60%' : 
                             stars === 4 ? '25%' : 
                             stars === 3 ? '10%' : 
                             stars === 2 ? '3%' : '2%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;