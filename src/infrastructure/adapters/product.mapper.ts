import { ProductDTO, PriceDTO } from '../api/dtos/product.dto';
import { BadgeDTO, HighlightDTO } from '../api/dtos/product-extras.dto';
import { Product, Price, ProductBadge, ProductHighlight } from '@/core/entities/product.entity';
import { PriceType, UnitType } from '@/shared/enums/product.enum';

export class ProductMapper {
  /**
   * Transforma el DTO del API en una Entidad de Dominio inmutable.
   * Centraliza la normalización de tipos y saneamiento de datos.
   */
  static toDomain(dto: ProductDTO): Product {
    const allPrices = dto.prices;
    const normalPriceDto = allPrices.find(p => p.type === PriceType.NORMAL) || allPrices[0];
    const bestPriceDto = this.getBestPrice(allPrices);
    const mainPrice = this.mapPrice(bestPriceDto);
    const originalPrice = this.mapPrice(normalPriceDto);
    const hasDiscount = mainPrice.amount < originalPrice.amount;

    return {
      id: dto.productId,
      title: dto.displayName,
      brand: dto.brand,
      model: dto.model,
      // Conversión explícita de tipos detectados como inconsistentes en el API
      rating: parseFloat(dto.rating) || 0,
      reviewsCount: parseInt(dto.totalReviews, 10) || 0,
      thumbnail: dto.mediaUrls[0] || '',
      images: dto.mediaUrls,
      mainPrice,
      originalPrice: hasDiscount ? originalPrice : undefined,
      hasDiscount,
      badges: this.mapBadges(dto.badges),
      highlights: this.mapHighlights(dto.highlights),
      // Abstracción de lógica de negocio para envío rápido
      hasFastShipping: !!(
        dto.fastShippingLabels?.hd_same_day_zones || 
        dto.fastShippingLabels?.cc_same_day_zones
      ),
      isPromoted: dto.isPromoted
    };
  }

  private static mapPrice(p: PriceDTO): Price {
    return {
      amount: p.priceWithoutFormatting,
      currency: p.symbol,
      type: p.type as PriceType,
      // Normalización de unidad para evitar inconsistencias "Und" vs "UND"
      unit: p.unit.toUpperCase() === UnitType.UNIT ? UnitType.UNIT : UnitType.OTHER
    };
  }

  private static mapBadges(badges?: BadgeDTO[]): ProductBadge[] {
    if (!badges) return [];
    return badges.map(b => ({
      type: b.type,
      value: b.value
    }));
  }

  private static mapHighlights(highlights?: HighlightDTO[]): ProductHighlight[] {
    if (!highlights) return [];
    return highlights.map(h => ({
      label: h.key,
      value: h.value
    }));
  }

  /**
   * Implementa la jerarquía de precios de negocio: CMR > INTERNET > NORMAL
   */
  private static getBestPrice(prices: PriceDTO[]): PriceDTO {
    const priority = [PriceType.CMR, PriceType.INTERNET, PriceType.NORMAL];
    
    return [...prices].sort((a, b) => {
      const indexA = priority.indexOf(a.type as PriceType);
      const indexB = priority.indexOf(b.type as PriceType);
      return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    })[0];
  }
}