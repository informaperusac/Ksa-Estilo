import { useState } from 'react';
import { cn } from '@/lib/cn';
import type { ImageAsset } from '@/types/media';

interface SmartImageProps {
  image: ImageAsset;
  /** Atributo sizes para que el navegador elija la variante adecuada. */
  sizes: string;
  /** Clases del contenedor (define tamaño o proporción). */
  className?: string;
  imgClassName?: string;
  /** Carga inmediata y prioritaria (solo para imágenes visibles al cargar). */
  priority?: boolean;
  /** Usa la proporción natural de la imagen en lugar de la del contenedor. */
  natural?: boolean;
}

/**
 * Imagen responsiva con lazy loading, dimensiones explícitas (sin saltos de
 * diseño) y un placeholder animado con el color dominante mientras carga.
 */
export function SmartImage({ image, sizes, className, imgClassName, priority = false, natural = false }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        backgroundColor: image.color ?? 'var(--color-stone)',
        aspectRatio: natural ? `${image.width} / ${image.height}` : undefined,
      }}
    >
      {!loaded && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      <img
        ref={(node) => {
          if (node?.complete && node.naturalWidth > 0) setLoaded(true);
        }}
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          // Una sola declaración: fundido al cargar y zoom suave al pasar el cursor (via imgClassName).
          'h-full w-full object-cover [transition:opacity_700ms_var(--ease-soft),transform_1.3s_var(--ease-soft)]',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  );
}
