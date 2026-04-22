import { PriceType, UnitType } from '@/shared/enums/product.enum';

export interface Price {
  readonly amount: number;
  readonly currency: string;
  readonly type: PriceType;
  readonly unit: UnitType;
}

export interface ProductBadge {
  readonly type: string;
  readonly value: string;
}

export interface ProductHighlight {
  readonly label: string;
  readonly value: string;
}

export interface Product {
  readonly id: string;
  readonly title: string;
  readonly brand: string;
  readonly model: string;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly thumbnail: string;
  readonly images: string[];
  readonly mainPrice: Price;
  readonly listPrice?: Price;
  readonly badges: ProductBadge[];
  readonly highlights: ProductHighlight[];
  readonly hasFastShipping: boolean;
  readonly isPromoted: boolean;
}