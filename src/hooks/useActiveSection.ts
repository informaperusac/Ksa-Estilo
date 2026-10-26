import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la sección visible (scroll spy). Considera activa la sección
 * que cruza una franja horizontal ubicada a un tercio de la pantalla.
 * Si las secciones aún no existen (p. ej. durante la transición desde otra
 * página), reintenta en los siguientes cuadros hasta encontrarlas.
 */
export function useActiveSection(sectionIds: string[], enabled: boolean): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');
  const key = sectionIds.join('|');

  useEffect(() => {
    if (!enabled) return;
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let attempts = 0;

    const connect = () => {
      const elements = key
        .split('|')
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) {
        if (attempts++ < 180) frame = requestAnimationFrame(connect);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: '-33% 0px -66% 0px' },
      );
      elements.forEach((el) => observer?.observe(el));
    };

    connect();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [key, enabled]);

  return active;
}
