import { PriceType, UnitType } from "@/shared/enums/product.enum";
import { BadgeDTO, BankBadgeDTO, HighlightDTO, FastShippingLabelsDTO } from './product-extras.dto';

export interface PriceDTO {
  label: string;
  type: PriceType;
  symbol: string;
  price: string;
  unit: UnitType;
  priceWithoutFormatting: number;
}

export interface MediaDTO {
  id: string;
  type: string;
  onImageHover: string;
}

export interface ProductDTO {
  // Identificación
  productId: string;
  skuId: string;
  merchantCategoryId: string;

  // Información Básica
  displayName: string;
  brand: string;
  model: string;
  isPrimeEligible: boolean;
  isPromoted: boolean;
  isInternational: string; // Recibido como string vacío o con valor

  // Media
  media: MediaDTO;
  mediaUrls: string[];

  // Precios y Promociones
  prices: PriceDTO[];
  badges: BadgeDTO[];
  bankBadge?: BankBadgeDTO; // Opcional en el JSON
  
  // Logística y Reseñas
  fastShippingLabels?: FastShippingLabelsDTO;
  totalReviews: string; // Inconsistencia: string en el JSON
  rating: string;       // Inconsistencia: string en el JSON

  // Atributos Técnicos
  highlights: HighlightDTO[];

  // Campos observados como vacíos/pendientes (para integridad del contrato)
  events: Record<string, unknown>[];
  variants: Record<string, unknown>[];
  accumulativePoints: Record<string, unknown>[];
  multiPurposeIcon: Record<string, unknown>;
  installments: Record<string, unknown>;
}