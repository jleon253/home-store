"use client";

import { useEffect, useRef } from 'react';
import { useProductStore } from '@/presentation/store/useProductStore';
import { Category, Product } from '@/core/entities';

interface HydrateStoreProps {
  category: Category;
  products: Product[];
}

export const HydrateStore: React.FC<HydrateStoreProps> = ({ category, products }) => {
  const setCatalog = useProductStore((state) => state.setCatalog);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setCatalog(category, products);
      initialized.current = true;
    }
  }, [category, products, setCatalog]);

  return null; // Este componente no renderiza UI
};