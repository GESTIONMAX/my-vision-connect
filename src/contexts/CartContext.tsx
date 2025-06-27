
import React, { createContext, useContext, useReducer, useEffect } from 'react';
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

interface CartState {
  items: CartItem[];
  isLoaded: boolean;
}

type CartAction = 
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const CART_STORAGE_KEY = 'euroglobal-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      console.log('Chargement du panier:', action.payload.length, 'produits');
      return {
        ...state,
        items: action.payload,
        isLoaded: true
      };

    case 'ADD_ITEM':
      console.log('Ajout produit au panier:', action.payload.name);
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        console.log('Produit existant mis à jour, total:', updatedItems.length, 'produits');
        return { ...state, items: updatedItems };
      }
      
      const newItems = [...state.items, action.payload];
      console.log('Nouveau produit ajouté, total:', newItems.length, 'produits');
      return { ...state, items: newItems };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter(item => item.id !== action.payload.id);
        console.log('Produit supprimé, total:', filteredItems.length, 'produits');
        return { ...state, items: filteredItems };
      }
      
      const quantityUpdatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      console.log('Quantité mise à jour pour:', action.payload.id);
      return { ...state, items: quantityUpdatedItems };

    case 'REMOVE_ITEM':
      const removedItems = state.items.filter(item => item.id !== action.payload);
      console.log('Produit supprimé:', action.payload, 'Restants:', removedItems.length);
      return { ...state, items: removedItems };

    case 'CLEAR_CART':
      console.log('Panier vidé');
      return { ...state, items: [] };

    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoaded: false
  });

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const cartItems = Array.isArray(parsedCart) ? parsedCart : [];
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        dispatch({ type: 'LOAD_CART', payload: [] });
      }
    } else {
      dispatch({ type: 'LOAD_CART', payload: [] });
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      console.log('Panier sauvegardé:', state.items.length, 'produits');
    }
  }, [state.items, state.isLoaded]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
