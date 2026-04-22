import { IProductRepository } from '@/infrastructure/repositories/product-repository.interface';
import { Product } from '@/core/entities/product.entity';
import { Category } from '@/core/entities/category.entity';

interface CatalogResponse {
  products: Product[];
  category: Category;
}

export class GetStoreCatalogUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * Ejecuta la lógica para obtener catálogo optimizado para SSR
   */
  async execute(): Promise<CatalogResponse> {
    // Para SSR on-demand, forzamos la obtención de datos frescos
    const [products, category] = await Promise.all([
      this.productRepository.getProducts(true),
      this.productRepository.getCategoryData(true)
    ]);

    // Aquí se podría aplicar lógica de negocio adicional (ej. filtrado por stock > 0)
    return {
      products,
      category
    };
  }
}