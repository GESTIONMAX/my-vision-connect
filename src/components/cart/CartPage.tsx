
import { useAuthNew } from '@/hooks/useAuthNew';
import { useCart } from '@/hooks/useCart';
import { CartHeader } from './CartHeader';
import { CartItems } from './CartItems';
import { CartSummary } from './CartSummary';
import { CartActions } from './CartActions';
import { EmptyCart } from './EmptyCart';

export const CartPage = () => {
  const { profile } = useAuthNew();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    subtotal, 
    discountAmount, 
    businessDiscount, 
    total, 
    itemCount,
    isBusinessUser 
  } = useCart();

  const handleCheckout = () => {
    console.log('Checkout process initiated');
    // Logique de checkout à implémenter
  };

  return (
    <div className="space-y-6">
      <CartHeader 
        itemCount={itemCount}
        isBusinessUser={isBusinessUser}
        companyName={profile?.company_name || undefined}
      />

      {itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <CartItems
              items={items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              isBusinessUser={isBusinessUser}
              businessDiscount={businessDiscount}
            />
          </div>

          {/* Résumé et actions */}
          <div className="space-y-6">
            <CartSummary
              subtotal={subtotal}
              discountAmount={discountAmount}
              businessDiscount={businessDiscount}
              total={total}
              isBusinessUser={isBusinessUser}
              itemCount={itemCount}
            />
            
            <CartActions
              onClearCart={clearCart}
              onCheckout={handleCheckout}
              isBusinessUser={isBusinessUser}
              itemCount={itemCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};
