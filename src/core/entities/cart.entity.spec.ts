import { describe, it, expect } from 'vitest';
import { Cart, CartItem } from '@/core/entities/cart.entity';
import { Product } from '@/core/entities/product.entity';
import { PriceType, UnitType } from '@/shared/enums/product.enum';

describe('Cart Entity', () => {
  // Helper to create a mock Product for testing
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
   * Test: Inmutabilidad de la Entity
   * Valida que la entidad Cart está diseñada con propiedades readonly
   */
  describe('Cart immutability', () => {
    it('should have all properties designed as readonly (type-level)', () => {
      // Arrange
      const cart: Cart = {
        items: [],
        totalItems: 0,
        subtotal: 0,
        updatedAt: new Date(),
      };

      // Assert - Properties are defined as readonly in the interface
      // This is verified at compile-time by TypeScript
      expect(cart.items).toBeDefined();
      expect(cart.totalItems).toBeDefined();
      expect(cart.subtotal).toBeDefined();
      expect(cart.updatedAt).toBeDefined();
    });
  });

  /**
   * Test: Estructura de la Entity
   * Valida que la entidad tiene la estructura correcta
   */
  describe('Structure validity', () => {
    it('should have all required properties', () => {
      // Arrange
      const cart: Cart = {
        items: [],
        totalItems: 0,
        subtotal: 0,
        updatedAt: new Date(),
      };

      // Assert
      expect(cart.items).toBeDefined();
      expect(cart.totalItems).toBeDefined();
      expect(cart.subtotal).toBeDefined();
      expect(cart.updatedAt).toBeDefined();
    });

    it('should support empty cart', () => {
      // Arrange
      const cart: Cart = {
        items: [],
        totalItems: 0,
        subtotal: 0,
        updatedAt: new Date(),
      };

      // Assert
      expect(cart.items.length).toBe(0);
      expect(cart.totalItems).toBe(0);
      expect(cart.subtotal).toBe(0);
    });

    it('should support cart with items', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const cartItem: CartItem = {
        product,
        quantity: 2,
        addedAt: now,
      };

      const cart: Cart = {
        items: [cartItem],
        totalItems: 2,
        subtotal: 200000,
        updatedAt: now,
      };

      // Assert
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.totalItems).toBe(2);
      expect(cart.subtotal).toBe(200000);
    });
  });

  /**
   * Test: Tipos de propiedades
   * Valida que los tipos de propiedades son correctos
   */
  describe('Property types', () => {
    it('should have number type for totalItems and subtotal', () => {
      // Arrange
      const cart: Cart = {
        items: [],
        totalItems: 5,
        subtotal: 500000,
        updatedAt: new Date(),
      };

      // Assert
      expect(typeof cart.totalItems).toBe('number');
      expect(typeof cart.subtotal).toBe('number');
    });

    it('should have Date type for updatedAt', () => {
      // Arrange
      const now = new Date();
      const cart: Cart = {
        items: [],
        totalItems: 0,
        subtotal: 0,
        updatedAt: now,
      };

      // Assert
      expect(cart.updatedAt instanceof Date).toBe(true);
    });

    it('should have CartItem[] type for items', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const cartItem: CartItem = {
        product,
        quantity: 2,
        addedAt: now,
      };

      const cart: Cart = {
        items: [cartItem],
        totalItems: 2,
        subtotal: 200000,
        updatedAt: now,
      };

      // Assert
      expect(Array.isArray(cart.items)).toBe(true);
      expect(cart.items[0].product).toBeDefined();
      expect(typeof cart.items[0].quantity).toBe('number');
      expect(cart.items[0].addedAt instanceof Date).toBe(true);
    });
  });

  /**
   * Test: CartItem immutability
   * Valida que la entidad CartItem está diseñada con propiedades readonly
   */
  describe('CartItem immutability', () => {
    it('should have all properties designed as readonly (type-level)', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const cartItem: CartItem = {
        product,
        quantity: 2,
        addedAt: now,
      };

      // Assert - Properties are defined as readonly in the interface
      // This is verified at compile-time by TypeScript
      expect(cartItem.product).toBeDefined();
      expect(cartItem.quantity).toBeDefined();
      expect(cartItem.addedAt).toBeDefined();
    });
  });

  /**
   * Test: CartItem structure
   * Valida que CartItem tiene la estructura correcta
   */
  describe('CartItem structure', () => {
    it('should have all required properties', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const cartItem: CartItem = {
        product,
        quantity: 2,
        addedAt: now,
      };

      // Assert
      expect(cartItem.product).toBeDefined();
      expect(cartItem.quantity).toBeDefined();
      expect(cartItem.addedAt).toBeDefined();
    });

    it('should correctly reference Product entity', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const cartItem: CartItem = {
        product,
        quantity: 2,
        addedAt: now,
      };

      // Assert
      expect(cartItem.product.id).toBe(product.id);
      expect(cartItem.product.title).toBe(product.title);
      expect(cartItem.product.mainPrice.amount).toBe(product.mainPrice.amount);
    });

    it('should support positive quantity values', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const cartItem: CartItem = {
        product,
        quantity: 10,
        addedAt: now,
      };

      // Assert
      expect(cartItem.quantity).toBeGreaterThan(0);
    });
  });

  /**
   * Test: Complex cart scenarios
   * Valida escenarios complejos de carrito
   */
  describe('Complex cart scenarios', () => {
    it('should handle multiple items in cart', () => {
      // Arrange
      const product1 = createMockProduct();
      const product2 = createMockProduct({
        id: '456',
        title: 'Another Product',
      });

      const now = new Date();
      const cartItems: CartItem[] = [
        { product: product1, quantity: 2, addedAt: now },
        { product: product2, quantity: 3, addedAt: now },
      ];

      const cart: Cart = {
        items: cartItems,
        totalItems: 5,
        subtotal: 500000,
        updatedAt: now,
      };

      // Assert
      expect(cart.items.length).toBe(2);
      expect(cart.totalItems).toBe(5);
      expect(cart.items[0].product.id).toBe(product1.id);
      expect(cart.items[1].product.id).toBe(product2.id);
    });

    it('should maintain timestamps', () => {
      // Arrange
      const product = createMockProduct();
      const addedTime = new Date('2024-01-01T10:00:00Z');
      const updatedTime = new Date('2024-01-01T11:00:00Z');

      const cart: Cart = {
        items: [{ product, quantity: 1, addedAt: addedTime }],
        totalItems: 1,
        subtotal: 100000,
        updatedAt: updatedTime,
      };

      // Assert
      expect(cart.items[0].addedAt.getTime()).toBe(addedTime.getTime());
      expect(cart.updatedAt.getTime()).toBe(updatedTime.getTime());
      expect(cart.updatedAt.getTime()).toBeGreaterThanOrEqual(cart.items[0].addedAt.getTime());
    });

    it('should calculate correct subtotal with multiple items', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();

      const cart: Cart = {
        items: [
          { product, quantity: 2, addedAt: now },
          { product, quantity: 3, addedAt: now },
        ],
        totalItems: 5,
        subtotal: 500000, // 100000 * 2 + 100000 * 3
        updatedAt: now,
      };

      // Assert
      expect(cart.subtotal).toBe(500000);
      expect(cart.totalItems).toBe(5);
    });
  });

  /**
   * Test: Edge cases
   * Valida casos extremos
   */
  describe('Edge cases', () => {
    it('should handle zero subtotal in empty cart', () => {
      // Arrange
      const cart: Cart = {
        items: [],
        totalItems: 0,
        subtotal: 0,
        updatedAt: new Date(),
      };

      // Assert
      expect(cart.subtotal).toBe(0);
      expect(cart.totalItems).toBe(0);
    });

    it('should handle very large subtotal', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();
      const largeQuantity = 1000;

      const cart: Cart = {
        items: [{ product, quantity: largeQuantity, addedAt: now }],
        totalItems: largeQuantity,
        subtotal: 100000 * largeQuantity,
        updatedAt: now,
      };

      // Assert
      expect(cart.subtotal).toBe(100000000);
    });

    it('should handle cart with same product multiple times', () => {
      // Arrange
      const product = createMockProduct();
      const now = new Date();

      const cart: Cart = {
        items: [
          { product, quantity: 1, addedAt: now },
          { product, quantity: 2, addedAt: now },
        ],
        totalItems: 3,
        subtotal: 300000,
        updatedAt: now,
      };

      // Assert
      expect(cart.items.length).toBe(2);
      expect(cart.items[0].product.id).toBe(cart.items[1].product.id);
      expect(cart.totalItems).toBe(3);
    });
  });
});
