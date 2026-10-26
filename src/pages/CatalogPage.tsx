import { Search, SearchX, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button, ButtonLink } from '@/components/ui/Button';
import { DemoNote } from '@/components/ui/DemoNote';
import { FilterChips } from '@/components/ui/FilterChips';
import { categories, getCategoryName } from '@/data/categories';
import { ProductGrid, ProductGridSkeleton } from '@/features/catalog/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { useSeo } from '@/hooks/useSeo';

const ALL = 'todas';
const options = [{ id: ALL, label: 'Todas' }, ...categories.map((category) => ({ id: category.id, label: category.name }))];

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const categoryParam = params.get('categoria') ?? '';
  const category = categories.some((c) => c.id === categoryParam) ? categoryParam : '';
  const query = (params.get('q') ?? '').trim();
  const [search, setSearch] = useState(query);

  useSeo({
    title: category ? `${getCategoryName(category)} | Catálogo` : 'Catálogo de muebles',
    description:
      'Catálogo de muebles para sala, dormitorio, comedor, cocina y oficina. Busca por nombre o categoría y consulta el precio por WhatsApp.',
    path: '/catalogo',
  });

  // Sincroniza el campo si la URL cambia desde fuera (ej. botón Atrás).
  useEffect(() => {
    setSearch((current) => (current.trim() === query ? current : query));
  }, [query]);

  // Actualiza la URL con un pequeño retardo mientras se escribe.
  useEffect(() => {
    const value = search.trim();
    if (value === query) return;
    const timer = setTimeout(() => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) next.set('q', value);
          else next.delete('q');
          return next;
        },
        { replace: true },
      );
    }, 250);
    return () => clearTimeout(timer);
  }, [search, query, setParams]);

  const setCategory = (id: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (id === ALL) next.delete('categoria');
        else next.set('categoria', id);
        return next;
      },
      { replace: true },
    );

  const clearFilters = () => {
    setSearch('');
    setParams(new URLSearchParams(), { replace: true });
  };

  const { products, status } = useProducts({ categoryId: category || undefined, query: query || undefined });
  const countLabel = `${products.length} ${products.length === 1 ? 'pieza' : 'piezas'}`;

  return (
    <div className="pb-24 pt-32 lg:pt-40">
      <header className="container-page">
        <h1 className="text-display">Catálogo</h1>
        <p className="mt-6 max-w-2xl text-lead text-muted">
          Muebles para sala, dormitorio, comedor, cocina y oficina. Busca una pieza, filtra por categoría y consulta su
          precio directamente con Ksa Estilo.
        </p>
      </header>

      <div className="sticky top-18 z-20 mt-12 border-y border-line bg-linen/90 py-4 backdrop-blur-md lg:top-20">
        <div className="container-page flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="buscar-producto" className="sr-only">
              Buscar productos
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="buscar-producto"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar sofá, comedor, madera…"
              autoComplete="off"
              className="h-12 w-full rounded-full border border-line bg-ivory pl-11 pr-11 text-[0.9375rem] transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-walnut focus:shadow-[0_0_0_3px_rgb(139_111_71/0.15)] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-stone hover:text-charcoal"
                aria-label="Borrar búsqueda"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <FilterChips options={options} value={category || ALL} onChange={setCategory} label="Filtrar por categoría" layoutId="catalog-category" />
        </div>
      </div>

      <div className="container-page mt-10">
        <p className="text-[0.875rem] font-medium text-muted" aria-live="polite">
          {status === 'success' && countLabel}
          {query && status === 'success' && <> para «{query}»</>}
        </p>

        <div className="mt-8">
          {status === 'loading' && products.length === 0 && <ProductGridSkeleton />}
          {status === 'error' && (
            <div className="rounded-2xl border border-line bg-ivory p-10 text-center">
              <p className="font-display text-2xl">No pudimos cargar el catálogo</p>
              <p className="mt-2 text-muted">Revisa tu conexión e inténtalo nuevamente.</p>
              <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
                Volver a cargar
              </Button>
            </div>
          )}
          {status !== 'error' && products.length > 0 && <ProductGrid products={products} headingLevel="h2" />}
          {status === 'success' && products.length === 0 && (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
              <SearchX className="size-8 text-walnut" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-5 font-display text-3xl">No encontramos piezas{query ? ` para «${query}»` : ' en esta categoría'}</p>
              <p className="mt-3 max-w-md text-muted">Prueba con otra palabra, revisa todas las categorías o cuéntanos qué buscas.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button onClick={clearFilters}>Ver todas las piezas</Button>
                <ButtonLink to="/cotizacion" variant="outline">
                  Solicitar cotización
                </ButtonLink>
              </div>
            </div>
          )}
        </div>

        <DemoNote className="mt-16">
          Piezas de referencia para esta demostración: no representan inventario disponible ni incluyen precios.
        </DemoNote>

        <aside className="mt-20 flex flex-col gap-8 rounded-3xl bg-charcoal px-7 py-12 text-ivory sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-title">¿Buscas algo a la medida de tu espacio?</h2>
            <p className="mt-3 text-ivory/70">Cuéntanos qué necesitas y te ayudamos a encontrar o diseñar la pieza adecuada.</p>
          </div>
          <ButtonLink to="/cotizacion?servicio=muebles-personalizados" variant="light" size="lg">
            Solicitar cotización
          </ButtonLink>
        </aside>
      </div>
    </div>
  );
}
