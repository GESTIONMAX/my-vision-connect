import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct } from '@/hooks/useProducts';
import { useProductVariants } from '@/hooks/useProductVariants';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { EnhancedProductImageGallery } from '@/components/product/EnhancedProductImageGallery';
import { EnhancedProductActions } from '@/components/product/EnhancedProductActions';
import { ProductKeyFeatures } from '@/components/product/ProductKeyFeatures';
import { ProductBenefits } from '@/components/product/ProductBenefits';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { ProductPackageContent } from '@/components/product/ProductPackageContent';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug || '');
  const { data: variants = [] } = useProductVariants(slug || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
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
      id: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
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
            images={product.images}
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
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
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
                  <span className="text-sm text-muted-foreground ml-2">
                    ({product.rating}) • {product.reviewCount} avis
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-foreground">
                {product.price.toFixed(2)} €
              </div>
              {product.originalPrice && (
                <div className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toFixed(2)} €
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
            <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/50">
              <TabsTrigger value="description" className="text-base font-medium">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="text-base font-medium">
                Caractéristiques
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base font-medium">
                Avis clients
              </TabsTrigger>
            </TabsList>
            
            <div className="p-8">
              <TabsContent value="description" className="mt-0">
                <div className="space-y-6">
                  <div className="prose prose-gray max-w-none dark:prose-invert">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                  
                  {/* Key Features in Description Tab */}
                  <ProductKeyFeatures productSlug={product.slug} />
                  
                  {/* Benefits */}
                  <ProductBenefits productSlug={product.slug} />
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-0">
                <div className="space-y-6">
                  <ProductSpecifications 
                    specifications={product.specifications} 
                    productSlug={product.slug} 
                  />
                  
                  {/* Package Content */}
                  <ProductPackageContent productSlug={product.slug} />
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Excellent produit</h3>
                    <p className="text-muted-foreground">
                      Note moyenne de {product.rating}/5 basée sur {product.reviewCount} avis clients
                    </p>
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