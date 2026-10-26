import { Expand } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { DemoNote } from '@/components/ui/DemoNote';
import { FilterChips } from '@/components/ui/FilterChips';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { inspirationCategories, inspirationItems } from '@/data/inspiration';
import { cn } from '@/lib/cn';

const ALL = 'todos';
const options = [{ id: ALL, label: 'Todos' }, ...inspirationCategories.map((c) => ({ id: c.id, label: c.name }))];
const categoryName = (id: string) => inspirationCategories.find((c) => c.id === id)?.name ?? '';

/**
 * Composición asimétrica en escritorio (bloques de 6 piezas):
 * una grande, dos apiladas y tres medianas. Con filtro activo se alternan pares 7/5.
 */
const fullPattern = [
  'lg:col-span-7 lg:row-span-6',
  'lg:col-span-5 lg:row-span-3',
  'lg:col-span-5 lg:row-span-3',
  'lg:col-span-4 lg:row-span-4',
  'lg:col-span-4 lg:row-span-4',
  'lg:col-span-4 lg:row-span-4',
];

function tileClass(index: number, count: number, filtered: boolean) {
  // En móvil: una ancha y dos verticales; si la última vertical queda sola, ocupa toda la fila.
  const wide = index % 3 === 0 || (index === count - 1 && index % 3 === 1);
  const mobile = wide ? 'col-span-2 aspect-[16/10]' : 'col-span-1 aspect-[4/5]';
  const desktop = filtered
    ? cn('lg:row-span-5', (index % 4 === 0 || index % 4 === 3) ? 'lg:col-span-7' : 'lg:col-span-5')
    : fullPattern[index % fullPattern.length];
  return cn(mobile, 'lg:aspect-auto', desktop);
}

export function InspirationSection() {
  const [category, setCategory] = useState(ALL);
  const [viewer, setViewer] = useState<number | null>(null);
  const filtered = category !== ALL;

  const items = useMemo(
    () => (filtered ? inspirationItems.filter((item) => item.categoryId === category) : inspirationItems),
    [category, filtered],
  );
  const lightboxItems = items.map((item) => ({ image: item.image, title: item.title, subtitle: categoryName(item.categoryId) }));

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="section-y">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 id="proyectos-title" className="text-display">
              Inspiración para cada espacio
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-muted">Referencias visuales para imaginar tu próximo ambiente y conversar sobre lo que te gusta.</p>
          </Reveal>
        </div>

        <div className="mt-12">
          <FilterChips options={options} value={category} onChange={setCategory} label="Filtrar inspiración por ambiente" layoutId="inspiration-category" />
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[6rem] lg:grid-cols-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                className={tileClass(index, items.length, filtered)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Nombre accesible = leyenda visible + "Ampliar imagen"; el texto alternativo completo se lee en el visor */}
                <button
                  type="button"
                  onClick={() => setViewer(index)}
                  className="group relative block h-full w-full overflow-hidden rounded-md text-left"
                >
                  <SmartImage
                    image={{ ...item.image, alt: '' }}
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full"
                    imgClassName="group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-charcoal/75 via-charcoal/5 to-transparent transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-ivory transition duration-500 ease-soft sm:p-5 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                    <span className="block text-[0.75rem] text-ivory/75 sm:text-[0.8125rem]">{categoryName(item.categoryId)}</span>
                    <span className="block font-display text-[1.2rem] leading-tight sm:text-2xl">{item.title}</span>
                    <span className="sr-only">. Ampliar imagen</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 hidden size-10 items-center justify-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition duration-500 group-hover:opacity-100 lg:flex"
                  >
                    <Expand className="size-4" />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <DemoNote className="mt-10">
          Imágenes de referencia de uso libre (Unsplash). Son ejemplos conceptuales y no corresponden a proyectos
          realizados por Ksa Estilo; se reemplazarán por fotografías propias.
        </DemoNote>
      </div>

      <Lightbox
        items={lightboxItems}
        index={viewer}
        onClose={() => setViewer(null)}
        onIndexChange={setViewer}
        label="Galería de inspiración"
      />
    </section>
  );
}
