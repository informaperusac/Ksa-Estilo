import type { ImageAsset } from './media';

/**
 * Modelos del catálogo. Están pensados para corresponder 1:1 con los recursos
 * de una futura API REST (GET /categories, GET /products, GET /products/:slug).
 */
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: ProductCategory['id'];
  /** Descripción breve para tarjetas y listados. */
  summary: string;
  /** Descripción ampliada para la página de detalle. */
  description: string;
  features: string[];
  materials: string[];
  /** La primera imagen es la principal. */
  images: ImageAsset[];
}

export interface ProductFilters {
  categoryId?: string;
  query?: string;
}
