import { Link, useSearchParams } from 'react-router';
import { SmartImage } from '@/components/ui/SmartImage';
import { getCategoryName } from '@/data/categories';
import { services } from '@/data/services';
import { ContactDetails } from '@/features/quote/ContactDetails';
import { QuoteForm, type QuoteDefaults } from '@/features/quote/QuoteForm';
import { CATALOG_SERVICE } from '@/features/quote/quoteSchema';
import { useProduct } from '@/hooks/useProducts';
import { useSeo } from '@/hooks/useSeo';

/** Ambiente sugerido según la categoría del producto consultado. */
const roomByCategory: Record<string, string> = {
  salas: 'Sala',
  dormitorios: 'Dormitorio',
  comedores: 'Comedor',
  cocina: 'Cocina',
  oficina: 'Oficina',
};

export default function QuotePage() {
  const [params] = useSearchParams();
  const service = services.find((item) => item.slug === params.get('servicio'));
  const productState = useProduct(params.get('producto'));
  const product = productState.status === 'ready' ? productState.product : null;

  useSeo({
    title: 'Solicitar cotización',
    description: 'Solicita una cotización de muebles o diseño interior a Ksa Estilo. Prepara tu mensaje y envíalo por WhatsApp.',
    path: '/cotizacion',
  });

  const defaults: QuoteDefaults = product
    ? {
        service: CATALOG_SERVICE,
        room: roomByCategory[product.categoryId] ?? '',
        description: `Me interesa el producto ${product.name}. `,
      }
    : service
      ? { service: service.title }
      : {};

  const cover = product?.images[0];

  return (
    <div className="pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h1 className="text-display">Solicita tu cotización</h1>
          <p className="mt-6 max-w-md text-lead text-muted">
            Completa tus datos y los detalles del espacio. Prepararemos un mensaje ordenado para que lo envíes por
            WhatsApp en un solo paso.
          </p>
          <div className="mt-10">
            <ContactDetails />
          </div>
        </div>

        <div className="lg:col-span-7">
          {product && cover && (
            <div className="mb-6 flex items-center gap-5 rounded-2xl border border-line bg-ivory p-4 pr-6">
              <SmartImage image={cover} sizes="96px" className="arch aspect-[4/5] w-20 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] font-medium text-olive-deep">Pieza seleccionada de {getCategoryName(product.categoryId).toLowerCase()}</p>
                <p className="mt-1 truncate font-display text-2xl leading-tight">{product.name}</p>
              </div>
              <Link to="/catalogo" className="shrink-0 text-[0.875rem] font-semibold text-walnut-deep underline-offset-4 hover:underline">
                Cambiar
              </Link>
            </div>
          )}
          <QuoteForm key={product?.id ?? service?.id ?? 'general'} defaults={defaults} headingLevel="h2" />
        </div>
      </div>
    </div>
  );
}
