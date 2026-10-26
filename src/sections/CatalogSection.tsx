import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { DemoNote } from '@/components/ui/DemoNote';
import { FilterChips } from '@/components/ui/FilterChips';
import { Reveal } from '@/components/ui/Reveal';
import { categories } from '@/data/categories';
import { ProductGrid, ProductGridSkeleton } from '@/features/catalog/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

const ALL = 'todas';
const options = [{ id: ALL, label: 'Todas' }, ...categories.map((category) => ({ id: category.id, label: category.name }))];

export function CatalogSection() {
  const [category, setCategory] = useState(ALL);
  const { products, status } = useProducts({ categoryId: category === ALL ? undefined : category });

  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className="section-y bg-ivory">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <h2 id="catalogo-title" className="text-display">
              Piezas para cada ambiente
            </h2>
            <p className="mt-6 text-lead text-muted">
              Una selección para imaginar tu espacio. Filtra por categoría y consulta el precio de cada pieza
              directamente por WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink to="/catalogo" variant="outline" size="lg">
              Ver catálogo completo
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12">
          <FilterChips options={options} value={category} onChange={setCategory} label="Filtrar por categoría" layoutId="home-category" />
        </div>

        <div className="mt-12" aria-live="polite">
          {status === 'loading' && products.length === 0 ? (
            <ProductGridSkeleton />
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
              Aún no hay piezas en esta categoría. Prueba con otra o{' '}
              <button type="button" onClick={() => setCategory(ALL)} className="font-semibold text-charcoal underline underline-offset-4">
                mira todas las piezas
              </button>
              .
            </p>
          )}
        </div>

        <DemoNote className="mt-14">
          Piezas de referencia para esta demostración: no representan inventario disponible ni incluyen precios. Las
          categorías y productos se reemplazarán por el catálogo real de Ksa Estilo.
        </DemoNote>
      </div>
    </section>
  );
}
