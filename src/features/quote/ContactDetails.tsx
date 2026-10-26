import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { WhatsAppIcon, socialIcons } from '@/components/icons/BrandIcons';
import { ButtonAnchor } from '@/components/ui/Button';
import { hasContactDetails, siteConfig } from '@/config/site';
import { buildWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-t border-line py-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-walnut-deep">{icon}</span>
      <div className="min-w-0">
        <p className="text-[0.8125rem] font-medium text-muted">{label}</p>
        <div className="mt-0.5 break-words text-[0.9375rem] font-medium">{children}</div>
      </div>
    </li>
  );
}

/** Canales de contacto configurables. Solo se muestra lo que está definido en .env. */
export function ContactDetails() {
  const whatsappUrl = buildWhatsAppUrl(whatsappMessages.general);
  const { email, phone, address, hours, socialLinks, mapEmbedUrl } = siteConfig;

  return (
    <div>
      {whatsappUrl && (
        <ButtonAnchor href={whatsappUrl} target="_blank" rel="noopener noreferrer" size="lg" className="mb-8">
          <WhatsAppIcon className="size-5" /> Escribir por WhatsApp
        </ButtonAnchor>
      )}

      {hasContactDetails ? (
        <ul className="border-b border-line">
          {email && (
            <DetailRow icon={<Mail className="size-4.5" aria-hidden="true" />} label="Correo">
              <a href={`mailto:${email}`} className="underline-offset-4 hover:underline">
                {email}
              </a>
            </DetailRow>
          )}
          {phone && (
            <DetailRow icon={<Phone className="size-4.5" aria-hidden="true" />} label="Teléfono">
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="underline-offset-4 hover:underline">
                {phone}
              </a>
            </DetailRow>
          )}
          {address && (
            <DetailRow icon={<MapPin className="size-4.5" aria-hidden="true" />} label="Dirección comercial">
              {address}
            </DetailRow>
          )}
          {hours.length > 0 && (
            <DetailRow icon={<Clock className="size-4.5" aria-hidden="true" />} label="Horario de atención">
              {hours.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </DetailRow>
          )}
          {socialLinks.length > 0 && (
            <li className="flex flex-wrap items-center gap-3 border-t border-line py-5">
              <span className="mr-2 text-[0.8125rem] font-medium text-muted">Síguenos</span>
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                  >
                    <Icon className="size-4.5" />
                  </a>
                );
              })}
            </li>
          )}
        </ul>
      ) : (
        siteConfig.demoMode && (
          <div className="rounded-2xl border border-dashed border-walnut/40 bg-linen/60 p-6">
            <p className="font-display text-2xl leading-tight">Datos de contacto por confirmar</p>
            <p className="mt-2 text-[0.9375rem] text-muted">
              WhatsApp, correo, dirección, horarios y redes sociales aparecerán aquí cuando Ksa Estilo los confirme.
              Mientras tanto, el formulario prepara tu solicitud para que puedas copiarla.
            </p>
          </div>
        )
      )}

      {mapEmbedUrl && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <iframe
            src={mapEmbedUrl}
            title={`Mapa de ubicación: ${address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full grayscale-[35%]"
          />
        </div>
      )}
    </div>
  );
}
