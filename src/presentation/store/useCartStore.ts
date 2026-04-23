import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { del, get, set } from 'idb-keyval';
import { Product } from '@/core/entities';

// Adaptador para IndexedDB
const storage = {
  getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
  setItem: async (name: string, value: string): Promise<void> => { await set(name, value); },
  removeItem: async (name: string): Promise<void> => { await del(name); },
};

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      updateQuantity: (productId, delta) => set((state) => ({
        items: state.items.map((item) =>
          item.id === productId 
            ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
            : item
        ),
      })),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);