
import { useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCartContext, CartItem } from '@/contexts/CartContext';

export { type CartItem } from '@/contexts/CartContext';

export const useCart = () => {
  const { profile } = useAuth();
  const { state, dispatch } = useCartContext();

  const addItem = useCallback((item: CartItem) => {
    console.log('=== AJOUT AU PANIER ===');
    console.log('Produit:', item.name);
    console.log('ID:', item.id);
    console.log('Prix:', item.price);
    console.log('=======================');
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, [dispatch]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    console.log('Mise à jour quantité:', { id, quantity });
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, [dispatch]);

  const removeItem = useCallback((id: string) => {
    console.log('Suppression produit:', id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, [dispatch]);

  const clearCart = useCallback(() => {
    console.log('Vidage du panier');
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [state.items]);

  const businessDiscount = useMemo(() => {
    if (profile?.user_type === 'business' && subtotal > 0) {
      if (subtotal >= 1000) return 0.15;
      if (subtotal >= 500) return 0.10;
      if (subtotal >= 200) return 0.05;
    }
    return 0;
  }, [profile?.user_type, subtotal]);

  const discountAmount = subtotal * businessDiscount;
  const total = subtotal - discountAmount;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  console.log('État du panier - Produits:', itemCount, 'Total:', total.toFixed(2) + '€');

  return {
    items: state.items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discountAmount,
    businessDiscount,
    total,
    itemCount,
    isBusinessUser: profile?.user_type === 'business'
  };
};
