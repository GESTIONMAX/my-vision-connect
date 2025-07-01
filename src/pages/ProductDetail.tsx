
import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProducts';
import { useProductVariants } from '@/hooks/useProductVariants';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { ProductVariants } from '@/components/product/ProductVariants';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug || '');
  const { data: variants = [] } = useProductVariants(slug || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleVariantSelect = (variant: any) => {
    navigate(`/products/${variant.slug}`);
  };

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
          <ProductImageGallery
            productName={product.name}
            images={product.images}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />

          {/* Product information */}
          <div className="space-y-6">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            {/* Product Variants */}
            {variants.length > 0 && (
              <ProductVariants
                currentProduct={product}
                variants={variants}
                onVariantSelect={handleVariantSelect}
              />
            )}

            {/* Actions */}
            <ProductActions
              product={product}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Technical specifications */}
        <ProductSpecifications specifications={product.specifications} />
      </div>
    </div>
  );
};

export default ProductDetail;
