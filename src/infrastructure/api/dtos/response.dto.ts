import { ProductDTO } from './product.dto';
import { CategoryDataDTO } from './category.dto';

export interface RootResponseDTO {
  data: {
    results: ProductDTO[];
    sponsoredBanners: string[];
    selectedFacets: string[];
  };
  categoryData: CategoryDataDTO;
}