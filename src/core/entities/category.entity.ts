import { ViewMode } from "@/shared/enums/category.enum";

export interface Breadcrumb {
  readonly id: string;
  readonly label: string;
  readonly isRoot: boolean;
}

export interface CategorySEO {
  readonly title: string;
  readonly description: string;
  readonly keywords: string[];
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly seo: CategorySEO;
  readonly breadcrumbs: Breadcrumb[];
  readonly viewMode: ViewMode.GRID | ViewMode.LIST;
  readonly isLanding: boolean;
}