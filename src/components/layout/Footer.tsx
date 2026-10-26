import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { Logo } from '@/components/brand/Logo';
import { WhatsAppIcon, socialIcons } from '@/components/icons/BrandIcons';
import { ButtonLink } from '@/components/ui/Button';
import { hasContactDetails, siteConfig } from '@/config/site';
import { buildWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

const exploreLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Proyectos', to: '/#proyectos' },
];

const infoLinks = [
  { label: 'Política de privacidad', to: '/privacidad' },
  { label: 'Términos y condiciones', to: '/terminos' },
];

const linkClass = 'transition-colors duration-300 hover:text-ivory';

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="mb-5 font-sans text-[0.8125rem] font-semibold text-walnut-light">{children}</h2>;
}

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(whatsappMessages.general);
  const year = new Date().getFullYear();
  const { developer } = siteConfig;

  return (
    <footer className="bg-charcoal text-[0.9375rem] text-ivory/70">
      <div className="container-page pb-10 pt-20 lg:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-block text-ivory">
              <Logo tone="light" compact />
              <span className="sr-only">, ir al inicio</span>
            </Link>
            <p className="mt-5 max-w-xs">Muebles y Diseño Interior.</p>
            <ButtonLink to="/cotizacion" variant="outline-light" className="mt-8">
              Solicitar cotización
            </ButtonLink>
          </div>

          <nav aria-label="Explorar" className="lg:col-span-2 lg:col-start-6">
            <ColumnTitle>Explorar</ColumnTitle>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <ColumnTitle>Contacto</ColumnTitle>
            <ul className="space-y-3">
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                </li>
              )}
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className={`inline-flex items-center gap-2.5 break-all ${linkClass}`}>
                    <Mail className="size-4 shrink-0" aria-hidden="true" /> {siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.phone && (
                <li>
                  <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                    <Phone className="size-4" aria-hidden="true" /> {siteConfig.phone}
                  </a>
                </li>
              )}
              {!hasContactDetails && (
                <li>
                  <Link to="/cotizacion" className={linkClass}>
                    Formulario de cotización
                  </Link>
                </li>
              )}
            </ul>
            {siteConfig.socialLinks.length > 0 && (
              <ul className="mt-6 flex gap-3" aria-label="Redes sociales">
                {siteConfig.socialLinks.map((social) => {
                  const Icon = socialIcons[social.id];
                  return (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
                      >
                        <Icon className="size-4.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <nav aria-label="Información legal" className="lg:col-span-2">
            <ColumnTitle>Información</ColumnTitle>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ksa Estilo. Todos los derechos reservados.</p>
          <p className="text-ivory/55">
            Desarrollado por{' '}
            {developer.url ? (
              <a
                href={developer.url}
                target="_blank"
                rel="noopener"
                className="font-semibold tracking-[0.12em] text-ivory/80 underline-offset-4 transition-colors hover:text-ivory hover:underline"
              >
                {developer.name}
              </a>
            ) : (
              <span className="font-semibold tracking-[0.12em] text-ivory/80">{developer.name}</span>
            )}
          </p>
        </div>

        {siteConfig.demoMode && (
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ivory/55">
            Sitio demostrativo preparado por ALUQIS para Ksa Estilo. Las fotografías son referencias de Unsplash y los
            productos, servicios y procesos mostrados son propuestas sujetas a confirmación.
          </p>
        )}
      </div>
    </footer>
  );
}
