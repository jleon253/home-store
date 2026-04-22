import { Product } from '@/core/entities/product.entity';
import { Category } from '@/core/entities/category.entity';

export interface IProductRepository {
  /**
   * Obtiene la lista de productos normalizados desde la fuente de datos.
   */
  getProducts(isDynamic: boolean): Promise<Product[]>;

  /**
   * Obtiene la información de la categoría y metadatos SEO.
   */
  getCategoryData(isDynamic: boolean): Promise<Category>;
}