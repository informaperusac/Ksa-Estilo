import { ChevronRight, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, buttonStyles } from '@/components/ui/Button';
import { DemoNote } from '@/components/ui/DemoNote';
import { InquiryLink } from '@/components/ui/InquiryLink';
import { siteConfig } from '@/config/site';
import { getCategoryName } from '@/data/categories';
import { ProductGallery } from '@/features/catalog/ProductGallery';
import { ProductGrid } from '@/features/catalog/ProductGrid';
import { useProduct } from '@/hooks/useProducts';
import { useSeo } from '@/hooks/useSeo';
import { isWhatsAppConfigured, whatsappMessages } from '@/lib/whatsapp';
import { catalogService } from '@/services/catalog.service';
import NotFoundPage from './NotFoundPage';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const state = useProduct(slug);
  const product = state.status === 'ready' ? state.product : null;

  useSeo({
    title: product?.name ?? 'Catálogo',
    description: product ? `${product.summary} Consulta precio y disponibilidad con Ksa Estilo.` : undefined,
    path: `/catalogo/${slug}`,
    noindex: state.status === 'missing',
  });

  if (state.status === 'missing') return <NotFoundPage />;

  if (!product) {
    return (
      <div className="container-page grid gap-12 pb-24 pt-32 lg:grid-cols-12 lg:pt-40" aria-busy="true" aria-label="Cargando producto">
        <div className="arch skeleton aspect-[4/5] bg-stone lg:col-span-7" />
        <div className="lg:col-span-5">
          <div className="skeleton h-4 w-24 rounded bg-stone" />
          <div className="skeleton mt-4 h-14 w-4/5 rounded bg-stone" />
          <div className="skeleton mt-8 h-24 w-full rounded bg-stone" />
        </div>
      </div>
    );
  }

  const categoryName = getCategoryName(product.categoryId);
  const related = catalogService.getRelated(product, 4);
  const quotePath = `/cotizacion?producto=${product.slug}`;

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      {siteConfig.url && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
              { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${siteConfig.url}/catalogo` },
              { '@type': 'ListItem', position: 3, name: product.name, item: `${siteConfig.url}/catalogo/${product.slug}` },
            ],
          }}
        />
      )}

      <div className="container-page">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-muted">
            <li>
              <Link to="/" className="hover:text-charcoal">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link to="/catalogo" className="hover:text-charcoal">
                Catálogo
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link to={`/catalogo?categoria=${product.categoryId}`} className="hover:text-charcoal">
                {categoryName}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-charcoal">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.875rem] font-medium text-olive-deep">{categoryName}</p>
              <h1 className="mt-3 text-display">{product.name}</h1>
              <p className="mt-6 text-lead text-charcoal/85">{product.summary}</p>
              <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

              <h2 className="mt-10 font-sans text-[0.875rem] font-semibold">Características de referencia</h2>
              <ul className="mt-4 space-y-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[0.9375rem] text-charcoal/85">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-walnut" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 font-sans text-[0.875rem] font-semibold">Materiales sugeridos</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <li key={material} className="rounded-full border border-line px-3.5 py-1.5 text-[0.8125rem]">
                    {material}
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-line bg-ivory p-6">
                <p className="text-[0.8125rem] font-medium text-muted">Precio</p>
                <p className="mt-1 font-display text-[2rem] leading-none">Consultar precio</p>
                <p className="mt-3 text-[0.875rem] text-muted">Medidas, acabados y disponibilidad se confirman en cada cotización.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <InquiryLink
                    message={whatsappMessages.product(product.name)}
                    fallbackTo={quotePath}
                    className={buttonStyles('primary', 'lg', 'flex-1')}
                  >
                    {isWhatsAppConfigured ? <WhatsAppIcon className="size-5" /> : <MessageCircle className="size-5" aria-hidden="true" />}
                    {isWhatsAppConfigured ? 'Consultar por WhatsApp' : 'Consultar precio'}
                  </InquiryLink>
                  {isWhatsAppConfigured && (
                    <ButtonLink to={quotePath} variant="outline" size="lg" className="flex-1">
                      Solicitar cotización
                    </ButtonLink>
                  )}
                </div>
              </div>

              <DemoNote className="mt-6">
                Pieza de referencia para la demostración. No representa inventario disponible de Ksa Estilo.
              </DemoNote>
            </div>
          </div>
        </div>

        <section aria-labelledby="relacionados-title" className="mt-28 border-t border-line pt-16 lg:mt-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="relacionados-title" className="text-title">
              También podría interesarte
            </h2>
            <ButtonLink to="/catalogo" variant="outline">
              Ver catálogo
            </ButtonLink>
          </div>
          <ProductGrid products={related} className="mt-10" />
        </section>
      </div>
    </div>
  );
}
