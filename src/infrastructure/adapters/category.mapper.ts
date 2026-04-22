import { CategoryDataDTO } from '../api/dtos/category.dto';
import { Category } from '@/core/entities/category.entity';
import { ViewMode } from '@/shared/enums/category.enum';

export class CategoryMapper {
  static toDomain(dto: CategoryDataDTO): Category {
    const { results, config } = dto;

    return {
      id: results.id,
      name: results.displayName,
      seo: {
        title: results.metaTitle,
        description: results.metaDescription,
        keywords: results.metaKeywords
      },
      breadcrumbs: results.breadcrumbs.map(b => ({
        id: b.categoryId,
        label: b.name,
        isRoot: b.isRootCategory // Normalización: el DTO raíz usa string, pero breadcrumbs usa boolean
      })),
      viewMode: config.view === ViewMode.GRID ? ViewMode.GRID : ViewMode.LIST,
      isLanding: config.isLanding
    };
  }
}