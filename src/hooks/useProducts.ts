import { useEffect, useMemo, useState } from 'react';
import { catalogService } from '@/services/catalog.service';
import type { Product, ProductFilters } from '@/types/catalog';

export type LoadStatus = 'loading' | 'success' | 'error';

/**
 * Productos filtrados. Con datos locales el resultado es inmediato; con la API
 * del ERP se exponen los estados de carga y error.
 */
export function useProducts({ categoryId, query }: ProductFilters) {
  const local = useMemo(() => catalogService.peekProducts({ categoryId, query }), [categoryId, query]);
  const [remote, setRemote] = useState<{ products: Product[]; status: LoadStatus }>({ products: [], status: 'loading' });

  useEffect(() => {
    if (local) return;
    const controller = new AbortController();
    setRemote((previous) => ({ ...previous, status: 'loading' }));
    catalogService
      .getProducts({ categoryId, query }, controller.signal)
      .then((products) => setRemote({ products, status: 'success' }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setRemote((previous) => ({ ...previous, status: 'error' }));
      });
    return () => controller.abort();
  }, [local, categoryId, query]);

  return local ? { products: local, status: 'success' as LoadStatus } : remote;
}

export type ProductState = { status: 'loading' } | { status: 'ready'; product: Product } | { status: 'missing' };

/** Producto por slug, con el mismo criterio: inmediato si es local, asíncrono si viene de la API. */
export function useProduct(slug: string | null): ProductState {
  const local = useMemo(() => (slug ? catalogService.peekProductBySlug(slug) : null), [slug]);
  const [remote, setRemote] = useState<ProductState>({ status: 'loading' });

  useEffect(() => {
    if (!slug || local !== undefined) return;
    const controller = new AbortController();
    setRemote({ status: 'loading' });
    catalogService
      .getProductBySlug(slug, controller.signal)
      .then((product) => setRemote(product ? { status: 'ready', product } : { status: 'missing' }))
      .catch(() => {
        if (!controller.signal.aborted) setRemote({ status: 'missing' });
      });
    return () => controller.abort();
  }, [slug, local]);

  if (!slug) return { status: 'missing' };
  if (local === undefined) return remote;
  return local ? { status: 'ready', product: local } : { status: 'missing' };
}
