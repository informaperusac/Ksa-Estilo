import { Link } from 'react-router';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { InquiryLink } from '@/components/ui/InquiryLink';
import { SmartImage } from '@/components/ui/SmartImage';
import { getCategoryName } from '@/data/categories';
import { isWhatsAppConfigured, whatsappMessages } from '@/lib/whatsapp';
import type { Product } from '@/types/catalog';

interface ProductCardProps {
  product: Product;
  /** Nivel del encabezado según la jerarquía de la página. */
  headingLevel?: 'h2' | 'h3';
}

export function ProductCard({ product, headingLevel: Heading = 'h3' }: ProductCardProps) {
  const [cover] = product.images;
  const detailPath = `/catalogo/${product.slug}`;
  const quotePath = `/cotizacion?producto=${product.slug}`;

  return (
    <article className="group flex h-full flex-col">
      <Link to={detailPath} className="block rounded-t-full focus-visible:outline-offset-4">
        <div className="arch relative aspect-[4/5] overflow-hidden bg-stone">
          {cover && (
            <SmartImage
              image={cover}
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 31vw, 47vw"
              className="h-full w-full"
              imgClassName="group-hover:scale-[1.05]"
            />
          )}
          <span className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 translate-y-2 rounded-full bg-ivory/95 px-4 py-2 text-[0.8125rem] font-semibold text-charcoal opacity-0 shadow-sm transition duration-500 ease-soft group-hover:translate-y-0 group-hover:opacity-100 md:block">
            Ver detalles
          </span>
        </div>
        <p className="mt-5 text-[0.8125rem] font-medium text-olive-deep">{getCategoryName(product.categoryId)}</p>
        <Heading className="mt-1 font-display text-[1.4rem] leading-[1.1] transition-colors duration-300 group-hover:text-walnut-deep sm:text-[1.65rem]">
          {product.name}
        </Heading>
      </Link>

      <p className="mt-2 hidden text-[0.9375rem] leading-relaxed text-muted sm:line-clamp-2">{product.summary}</p>

      {/* mt-auto alinea las acciones entre tarjetas; pt-5 garantiza aire bajo textos largos */}
      <div className="mt-auto pt-5">
        <div className="flex flex-col items-start gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <InquiryLink
            message={whatsappMessages.product(product.name)}
            fallbackTo={quotePath}
            aria-label={`Consultar precio de ${product.name}`}
            className="inline-flex min-h-10 items-center gap-2 text-[0.875rem] font-semibold text-walnut-deep transition-colors hover:text-charcoal"
          >
            {isWhatsAppConfigured && <WhatsAppIcon className="size-4" />}
            Consultar precio
          </InquiryLink>
          {isWhatsAppConfigured && (
            <Link
              to={quotePath}
              className="text-[0.8125rem] font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-charcoal hover:decoration-charcoal"
            >
              Cotizar
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
