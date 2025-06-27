
import { CartItem } from './CartItem';
import { CartItem as CartItemType } from '@/hooks/useCart';

interface CartItemsProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  isBusinessUser: boolean;
  businessDiscount: number;
}

export const CartItems = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  isBusinessUser,
  businessDiscount 
}: CartItemsProps) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveItem}
          isBusinessUser={isBusinessUser}
          businessDiscount={businessDiscount}
        />
      ))}
    </div>
  );
};
