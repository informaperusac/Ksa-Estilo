import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { navItems } from '@/data/site-content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useModalBehavior } from '@/hooks/useModalBehavior';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import type { NavItem } from '@/types/content';
import { MobileMenu } from './MobileMenu';

const sectionIds = navItems.map((item) => item.sectionId);

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(sectionIds, isHome);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useModalBehavior(shellRef, menuOpen, closeMenu);

  // Cierra el menú móvil si la pantalla pasa a tamaño escritorio.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 64rem)');
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const solid = !isHome || scrolled;
  const lightText = !solid && !menuOpen;

  // En el inicio manda la sección visible; en otras páginas, la ruta (ej. /catalogo/...).
  const isActive = (item: NavItem) => {
    if (isHome) return item.sectionId === activeSection;
    return item.to !== '/' && !item.to.includes('#') && pathname.startsWith(item.to);
  };

  return (
    <>
      <a
        href="#contenido"
        className="fixed left-4 top-3 z-[70] -translate-y-24 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-ivory transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      {/* Contenedor del foco atrapado cuando el menú móvil está abierto */}
      <div ref={shellRef}>
        <header
          className={cn(
            'fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ease-soft',
            lightText ? 'text-ivory' : 'text-charcoal',
            solid && !menuOpen && 'bg-ivory/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md',
          )}
        >
          <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
            {/* El nombre accesible incluye el texto visible del logotipo (WCAG 2.5.3) */}
            <Link to="/" onClick={closeMenu} className="rounded-sm">
              <Logo tone={lightText ? 'light' : 'dark'} />
              <span className="sr-only">, ir al inicio</span>
            </Link>

            <nav aria-label="Navegación principal" className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-10">
                {navItems.map((item) => {
                  const active = isActive(item);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        aria-current={active ? (isHome ? 'location' : 'page') : undefined}
                        className={cn(
                          'relative block py-2 text-[0.9375rem] font-medium transition-opacity duration-300',
                          active ? 'opacity-100' : 'opacity-75 hover:opacity-100',
                        )}
                      >
                        {item.label}
                        {active && (
                          <motion.span
                            layoutId="nav-indicator"
                            aria-hidden="true"
                            className={cn('absolute inset-x-0 -bottom-0.5 h-px', lightText ? 'bg-ivory' : 'bg-walnut')}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {/* El contenedor controla la visibilidad: el botón ya define su propio display */}
              <div className="hidden sm:block">
                <ButtonLink to="/cotizacion" variant={lightText ? 'outline-light' : 'primary'}>
                  Solicitar cotización
                </ButtonLink>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="menu-movil"
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                className="relative flex size-11 items-center justify-center rounded-full lg:hidden"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute h-[1.5px] w-6 bg-current"
                  animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute h-[1.5px] w-6 bg-current"
                  animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </div>
          </div>
        </header>

        <MobileMenu open={menuOpen} onNavigate={closeMenu} isActive={isActive} />
      </div>
    </>
  );
}
