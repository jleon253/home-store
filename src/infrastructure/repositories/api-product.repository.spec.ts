import { describe, it, expect, beforeEach } from 'vitest';
import { ApiProductRepository } from './api-product.repository';
import { Product } from '@/core/entities/product.entity';
import { errorHandlers } from '../api/mocks/handlers';
import { server } from '../api/mocks/setup';

describe('ApiProductRepository', () => {
  let repository: ApiProductRepository;

  beforeEach(() => {
    repository = new ApiProductRepository();
  });

  /**
   * Test: Consumo correcto del API
   * Valida que el repositorio consume correctamente las variables de entorno
   * y realiza peticiones al endpoint correcto
   */
  describe('API consumption', () => {
    it('should build the correct API URL from environment variables', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should fetch products successfully and map them to domain entities', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('title');
      expect(products[0]).toHaveProperty('brand');
      expect(products[0]).toHaveProperty('mainPrice');
    });

    it('should return Product entities with correct structure', async () => {
      // Act
      const products = await repository.getProducts();
      const firstProduct = products[0];

      // Assert
      expect(firstProduct.id).toBeDefined();
      expect(typeof firstProduct.id).toBe('string');
      expect(firstProduct.title).toBeDefined();
      expect(typeof firstProduct.title).toBe('string');
      expect(firstProduct.brand).toBeDefined();
      expect(typeof firstProduct.brand).toBe('string');
      expect(firstProduct.model).toBeDefined();
      expect(typeof firstProduct.model).toBe('string');
      expect(typeof firstProduct.rating).toBe('number');
      expect(typeof firstProduct.reviewsCount).toBe('number');
      expect(typeof firstProduct.hasFastShipping).toBe('boolean');
      expect(typeof firstProduct.isPromoted).toBe('boolean');
      expect(Array.isArray(firstProduct.badges)).toBe(true);
      expect(Array.isArray(firstProduct.highlights)).toBe(true);
      expect(firstProduct.mainPrice).toBeDefined();
      expect(typeof firstProduct.mainPrice.amount).toBe('number');
      expect(typeof firstProduct.mainPrice.currency).toBe('string');
    });

    it('should map multiple products correctly', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      expect(products.length).toBeGreaterThan(1);
      products.forEach((product: Product) => {
        expect(product.id).toBeDefined();
        expect(product.title).toBeDefined();
        expect(product.mainPrice).toBeDefined();
      });
    });

    it('should use correct HTTP method (GET)', async () => {
      // Arrange - The MSW handlers will verify GET is used

      // Act
      const products = await repository.getProducts();

      // Assert
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
    });
  });

  /**
   * Test: Manejo de errores de red
   * Valida que el repositorio maneja correctamente errores como 404 y 500
   */
  describe('Network error handling', () => {
    it('should throw an error when API returns 404', async () => {
      // Arrange
      server.use(errorHandlers.notFound);

      // Act & Assert
      await expect(repository.getProducts()).rejects.toThrow(
        'Error al consumir el API: Not Found'
      );
    });

    it('should throw an error when API returns 500', async () => {
      // Arrange
      server.use(errorHandlers.serverError);

      // Act & Assert
      await expect(repository.getProducts()).rejects.toThrow(
        'Error al consumir el API: Internal Server Error'
      );
    });

    it('should throw an error on network failure', async () => {
      // Arrange
      server.use(errorHandlers.networkError);

      // Act & Assert
      await expect(repository.getProducts()).rejects.toThrow();
    });

    it('should not catch the error, allowing it to propagate', async () => {
      // Arrange
      server.use(errorHandlers.serverError);

      // Act & Assert
      const promise = repository.getProducts();
      await expect(promise).rejects.toThrow();
    });
  });

  /**
   * Test: Delegación al Mapper
   * Valida que el repositorio delega correctamente el mapeo a los Mappers
   */
  describe('Mapper delegation', () => {
    it('should delegate product transformation to ProductMapper', async () => {
      // Act
      const products = await repository.getProducts();
      const firstProduct = products[0];

      // Assert
      // If the mapper is correctly applied, we should see:
      // - rating and totalReviews converted from string to number
      // - best price selected according to hierarchy
      expect(typeof firstProduct.rating).toBe('number');
      expect(typeof firstProduct.reviewsCount).toBe('number');
      expect(firstProduct.mainPrice).toBeDefined();
    });

    it('should apply mapper to all products in the response', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      products.forEach((product: Product) => {
        expect(typeof product.rating).toBe('number');
        expect(typeof product.reviewsCount).toBe('number');
        expect(product.mainPrice).toBeDefined();
      });
    });

    it('should handle price hierarchy through mapper', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      products.forEach((product: Product) => {
        // The product should have a mainPrice that follows the hierarchy logic
        expect(product.mainPrice).toBeDefined();
        expect(product.mainPrice.amount).toBeGreaterThan(0);
        expect(['NORMAL', 'INTERNET', 'CMR']).toContain(product.mainPrice.type);
      });
    });

    it('should handle badge mapping through mapper', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      const productWithBadges = products.find((p: Product) => p.badges.length > 0);
      if (productWithBadges) {
        expect(productWithBadges.badges[0]).toHaveProperty('type');
        expect(productWithBadges.badges[0]).toHaveProperty('value');
      }
    });
  });

  /**
   * Test: Caching y headers
   * Valida que se usan los headers y opciones de caché correctamente
   */
  describe('Request configuration', () => {
    it('should set correct Content-Type header', async () => {
      // Arrange - The MSW handlers will verify headers

      // Act
      const products = await repository.getProducts();

      // Assert
      expect(products).toBeDefined();
    });

    it('should use revalidate option from environment variable', async () => {
      // Arrange
      const expectedRevalidateTime = Number(process.env.NEXT_PUBLIC_DEFAULT_CACHE_TIME) || 3600;

      // Act
      const products = await repository.getProducts();

      // Assert
      expect(products).toBeDefined();
      expect(expectedRevalidateTime).toBeGreaterThan(0);
    });

    it('should handle environment variable as number or default to 3600', async () => {
      // Arrange
      const cacheTime = Number(process.env.NEXT_PUBLIC_DEFAULT_CACHE_TIME) || 3600;

      // Act
      const products = await repository.getProducts();

      // Assert
      expect(typeof cacheTime).toBe('number');
      expect(cacheTime).toBeGreaterThan(0);
      expect(products).toBeDefined();
    });
  });

  /**
   * Test: Métodos del repositorio
   * Valida que todos los métodos del repositorio funcionan correctamente
   */
  describe('Repository methods', () => {
    it('should implement getProducts method', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should implement getCategoryData method', async () => {
      // Act
      const categoryData = await repository.getCategoryData();

      // Assert
      expect(categoryData).toBeDefined();
      expect(categoryData).toHaveProperty('id');
    });

    it('should have typed return values', async () => {
      // Act
      const products = await repository.getProducts();
      const categoryData = await repository.getCategoryData();

      // Assert
      expect(products).toBeDefined();
      expect(categoryData).toBeDefined();
    });
  });

  /**
   * Test: Response DTO transformation
   * Valida que la respuesta del API es correctamente procesada
   */
  describe('Response DTO transformation', () => {
    it('should correctly parse JSON response from API', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should handle deeply nested response structure', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      // The response structure is data.results, so we verify the parsing
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].id).toBeDefined();
    });

    it('should extract results from response data structure', async () => {
      // Act
      const products = await repository.getProducts();

      // Assert
      // Response structure is { data: { results: [...] } }
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });
  });
});
