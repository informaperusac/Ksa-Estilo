import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown'] as const;

/**
 * Gestiona el scroll entre rutas y secciones:
 * - Con hash (/#contacto) desplaza hasta la sección cuando la nueva página ya está montada.
 * - Sin hash dentro de la misma página vuelve arriba. El cambio de página lo resuelve
 *   la transición (ver Layout → onExitComplete).
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const samePage = previousPath.current === pathname;
    previousPath.current = pathname;
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

    if (!hash) {
      if (samePage) window.scrollTo({ top: 0, behavior });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;
    let correction = 0;
    const cancelCorrection = () => window.clearTimeout(correction);

    const tryScroll = () => {
      const target = document.getElementById(id);
      // Espera a que el elemento pertenezca a la página actual (no a la que está saliendo).
      const owner = target?.closest('main[data-path]');
      if (!target || (owner && owner.getAttribute('data-path') !== pathname)) {
        if (attempts++ < 90) frame = requestAnimationFrame(tryScroll);
        return;
      }
      target.scrollIntoView({ behavior, block: 'start' });

      // Red de seguridad: si el contenido superior cambió de altura durante el
      // desplazamiento (imágenes, datos de la API), se corrige una sola vez.
      USER_SCROLL_EVENTS.forEach((type) => window.addEventListener(type, cancelCorrection, { once: true, passive: true }));
      correction = window.setTimeout(() => {
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        if (Math.abs(target.getBoundingClientRect().top - margin) > 8) target.scrollIntoView({ behavior, block: 'start' });
      }, 900);
    };
    tryScroll();

    return () => {
      cancelAnimationFrame(frame);
      cancelCorrection();
      USER_SCROLL_EVENTS.forEach((type) => window.removeEventListener(type, cancelCorrection));
    };
  }, [pathname, hash, key]);

  return null;
}
