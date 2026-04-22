import { describe, it, expect } from 'vitest';
import { ProductSortService } from '@/core/services/product-sort.service';
import { Product } from '@/core/entities/product.entity';
import { PriceType, UnitType, SortOrder } from '@/shared/enums/product.enum';

describe('ProductSortService', () => {
  // Helper to create mock products with customizable properties
  interface MockProductOverrides {
    id?: string;
    title?: string;
    brand?: string;
    model?: string;
    rating?: number;
    reviewsCount?: number;
    thumbnail?: string;
    images?: string[];
    mainPrice?: Product['mainPrice'];
    listPrice?: Product['listPrice'];
    badges?: Product['badges'];
    highlights?: Product['highlights'];
    hasFastShipping?: boolean;
    isPromoted?: boolean;
  }

  const createMockProduct = (overrides?: MockProductOverrides): Product => ({
    id: overrides?.id ?? '123',
    title: overrides?.title ?? 'Test Product',
    brand: overrides?.brand ?? 'Test Brand',
    model: overrides?.model ?? 'TEST-001',
    rating: overrides?.rating ?? 4.5,
    reviewsCount: overrides?.reviewsCount ?? 42,
    thumbnail: overrides?.thumbnail ?? 'https://example.com/thumb.jpg',
    images: overrides?.images ?? ['https://example.com/img1.jpg'],
    mainPrice: overrides?.mainPrice ?? {
      amount: 100000,
      currency: '$',
      type: PriceType.NORMAL,
      unit: UnitType.UNIT,
    },
    listPrice: overrides?.listPrice,
    badges: overrides?.badges ?? [],
    highlights: overrides?.highlights ?? [],
    hasFastShipping: overrides?.hasFastShipping ?? true,
    isPromoted: overrides?.isPromoted ?? false,
  });

  /**
   * Test: Sort by name ascending
   * Valida que los productos se ordenan alfabéticamente por título
   */
  describe('SortOrder.NAME_ASC', () => {
    it('should sort products alphabetically by title', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Zebra Product' }),
        createMockProduct({ id: '2', title: 'Apple Product' }),
        createMockProduct({ id: '3', title: 'Mango Product' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted[0].title).toBe('Apple Product');
      expect(sorted[1].title).toBe('Mango Product');
      expect(sorted[2].title).toBe('Zebra Product');
    });

    it('should handle titles with case variations', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'zebra' }),
        createMockProduct({ id: '2', title: 'Apple' }),
        createMockProduct({ id: '3', title: 'MANGO' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted.length).toBe(3);
      // localeCompare is case-insensitive by default in many locales
      expect(sorted[0].title).toBe('Apple');
    });

    it('should preserve product data integrity when sorting by name', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          title: 'Zebra',
          brand: 'BrandZ',
          mainPrice: { amount: 500000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          title: 'Apple',
          brand: 'BrandA',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted[0].id).toBe('2');
      expect(sorted[0].brand).toBe('BrandA');
      expect(sorted[0].mainPrice.amount).toBe(100000);
      expect(sorted[1].id).toBe('1');
      expect(sorted[1].brand).toBe('BrandZ');
      expect(sorted[1].mainPrice.amount).toBe(500000);
    });
  });

  /**
   * Test: Sort by brand ascending
   * Valida que los productos se ordenan alfabéticamente por marca
   */
  describe('SortOrder.BRAND_ASC', () => {
    it('should sort products alphabetically by brand', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', brand: 'ZebraCorp', title: 'Product A' }),
        createMockProduct({ id: '2', brand: 'AppleBrand', title: 'Product B' }),
        createMockProduct({ id: '3', brand: 'MangoInc', title: 'Product C' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.BRAND_ASC);

      // Assert
      expect(sorted[0].brand).toBe('AppleBrand');
      expect(sorted[1].brand).toBe('MangoInc');
      expect(sorted[2].brand).toBe('ZebraCorp');
    });

    it('should maintain products with same brand in stable order', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', brand: 'SameBrand', title: 'Product C' }),
        createMockProduct({ id: '2', brand: 'SameBrand', title: 'Product A' }),
        createMockProduct({ id: '3', brand: 'SameBrand', title: 'Product B' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.BRAND_ASC);

      // Assert
      expect(sorted.length).toBe(3);
      expect(sorted.every((p) => p.brand === 'SameBrand')).toBe(true);
    });
  });

  /**
   * Test: Sort by price ascending
   * Valida que los productos se ordenan por precio de menor a mayor
   */
  describe('SortOrder.PRICE_ASC', () => {
    it('should sort products by price from lowest to highest', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          title: 'Expensive',
          mainPrice: { amount: 500000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          title: 'Cheap',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '3',
          title: 'Medium',
          mainPrice: { amount: 300000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.PRICE_ASC);

      // Assert
      expect(sorted[0].mainPrice.amount).toBe(100000);
      expect(sorted[1].mainPrice.amount).toBe(300000);
      expect(sorted[2].mainPrice.amount).toBe(500000);
    });

    it('should handle products with same price', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          title: 'Product A',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          title: 'Product B',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.PRICE_ASC);

      // Assert
      expect(sorted.length).toBe(2);
      expect(sorted[0].mainPrice.amount).toBe(100000);
      expect(sorted[1].mainPrice.amount).toBe(100000);
    });

    it('should handle large price differences', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          mainPrice: { amount: 1, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          mainPrice: { amount: 999999999, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.PRICE_ASC);

      // Assert
      expect(sorted[0].mainPrice.amount).toBe(1);
      expect(sorted[1].mainPrice.amount).toBe(999999999);
    });
  });

  /**
   * Test: Sort by price descending
   * Valida que los productos se ordenan por precio de mayor a menor
   */
  describe('SortOrder.PRICE_DESC', () => {
    it('should sort products by price from highest to lowest', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          mainPrice: { amount: 500000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '3',
          mainPrice: { amount: 300000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.PRICE_DESC);

      // Assert
      expect(sorted[0].mainPrice.amount).toBe(500000);
      expect(sorted[1].mainPrice.amount).toBe(300000);
      expect(sorted[2].mainPrice.amount).toBe(100000);
    });

    it('should handle zero and negative considerations (if applicable)', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          mainPrice: { amount: 0, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.PRICE_DESC);

      // Assert
      expect(sorted[0].mainPrice.amount).toBe(100000);
      expect(sorted[1].mainPrice.amount).toBe(0);
    });
  });

  /**
   * Test: Immutability
   * Valida que la función no modifica el array original
   */
  describe('Immutability', () => {
    it('should not mutate the original array', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Zebra' }),
        createMockProduct({ id: '2', title: 'Apple' }),
      ];

      const originalOrder = products.map((p) => p.id);

      // Act
      ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert - Original array should remain unchanged
      expect(products.map((p) => p.id)).toEqual(originalOrder);
      expect(products[0].title).toBe('Zebra');
      expect(products[1].title).toBe('Apple');
    });

    it('should return a new array instance', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Product A' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted).not.toBe(products);
      expect(sorted).toEqual(products);
    });

    it('should preserve product object references within the new array', () => {
      // Arrange
      const product1 = createMockProduct({ id: '1', title: 'Zebra' });
      const product2 = createMockProduct({ id: '2', title: 'Apple' });
      const products: Product[] = [product1, product2];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert - Should contain same product references, just reordered
      expect(sorted[0]).toBe(product2);
      expect(sorted[1]).toBe(product1);
    });
  });

  /**
   * Test: Edge cases
   * Valida casos extremos
   */
  describe('Edge cases', () => {
    it('should handle empty array', () => {
      // Arrange
      const products: Product[] = [];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted).toEqual([]);
      expect(sorted.length).toBe(0);
    });

    it('should handle array with single product', () => {
      // Arrange
      const products: Product[] = [createMockProduct({ id: '1', title: 'Only Product' })];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted.length).toBe(1);
      expect(sorted[0].id).toBe('1');
      expect(sorted[0].title).toBe('Only Product');
    });

    it('should handle already sorted array', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Apple' }),
        createMockProduct({ id: '2', title: 'Mango' }),
        createMockProduct({ id: '3', title: 'Zebra' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted[0].title).toBe('Apple');
      expect(sorted[1].title).toBe('Mango');
      expect(sorted[2].title).toBe('Zebra');
    });

    it('should handle reverse sorted array', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Zebra' }),
        createMockProduct({ id: '2', title: 'Mango' }),
        createMockProduct({ id: '3', title: 'Apple' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted[0].title).toBe('Apple');
      expect(sorted[1].title).toBe('Mango');
      expect(sorted[2].title).toBe('Zebra');
    });

    it('should handle default case with unknown sort order', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '2', title: 'Product B' }),
        createMockProduct({ id: '1', title: 'Product A' }),
      ];

      // Act - Using type assertion to pass an invalid order for testing
      const sorted = ProductSortService.sort(products, 'invalid_order' as SortOrder);

      // Assert - Should return in original order
      expect(sorted[0].id).toBe('2');
      expect(sorted[1].id).toBe('1');
    });
  });

  /**
   * Test: Multiple products with varied attributes
   * Valida que la función maneja correctamente colecciones complejas
   */
  describe('Complex product collections', () => {
    it('should sort large collection correctly by name', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Product Z' }),
        createMockProduct({ id: '2', title: 'Product A' }),
        createMockProduct({ id: '3', title: 'Product M' }),
        createMockProduct({ id: '4', title: 'Product B' }),
        createMockProduct({ id: '5', title: 'Product X' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      const titles = sorted.map((p) => p.title);
      expect(titles).toEqual(['Product A', 'Product B', 'Product M', 'Product X', 'Product Z']);
    });

    it('should sort collection with duplicate titles', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', title: 'Product' }),
        createMockProduct({ id: '2', title: 'Product' }),
        createMockProduct({ id: '3', title: 'Product' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.NAME_ASC);

      // Assert
      expect(sorted.length).toBe(3);
      expect(sorted.every((p) => p.title === 'Product')).toBe(true);
    });

    it('should sort collection with mixed attributes and special characters', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({ id: '1', brand: 'Zebra Corp', title: 'Product (1)' }),
        createMockProduct({ id: '2', brand: 'Apple Inc', title: 'Product @ 2' }),
        createMockProduct({ id: '3', brand: 'Mango Ltd', title: 'Product #3' }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.BRAND_ASC);

      // Assert
      expect(sorted.length).toBe(3);
      expect(sorted[0].brand).toBe('Apple Inc');
      expect(sorted[1].brand).toBe('Mango Ltd');
      expect(sorted[2].brand).toBe('Zebra Corp');
    });

    it('should handle products with different price types but sort by mainPrice only', () => {
      // Arrange
      const products: Product[] = [
        createMockProduct({
          id: '1',
          mainPrice: { amount: 300000, currency: '$', type: PriceType.CMR, unit: UnitType.UNIT },
          listPrice: { amount: 400000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
        createMockProduct({
          id: '2',
          mainPrice: { amount: 100000, currency: '$', type: PriceType.INTERNET, unit: UnitType.UNIT },
          listPrice: { amount: 500000, currency: '$', type: PriceType.NORMAL, unit: UnitType.UNIT },
        }),
      ];

      // Act
      const sorted = ProductSortService.sort(products, SortOrder.PRICE_ASC);

      // Assert - Should sort by mainPrice only
      expect(sorted[0].mainPrice.amount).toBe(100000);
      expect(sorted[1].mainPrice.amount).toBe(300000);
    });
  });
});
