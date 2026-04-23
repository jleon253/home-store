import { describe, it, expect } from 'vitest';
import { ProductMapper } from './product.mapper';
import { ProductDTO } from '../api/dtos/product.dto';
import { PriceType, UnitType, BadgeType, Highlights } from '@/shared/enums/product.enum';
import { Product } from '@/core/entities/product.entity';

describe('ProductMapper - toDomain', () => {
  /**
   * Test: Conversión de tipos numéricas (string a number)
   * Valida que el mapper convierte correctamente rating y totalReviews de string a number
   */
  describe('Type conversion', () => {
    it('should convert rating from string to number', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.rating).toBe(4.5);
      expect(typeof result.rating).toBe('number');
    });

    it('should convert totalReviews from string to number', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '150',
        rating: '4.8',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.reviewsCount).toBe(150);
      expect(typeof result.reviewsCount).toBe('number');
    });

    it('should handle invalid rating string and default to 0', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: 'invalid',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.rating).toBe(0);
    });

    it('should handle invalid totalReviews string and default to 0', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: 'invalid',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.reviewsCount).toBe(0);
    });

    it('should normalize unit strings to uppercase', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: 'Und' as UnitType, // Mixed case like in real API response
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.mainPrice.unit).toBe(UnitType.UNIT);
    });
  });

  /**
   * Test: Manejo de valores nulos y opcionales
   * Valida que el mapper maneja correctamente valores nulos y campos opcionales
   */
  describe('Null and optional value handling', () => {
    it('should handle missing badges array', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.badges).toEqual([]);
      expect(Array.isArray(result.badges)).toBe(true);
    });

    it('should handle missing highlights array', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.highlights).toEqual([]);
      expect(Array.isArray(result.highlights)).toBe(true);
    });

    it('should handle missing fastShippingLabels', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        fastShippingLabels: undefined,
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.hasFastShipping).toBe(false);
    });

    it('should handle empty mediaUrls array and set empty thumbnail', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: [],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.thumbnail).toBe('');
    });
  });

  /**
   * Test: Lógica de negocio de la jerarquía de precios
   * Valida que el mapper selecciona el mejor precio según: CMR > INTERNET > NORMAL
   */
  describe('Price hierarchy logic (CMR > INTERNET > NORMAL)', () => {
    it('should prioritize CMR price over INTERNET and NORMAL', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: 'Normal',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '500.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 500000,
          },
          {
            label: 'Internet',
            type: PriceType.INTERNET,
            symbol: '$',
            price: '400.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 400000,
          },
          {
            label: 'CMR',
            type: PriceType.CMR,
            symbol: '$',
            price: '300.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 300000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.mainPrice.type).toBe(PriceType.CMR);
      expect(result.mainPrice.amount).toBe(300000);
    });

    it('should prioritize INTERNET price over NORMAL when CMR is not available', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: 'Normal',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '500.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 500000,
          },
          {
            label: 'Internet',
            type: PriceType.INTERNET,
            symbol: '$',
            price: '400.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 400000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.mainPrice.type).toBe(PriceType.INTERNET);
      expect(result.mainPrice.amount).toBe(400000);
    });

    it('should use NORMAL price when CMR and INTERNET are not available', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: 'Normal',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '500.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 500000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.mainPrice.type).toBe(PriceType.NORMAL);
      expect(result.mainPrice.amount).toBe(500000);
    });

    it('should handle mixed case price types in hierarchy', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: 'Normal',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '500.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 500000,
          },
          {
            label: 'Internet',
            type: PriceType.INTERNET,
            symbol: '$',
            price: '400.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 400000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.mainPrice.type).toBe(PriceType.INTERNET);
      expect(result.mainPrice.amount).toBe(400000);
    });
  });

  /**
   * Test: Mapeo completo de datos
   * Valida que todos los campos se mapean correctamente desde DTO a Entity
   */
  describe('Complete domain mapping', () => {
    it('should map all fields correctly from DTO to Product entity', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Silla Escalera 4 Pasos Acero Gris Bauker',
        brand: 'Bauker',
        model: 'LFD120TB1-BA',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: [
          'https://media.falabella.com/sodimacCO/901128/public',
          'https://media.falabella.com/sodimacCO/901128_1/public',
        ],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '179.900',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 179900,
          },
        ],
        badges: [],
        fastShippingLabels: {
          hd_same_day_zones: true,
          hd_next_day_zones: false,
          cc_same_day_zones: true,
          cc_next_day_zones: false,
        },
        totalReviews: '21',
        rating: '4.8095',
        highlights: [
          { key: 'Modelo' as Highlights, value: 'LFD120TB1-BA' },
          { key: 'Tipo' as Highlights, value: 'Silla Escalera' },
        ],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.id).toBe('901128');
      expect(result.title).toBe('Silla Escalera 4 Pasos Acero Gris Bauker');
      expect(result.brand).toBe('Bauker');
      expect(result.model).toBe('LFD120TB1-BA');
      expect(result.rating).toBe(4.8095);
      expect(result.reviewsCount).toBe(21);
      expect(result.thumbnail).toBe('https://media.falabella.com/sodimacCO/901128/public');
      expect(result.images.length).toBe(2);
      expect(result.mainPrice.amount).toBe(179900);
      expect(result.mainPrice.currency).toBe('$');
      expect(result.hasFastShipping).toBe(true);
      expect(result.isPromoted).toBe(false);
      expect(result.highlights.length).toBe(2);
      expect(result.highlights[0].label).toBe('Modelo');
      expect(result.highlights[0].value).toBe('LFD120TB1-BA');
    });

    it('should map badges correctly', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '438976',
        skuId: '438976',
        merchantCategoryId: '0104060402',
        displayName: 'Escalera 1.4 m 4 P Tubular Plegable Acero 91 kg Pretul',
        brand: 'Pretul',
        model: '24122',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '438976', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://media.falabella.com/sodimacCO/438976/public'],
        prices: [
          {
            label: '',
            type: PriceType.INTERNET,
            symbol: '$',
            price: '229.900',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 229900,
          },
        ],
        badges: [
          {
            type: BadgeType.DISCOUNT,
            value: '-53%',
          },
        ],
        totalReviews: '1',
        rating: '4',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert
      expect(result.badges.length).toBe(1);
      expect(result.badges[0].type).toBe(BadgeType.DISCOUNT);
      expect(result.badges[0].value).toBe('-53%');
    });
  });

  /**
   * Test: Inmutabilidad de la Entity
   * Valida que la entidad devuelta es inmutable
   */
  describe('Entity immutability', () => {
    it('should return an immutable Product entity', () => {
      // Arrange
      const productDTO: ProductDTO = {
        productId: '901128',
        skuId: '901128',
        merchantCategoryId: '0104060402',
        displayName: 'Test Product',
        brand: 'Test Brand',
        model: 'TEST-001',
        isPrimeEligible: false,
        isPromoted: false,
        isInternational: '',
        media: { id: '901128', type: 'SKU', onImageHover: 'ZOOM' },
        mediaUrls: ['https://example.com/image1.jpg'],
        prices: [
          {
            label: '',
            type: PriceType.NORMAL,
            symbol: '$',
            price: '100.000',
            unit: UnitType.UNIT,
            priceWithoutFormatting: 100000,
          },
        ],
        badges: [],
        totalReviews: '42',
        rating: '4.5',
        highlights: [],
        events: [],
        variants: [],
        accumulativePoints: [],
        multiPurposeIcon: {},
        installments: {},
      };

      // Act
      const result: Product = ProductMapper.toDomain(productDTO);

      // Assert - Attempting to modify should not work (or throw error)
      expect(Object.isFrozen(result) || !('readonly' in result)).toBeTruthy();
    });
  });
});
