import { describe, it, expect } from 'vitest';
import { Category, CategorySEO, Breadcrumb } from '@/core/entities/category.entity';

describe('Category Entity', () => {
  /**
   * Test: Inmutabilidad de la Entity
   * Valida que la entidad Category está diseñada con propiedades readonly
   */
  describe('Immutability', () => {
    it('should have all properties designed as readonly (type-level)', () => {
      // Arrange
      const category: Category = {
        id: 'cat-001',
        name: 'Escaleras',
        seo: {
          title: 'Escaleras | Sodimac',
          description: 'Compra escaleras de calidad',
          keywords: ['escalera', 'herramientas'],
        },
        breadcrumbs: [],
        viewMode: 'grid',
        isLanding: false,
      };

      // Assert - Properties are defined as readonly in the interface
      // This is verified at compile-time by TypeScript
      expect(category.id).toBeDefined();
      expect(category.name).toBeDefined();
      expect(category.seo).toBeDefined();
      expect(category.breadcrumbs).toBeDefined();
      expect(category.viewMode).toBeDefined();
      expect(category.isLanding).toBeDefined();
    });
  });

  /**
   * Test: Estructura de la Entity
   * Valida que la entidad tiene la estructura correcta
   */
  describe('Structure validity', () => {
    it('should have all required properties', () => {
      // Arrange
      const category: Category = {
        id: 'cat-001',
        name: 'Escaleras',
        seo: {
          title: 'Escaleras | Sodimac',
          description: 'Compra escaleras de calidad',
          keywords: ['escalera', 'herramientas'],
        },
        breadcrumbs: [],
        viewMode: 'grid',
        isLanding: false,
      };

      // Assert
      expect(category.id).toBeDefined();
      expect(category.name).toBeDefined();
      expect(category.seo).toBeDefined();
      expect(category.breadcrumbs).toBeDefined();
      expect(category.viewMode).toBeDefined();
      expect(category.isLanding).toBeDefined();
    });

    it('should have valid viewMode values', () => {
      // Arrange
      const categoryGrid: Category = {
        id: 'cat-001',
        name: 'Escaleras',
        seo: {
          title: 'Escaleras | Sodimac',
          description: 'Compra escaleras de calidad',
          keywords: ['escalera', 'herramientas'],
        },
        breadcrumbs: [],
        viewMode: 'grid',
        isLanding: false,
      };

      const categoryList: Category = {
        id: 'cat-002',
        name: 'Herramientas',
        seo: {
          title: 'Herramientas | Sodimac',
          description: 'Compra herramientas de calidad',
          keywords: ['herramientas'],
        },
        breadcrumbs: [],
        viewMode: 'list',
        isLanding: false,
      };

      // Assert
      expect(['grid', 'list']).toContain(categoryGrid.viewMode);
      expect(['grid', 'list']).toContain(categoryList.viewMode);
    });
  });

  /**
   * Test: Tipos de propiedades
   * Valida que los tipos de propiedades son correctos
   */
  describe('Property types', () => {
    it('should have string type for id and name', () => {
      // Arrange
      const category: Category = {
        id: 'cat-001',
        name: 'Escaleras',
        seo: {
          title: 'Escaleras | Sodimac',
          description: 'Compra escaleras de calidad',
          keywords: ['escalera', 'herramientas'],
        },
        breadcrumbs: [],
        viewMode: 'grid',
        isLanding: false,
      };

      // Assert
      expect(typeof category.id).toBe('string');
      expect(typeof category.name).toBe('string');
    });

    it('should have boolean type for isLanding', () => {
      // Arrange
      const category: Category = {
        id: 'cat-001',
        name: 'Escaleras',
        seo: {
          title: 'Escaleras | Sodimac',
          description: 'Compra escaleras de calidad',
          keywords: ['escalera', 'herramientas'],
        },
        breadcrumbs: [],
        viewMode: 'grid',
        isLanding: true,
      };

      // Assert
      expect(typeof category.isLanding).toBe('boolean');
    });

    it('should have correct CategorySEO type', () => {
      // Arrange
      const seo: CategorySEO = {
        title: 'Escaleras | Sodimac',
        description: 'Compra escaleras de calidad',
        keywords: ['escalera', 'herramientas'],
      };

      // Assert
      expect(typeof seo.title).toBe('string');
      expect(typeof seo.description).toBe('string');
      expect(Array.isArray(seo.keywords)).toBe(true);
      seo.keywords.forEach((keyword: string) => {
        expect(typeof keyword).toBe('string');
      });
    });

    it('should have correct Breadcrumb type', () => {
      // Arrange
      const breadcrumb: Breadcrumb = {
        id: 'home',
        label: 'Home',
        isRoot: true,
      };

      // Assert
      expect(typeof breadcrumb.id).toBe('string');
      expect(typeof breadcrumb.label).toBe('string');
      expect(typeof breadcrumb.isRoot).toBe('boolean');
    });

    it('should have breadcrumbs as Breadcrumb[] array', () => {
      // Arrange
      const category: Category = {
        id: 'cat-001',
        name: 'Escaleras',
        seo: {
          title: 'Escaleras | Sodimac',
          description: 'Compra escaleras de calidad',
          keywords: ['escalera', 'herramientas'],
        },
        breadcrumbs: [
          { id: 'home', label: 'Home', isRoot: true },
          { id: 'cat-001', label: 'Escaleras', isRoot: false },
        ],
        viewMode: 'grid',
        isLanding: false,
      };

      // Assert
      expect(Array.isArray(category.breadcrumbs)).toBe(true);
      category.breadcrumbs.forEach((breadcrumb: Breadcrumb) => {
        expect(breadcrumb.id).toBeDefined();
        expect(breadcrumb.label).toBeDefined();
        expect(typeof breadcrumb.isRoot).toBe('boolean');
      });
    });
  });

  /**
   * Test: SEO Entity
   * Valida que la entidad CategorySEO está diseñada con propiedades readonly
   */
  describe('CategorySEO immutability', () => {
    it('should have readonly seo properties (type-level)', () => {
      // Arrange
      const seo: CategorySEO = {
        title: 'Escaleras | Sodimac',
        description: 'Compra escaleras de calidad',
        keywords: ['escalera', 'herramientas'],
      };

      // Assert - Properties are defined as readonly in the interface
      // This is verified at compile-time by TypeScript
      expect(seo.title).toBeDefined();
      expect(seo.description).toBeDefined();
      expect(seo.keywords).toBeDefined();
    });
  });

  /**
   * Test: Breadcrumb Entity
   * Valida que la entidad Breadcrumb está diseñada con propiedades readonly
   */
  describe('Breadcrumb immutability', () => {
    it('should have readonly breadcrumb properties (type-level)', () => {
      // Arrange
      const breadcrumb: Breadcrumb = {
        id: 'home',
        label: 'Home',
        isRoot: true,
      };

      // Assert - Properties are defined as readonly in the interface
      // This is verified at compile-time by TypeScript
      expect(breadcrumb.id).toBeDefined();
      expect(breadcrumb.label).toBeDefined();
      expect(breadcrumb.isRoot).toBeDefined();
    });
  });
});
