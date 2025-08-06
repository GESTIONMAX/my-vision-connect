import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingCart
} from 'lucide-react';

interface EnhancedProductActionsProps {
  product: any;
  onAddToCart: () => void;
  disabled?: boolean;
}

export const EnhancedProductActions = ({ product, onAddToCart, disabled = false }: EnhancedProductActionsProps) => {
  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Quantité :</label>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-10 w-10 p-0">
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center font-medium">1</div>
          <Button variant="outline" size="sm" className="h-10 w-10 p-0">
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground ml-4">
            {product.inStock ? "En stock" : "Rupture de stock"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full h-12 text-lg font-medium"
          disabled={!product.inStock || disabled}
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Heart className="h-4 w-4 mr-2" />
            Favoris
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>
    </div>
  );
};