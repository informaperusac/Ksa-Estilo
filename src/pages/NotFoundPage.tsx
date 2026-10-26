import { ButtonLink } from '@/components/ui/Button';
import { useSeo } from '@/hooks/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Página no encontrada', path: '/404', noindex: true });

  return (
    <div className="container-page flex min-h-[80svh] flex-col items-start justify-center pb-24 pt-36">
      <p className="font-display text-[6rem] font-light leading-none text-walnut lining-nums sm:text-[9rem]">404</p>
      <h1 className="mt-4 text-display">Esta página no existe</h1>
      <p className="mt-6 max-w-lg text-lead text-muted">
        Es posible que el enlace haya cambiado o que la pieza ya no esté en el catálogo. Puedes volver al inicio o
        explorar las piezas disponibles.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to="/" size="lg">
          Volver al inicio
        </ButtonLink>
        <ButtonLink to="/catalogo" variant="outline" size="lg">
          Ver catálogo
        </ButtonLink>
      </div>
    </div>
  );
}
