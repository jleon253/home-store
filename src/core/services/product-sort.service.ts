import { Product } from '../entities/product.entity';
import { SortOrder } from '@/shared/enums/product.enum';

export class ProductSortService {
  /**
   * Ordena una colección de productos basándose en un criterio específico.
   * Retorna un nuevo array para mantener la inmutabilidad.
   */
  static sort(products: Product[], order: SortOrder): Product[] {
    const items = [...products];

    switch (order) {
      case SortOrder.NAME_ASC:
        return items.sort((a, b) => a.title.localeCompare(b.title));

      case SortOrder.BRAND_ASC:
        return items.sort((a, b) => a.brand.localeCompare(b.brand));

      case SortOrder.PRICE_ASC:
        return items.sort((a, b) => a.mainPrice.amount - b.mainPrice.amount);

      case SortOrder.PRICE_DESC:
        return items.sort((a, b) => b.mainPrice.amount - a.mainPrice.amount);

      default:
        return items;
    }
  }
}