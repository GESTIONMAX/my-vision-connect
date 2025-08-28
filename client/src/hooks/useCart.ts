import { create } from 'zustand';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartStore = {
  items: CartItem[];
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>((set) => ({
  items: [],
  itemCount: 0,
  
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          itemCount: state.itemCount + 1,
        };
      }
      
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        itemCount: state.itemCount + 1,
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      itemCount: Math.max(0, state.itemCount - 1),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        items: newItems,
        itemCount: newItems.reduce((total, item) => total + item.quantity, 0),
      };
    }),

  clearCart: () => set({ items: [], itemCount: 0 }),
}));
