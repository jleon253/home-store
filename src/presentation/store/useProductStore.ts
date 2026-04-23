import { create } from 'zustand';
import { Category, Product } from '@/core/entities';
import { ViewMode } from '@/shared/enums/category.enum';

interface ProductState {
  category: Category | null;
  products: Product[];
  // Acción para actualizar el estado desde la hidratación
  setCatalog: (category: Category, products: Product[]) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  category: null,
  products: [],
  setCatalog: (category, products) => set({ category, products }),
  viewMode: ViewMode.GRID,
  setViewMode: (viewMode) => set({ viewMode }),
}));