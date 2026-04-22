export interface BreadcrumbDTO {
  categoryId: string;
  name: string;
  isRootCategory: boolean;
}

export interface CategoryResultsDTO {
  id: string;
  displayName: string;
  defaultParentCategoryId: string;
  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
  isRootCategory: string; // Recibido como string "false"
  isPublished: string;     // Recibido como string "true"
  breadcrumbs: BreadcrumbDTO[];
}

export interface CategoryConfigDTO {
  view: string;
  isLanding: boolean;
}

export interface CategoryDataDTO {
  results: CategoryResultsDTO;
  config: CategoryConfigDTO;
}