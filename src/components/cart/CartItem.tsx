
import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PricingDisplay } from './PricingDisplay';
import { CartItem as CartItemType } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isBusinessUser: boolean;
  businessDiscount: number;
}

export const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  isBusinessUser,
  businessDiscount 
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, Math.min(isBusinessUser ? 999 : 10, newQuantity));
    setQuantity(validQuantity);
    onUpdateQuantity(item.id, validQuantity);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image produit */}
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-2xl">👓</div>
            )}
          </div>

          {/* Détails produit */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">Réf: {item.reference}</p>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>

          {/* Contrôles quantité */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center h-8"
                min="1"
                max={isBusinessUser ? "999" : "10"}
              />
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (isBusinessUser ? 999 : 10)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemove(item.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Prix */}
          <div className="text-right min-w-[120px]">
            <PricingDisplay
              price={item.price}
              originalPrice={item.originalPrice}
              quantity={quantity}
              isBusinessUser={isBusinessUser}
              businessDiscount={businessDiscount}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
