
import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  reference: string;
  category: string;
  originalPrice?: number;
}

export const useCart = () => {
  const { profile } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  const businessDiscount = useMemo(() => {
    if (profile?.user_type === 'business' && subtotal > 0) {
      // Remise dégressive pour les professionnels
      if (subtotal >= 1000) return 0.15; // 15% pour commandes > 1000€
      if (subtotal >= 500) return 0.10;  // 10% pour commandes > 500€
      if (subtotal >= 200) return 0.05;  // 5% pour commandes > 200€
    }
    return 0;
  }, [profile?.user_type, subtotal]);

  const discountAmount = subtotal * businessDiscount;
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
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
