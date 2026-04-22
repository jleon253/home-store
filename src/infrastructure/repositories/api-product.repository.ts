import { Product } from "@/core/entities/product.entity";
import { Category } from "@/core/entities/category.entity";
import { ProductMapper } from "../adapters/product.mapper";
import { CategoryMapper } from "../adapters/category.mapper";
import { RootResponseDTO } from "../api/dtos/response.dto";
import { IProductRepository } from "./product-repository.interface";

export class ApiProductRepository implements IProductRepository {
  private readonly url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CATEGORY_ENDPOINT}`;

  async getProducts(isDynamic: boolean = false): Promise<Product[]> {
    const data = await this.fetchFromApi(isDynamic);
    return data.data.results.map((dto) => ProductMapper.toDomain(dto));
  }

  async getCategoryData(isDynamic: boolean = false): Promise<Category> {
    const data = await this.fetchFromApi(isDynamic);
    return CategoryMapper.toDomain(data.categoryData);
  }

  private async fetchFromApi(isDynamic: boolean): Promise<RootResponseDTO> {
    // Si es dinámico (SSR), usamos 'no-store' para asegurar datos on-demand.
    // Si no, usamos la revalidación por tiempo definida en el .env.
    const fetchOptions: RequestInit = isDynamic
      ? { cache: "no-store" }
      : {
          next: {
            revalidate:
              Number(process.env.NEXT_PUBLIC_DEFAULT_CACHE_TIME) || 3600,
          },
        };

    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Opcional: Header para identificar la petición desde el servidor de la SPA
        "X-Source": "NextJs-SSR",
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`Error al consumir el API: ${response.statusText}`);
    }

    return response.json();
  }
}
