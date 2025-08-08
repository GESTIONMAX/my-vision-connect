
import { Badge } from '@/components/ui/badge';

interface PricingDisplayProps {
  price: number;
  originalPrice?: number;
  quantity: number;
  isBusinessUser: boolean;
  businessDiscount?: number;
}

export const PricingDisplay = ({ 
  price, 
  originalPrice, 
  quantity, 
  isBusinessUser,
  businessDiscount = 0
}: PricingDisplayProps) => {
  const unitPrice = price;
  const totalPrice = price * quantity;
  const discountedTotal = totalPrice * (1 - businessDiscount);

  return (
    <div className="text-right">
      {/* Prix unitaire */}
      <div className="text-sm text-muted-foreground mb-1">
        {unitPrice.toFixed(2)}€ {isBusinessUser ? 'HT' : 'TTC'} / unité
      </div>
      
      {/* Prix total avant remise */}
      <div className="font-semibold">
        {businessDiscount > 0 ? (
          <span className="line-through text-muted-foreground mr-2">
            {totalPrice.toFixed(2)}€
          </span>
        ) : null}
        
        <span className={isBusinessUser ? 'text-blue-600' : 'text-primary'}>
          {(businessDiscount > 0 ? discountedTotal : totalPrice).toFixed(2)}€
          {isBusinessUser ? ' HT' : ' TTC'}
        </span>
      </div>

      {/* Badge remise professionnelle */}
      {businessDiscount > 0 && (
        <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
          -{(businessDiscount * 100).toFixed(0)}% Pro
        </Badge>
      )}

      {/* Prix d'origine si promotion */}
      {originalPrice && originalPrice > price && (
        <div className="text-xs text-muted-foreground mt-1">
          Prix public: {originalPrice.toFixed(2)}€
        </div>
      )}
    </div>
  );
};
