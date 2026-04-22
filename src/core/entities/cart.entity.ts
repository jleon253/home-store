import { Product } from './product.entity';

export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
  readonly addedAt: Date;
}

export interface Cart {
  readonly items: CartItem[];
  readonly totalItems: number;
  readonly subtotal: number;
  readonly updatedAt: Date;
}