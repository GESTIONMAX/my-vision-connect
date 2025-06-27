
import { useState, useCallback, useMemo, useEffect } from 'react';
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

const CART_STORAGE_KEY = 'euroglobal-cart';

// Variable globale pour éviter les réinitialisations multiples
let isInitialized = false;
let globalCartItems: CartItem[] = [];

export const useCart = () => {
  const { profile } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  // Initialiser le panier une seule fois
  useEffect(() => {
    if (!isInitialized) {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          globalCartItems = Array.isArray(parsedCart) ? parsedCart : [];
          console.log('Panier initialisé depuis localStorage:', globalCartItems);
        } catch (error) {
          console.error('Erreur lors du chargement du panier:', error);
          globalCartItems = [];
        }
      }
      isInitialized = true;
    }
    setItems([...globalCartItems]);
  }, []);

  // Synchroniser avec le panier global quand les items changent
  useEffect(() => {
    globalCartItems = [...items];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    console.log('Panier synchronisé:', items.length, 'produits');
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    console.log('Ajout d\'un produit au panier:', item.name);
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        const updated = prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
        console.log('Produit existant mis à jour, total:', updated.length, 'produits');
        return updated;
      }
      const updated = [...prevItems, item];
      console.log('Nouveau produit ajouté, total:', updated.length, 'produits');
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    console.log('Mise à jour de la quantité:', { id, quantity });
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    console.log('Suppression d\'un produit du panier:', id);
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    console.log('Vidage du panier');
    setItems([]);
    globalCartItems = [];
    localStorage.removeItem(CART_STORAGE_KEY);
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

  console.log('État du panier - Produits:', itemCount, 'Total:', total.toFixed(2) + '€');

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
