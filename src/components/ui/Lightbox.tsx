import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from '@/config/site';
import { useModalBehavior } from '@/hooks/useModalBehavior';
import type { ImageAsset } from '@/types/media';
import { EASE_SOFT } from './Reveal';

export interface LightboxItem {
  image: ImageAsset;
  title: string;
  subtitle?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Índice abierto o null si está cerrado. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  label: string;
}

/** Visor de imágenes accesible: teclado, gestos de deslizamiento y foco atrapado. */
export function Lightbox({ items, index, onClose, onIndexChange, label }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const item = index !== null ? items[index] : undefined;
  const count = items.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useModalBehavior(dialogRef, open, onClose);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, go]);

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[60] flex flex-col bg-charcoal/96 text-ivory backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-sm tabular-nums text-ivory/70" aria-live="polite">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="flex size-11 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-charcoal"
              aria-label="Cerrar visor"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={item.image.src}
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="(min-width: 1024px) 80vw, 100vw"
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="max-h-full w-auto max-w-full cursor-grab touch-pan-y select-none object-contain active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_SOFT }}
                drag={count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                draggable={false}
              />
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-charcoal sm:flex sm:left-6"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-charcoal sm:flex sm:right-6"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-end justify-between gap-6 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-7">
            <div>
              {item.subtitle && <p className="text-[0.8125rem] text-ivory/60">{item.subtitle}</p>}
              <p className="font-display text-2xl leading-tight sm:text-3xl">{item.title}</p>
              {siteConfig.demoMode && <p className="mt-1 text-xs text-ivory/50">Imagen referencial</p>}
            </div>
            {count > 1 && (
              <div className="flex gap-2 sm:hidden">
                <button type="button" onClick={() => go(-1)} className="flex size-11 items-center justify-center rounded-full border border-ivory/20" aria-label="Imagen anterior">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} className="flex size-11 items-center justify-center rounded-full border border-ivory/20" aria-label="Imagen siguiente">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
