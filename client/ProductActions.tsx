
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';

interface ProductActionsProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductActions = ({ product, onAddToCart }: ProductActionsProps) => {
  const handleAddToCart = () => {
    console.log('=== AJOUT AU PANIER ===');
    console.log('Produit:', product.name);
    console.log('ID:', product.slug);
    console.log('Prix:', product.price);
    console.log('=======================');
    onAddToCart();
  };

  return (
    <div className="flex gap-4">
      <Button 
        size="lg" 
        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        disabled={!product.inStock}
        onClick={handleAddToCart}
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
  );
};
