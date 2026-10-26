import { Expand } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Lightbox } from '@/components/ui/Lightbox';
import { SmartImage } from '@/components/ui/SmartImage';
import { cn } from '@/lib/cn';
import type { Product } from '@/types/catalog';

/** Galería del producto: imagen principal, miniaturas y visor ampliado. */
export function ProductGallery({ product }: { product: Product }) {
  const [current, setCurrent] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const image = product.images[current] ?? product.images[0];
  if (!image) return null;

  const items = product.images.map((img, index) => ({
    image: img,
    title: product.name,
    subtitle: `Vista ${index + 1} de ${product.images.length}`,
  }));

  return (
    <div>
      <button
        type="button"
        onClick={() => setViewer(current)}
        className="group relative block w-full overflow-hidden rounded-t-full"
        aria-label={`Ampliar imagen: ${image.alt}`}
      >
        <div className="arch relative aspect-[4/5] overflow-hidden bg-stone sm:aspect-[5/6]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SmartImage
                image={image}
                priority={current === 0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full"
                imgClassName="group-hover:scale-[1.03]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-ivory/95 px-4 py-2 text-[0.8125rem] font-semibold text-charcoal shadow-sm">
          <Expand className="size-4" aria-hidden="true" /> Ampliar
        </span>
      </button>

      {product.images.length > 1 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-4" aria-label="Fotografías del producto">
          {product.images.map((img, index) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ver imagen ${index + 1}: ${img.alt}`}
                aria-pressed={index === current}
                className={cn(
                  'block w-full overflow-hidden rounded-md ring-offset-2 ring-offset-linen transition duration-300',
                  index === current ? 'ring-2 ring-walnut' : 'opacity-70 hover:opacity-100',
                )}
              >
                <SmartImage image={img} sizes="(min-width: 1024px) 18vw, 31vw" className="aspect-[4/3]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox items={items} index={viewer} onClose={() => setViewer(null)} onIndexChange={setViewer} label={`Galería de ${product.name}`} />
    </div>
  );
}
