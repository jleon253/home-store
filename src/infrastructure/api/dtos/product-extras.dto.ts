import { BadgeType, Highlights } from "@/shared/enums/product.enum";

export interface BadgeDTO {
  type: BadgeType; // Ej: "DISCOUNT"
  value: string; // Ej: "-53%"
}

export interface BankBadgeDTO {
  type: BadgeType; // Ej: "BANK_PROMOTION"
  value: string; // URL de la imagen del banco
}

export interface HighlightDTO {
  key: Highlights;
  value: string;
}

export interface FastShippingLabelsDTO {
  hd_same_day_zones: boolean;
  hd_next_day_zones: boolean;
  cc_same_day_zones: boolean;
  cc_next_day_zones: boolean;
}