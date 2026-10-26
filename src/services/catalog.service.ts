import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { normalize } from '@/lib/text';
import type { Product, ProductCategory, ProductFilters } from '@/types/catalog';
import { http, isApiEnabled } from './http';

/**
 * Punto único de acceso al catálogo. Hoy responde con los datos locales;
 * al definir VITE_API_URL consulta la API sin cambiar los componentes.
 *
 * Contrato esperado de la API:
 *   GET /categories              → ProductCategory[]
 *   GET /products?category=&q=   → Product[]
 *   GET /products/:slug          → Product
 */
function filterLocal({ categoryId, query }: ProductFilters): Product[] {
  const terms = normalize(query ?? '')
    .split(/\s+/)
    .filter(Boolean);

  return products.filter((product) => {
    if (categoryId && product.categoryId !== categoryId) return false;
    if (terms.length === 0) return true;
    const haystack = normalize(
      [product.name, product.summary, product.description, product.materials.join(' '), categories.find((c) => c.id === product.categoryId)?.name ?? ''].join(' '),
    );
    return terms.every((term) => haystack.includes(term));
  });
}

export const catalogService = {
  /**
   * Resultado inmediato cuando el catálogo es local (evita parpadeos y saltos de diseño).
   * Devuelve null si los datos deben consultarse a la API.
   */
  peekProducts(filters: ProductFilters = {}): Product[] | null {
    return isApiEnabled ? null : filterLocal(filters);
  },

  /** Producto local por slug: null si no existe; undefined si debe consultarse a la API. */
  peekProductBySlug(slug: string): Product | null | undefined {
    if (isApiEnabled) return undefined;
    return products.find((product) => product.slug === slug) ?? null;
  },

  async getCategories(signal?: AbortSignal): Promise<ProductCategory[]> {
    if (isApiEnabled) return http.get<ProductCategory[]>('/categories', signal);
    return categories;
  },

  async getProducts(filters: ProductFilters = {}, signal?: AbortSignal): Promise<Product[]> {
    if (isApiEnabled) {
      const params = new URLSearchParams();
      if (filters.categoryId) params.set('category', filters.categoryId);
      if (filters.query) params.set('q', filters.query);
      const qs = params.toString();
      return http.get<Product[]>(`/products${qs ? `?${qs}` : ''}`, signal);
    }
    return filterLocal(filters);
  },

  async getProductBySlug(slug: string, signal?: AbortSignal): Promise<Product | null> {
    if (isApiEnabled) return http.get<Product>(`/products/${encodeURIComponent(slug)}`, signal);
    return products.find((product) => product.slug === slug) ?? null;
  },

  /** Productos relacionados: misma categoría primero y luego el resto. */
  getRelated(product: Product, limit = 3): Product[] {
    const others = products.filter((p) => p.id !== product.id);
    const sameCategory = others.filter((p) => p.categoryId === product.categoryId);
    return [...sameCategory, ...others.filter((p) => p.categoryId !== product.categoryId)].slice(0, limit);
  },
};
