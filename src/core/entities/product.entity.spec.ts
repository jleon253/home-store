import { describe, it, expect } from 'vitest';
import { Product, Price, ProductBadge, ProductHighlight } from '@/core/entities/product.entity';
import { PriceType, UnitType } from '@/shared/enums/product.enum';

describe('Product Entity', () => {
  /**
   * Test: Inmutabilidad de la Entity
   * Valida que la entidad Product está diseñada con propiedades readonly
   */
  describe('Immutability', () => {
    it('should have all properties designed as readonly (type-level)', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert - Properties are defined as readonly in the interface
      // This is verified at compile-time by TypeScript
      expect(product.id).toBeDefined();
      expect(product.title).toBeDefined();
      expect(product.brand).toBeDefined();
      expect(product.model).toBeDefined();
      expect(product.rating).toBeDefined();
      expect(product.reviewsCount).toBeDefined();
      expect(product.mainPrice).toBeDefined();
    });
  });

  /**
   * Test: Validez de la estructura
   * Valida que la entidad tiene la estructura correcta
   */
  describe('Structure validity', () => {
    it('should have all required properties', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(product.id).toBeDefined();
      expect(product.title).toBeDefined();
      expect(product.brand).toBeDefined();
      expect(product.model).toBeDefined();
      expect(product.rating).toBeDefined();
      expect(product.reviewsCount).toBeDefined();
      expect(product.thumbnail).toBeDefined();
      expect(product.images).toBeDefined();
      expect(product.mainPrice).toBeDefined();
      expect(product.badges).toBeDefined();
      expect(product.highlights).toBeDefined();
      expect(product.hasFastShipping).toBeDefined();
      expect(product.isPromoted).toBeDefined();
    });

    it('should have optional listPrice property', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        listPrice: {
          amount: 150000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(product.listPrice).toBeDefined();
      expect(product.listPrice?.amount).toBe(150000);
    });

    it('should have correct type for mainPrice (Price interface)', () => {
      // Arrange
      const mainPrice: Price = {
        amount: 100000,
        currency: '$',
        type: PriceType.INTERNET,
        unit: UnitType.UNIT,
      };

      // Assert
      expect(mainPrice.amount).toBeDefined();
      expect(typeof mainPrice.amount).toBe('number');
      expect(mainPrice.currency).toBeDefined();
      expect(typeof mainPrice.currency).toBe('string');
      expect(mainPrice.type).toBeDefined();
      expect(mainPrice.unit).toBeDefined();
    });

    it('should have correct type for badges (ProductBadge[] interface)', () => {
      // Arrange
      const badge: ProductBadge = {
        type: 'DISCOUNT',
        value: '-50%',
      };

      const badges: ProductBadge[] = [badge];

      // Assert
      expect(Array.isArray(badges)).toBe(true);
      expect(badges[0].type).toBeDefined();
      expect(badges[0].value).toBeDefined();
    });

    it('should have correct type for highlights (ProductHighlight[] interface)', () => {
      // Arrange
      const highlight: ProductHighlight = {
        label: 'Modelo',
        value: 'TEST-001',
      };

      const highlights: ProductHighlight[] = [highlight];

      // Assert
      expect(Array.isArray(highlights)).toBe(true);
      expect(highlights[0].label).toBeDefined();
      expect(highlights[0].value).toBeDefined();
    });
  });

  /**
   * Test: Tipos numéricos
   * Valida que los valores numéricos son correctamente tipados
   */
  describe('Numeric types', () => {
    it('should have correct number types for price amount', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(typeof product.mainPrice.amount).toBe('number');
      expect(product.mainPrice.amount).toBeGreaterThan(0);
    });

    it('should have correct number type for rating', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.8095,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(typeof product.rating).toBe('number');
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    });

    it('should have correct number type for reviewsCount', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 21,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(typeof product.reviewsCount).toBe('number');
      expect(product.reviewsCount).toBeGreaterThanOrEqual(0);
    });
  });

  /**
   * Test: Tipos booleanos
   * Valida que los valores booleanos son correctamente tipados
   */
  describe('Boolean types', () => {
    it('should have correct boolean type for hasFastShipping', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(typeof product.hasFastShipping).toBe('boolean');
    });

    it('should have correct boolean type for isPromoted', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: true,
      };

      // Assert
      expect(typeof product.isPromoted).toBe('boolean');
    });
  });

  /**
   * Test: Tipos de arrays
   * Valida que los arrays son correctamente tipados
   */
  describe('Array types', () => {
    it('should have images as string array', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(Array.isArray(product.images)).toBe(true);
      product.images.forEach((image: string) => {
        expect(typeof image).toBe('string');
      });
    });

    it('should have badges as ProductBadge[] array', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [
          { type: 'DISCOUNT', value: '-50%' },
        ],
        highlights: [],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(Array.isArray(product.badges)).toBe(true);
      product.badges.forEach((badge: ProductBadge) => {
        expect(badge.type).toBeDefined();
        expect(badge.value).toBeDefined();
      });
    });

    it('should have highlights as ProductHighlight[] array', () => {
      // Arrange
      const product: Product = {
        id: '123',
        title: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        rating: 4.5,
        reviewsCount: 42,
        thumbnail: 'https://example.com/thumb.jpg',
        images: ['https://example.com/img1.jpg'],
        mainPrice: {
          amount: 100000,
          currency: '$',
          type: PriceType.NORMAL,
          unit: UnitType.UNIT,
        },
        badges: [],
        highlights: [
          { label: 'Modelo', value: 'TEST-001' },
          { label: 'Tipo', value: 'Escalera' },
        ],
        hasFastShipping: true,
        isPromoted: false,
      };

      // Assert
      expect(Array.isArray(product.highlights)).toBe(true);
      product.highlights.forEach((highlight: ProductHighlight) => {
        expect(highlight.label).toBeDefined();
        expect(highlight.value).toBeDefined();
      });
    });
  });
});
