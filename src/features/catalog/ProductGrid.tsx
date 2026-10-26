import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/cn';
import type { Product } from '@/types/catalog';
import { ProductCard } from './ProductCard';

const gridClass = 'grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 md:gap-y-16 xl:grid-cols-4 xl:gap-x-8';

interface ProductGridProps {
  products: Product[];
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function ProductGrid({ products, headingLevel, className }: ProductGridProps) {
  return (
    <ul className={cn(gridClass, className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product) => (
          <motion.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={product} headingLevel={headingLevel} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

/** Placeholder mientras se cargan los productos. */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className={gridClass} aria-busy="true" aria-label="Cargando productos">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          <div className="arch skeleton aspect-[4/5] bg-stone" />
          <div className="skeleton mt-5 h-3 w-1/3 rounded bg-stone" />
          <div className="skeleton mt-3 h-6 w-3/4 rounded bg-stone" />
          <div className="skeleton mt-6 h-4 w-1/2 rounded bg-stone" />
        </div>
      ))}
    </div>
  );
}
