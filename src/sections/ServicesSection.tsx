import { Hammer, House, LayoutGrid, Palette, PencilRuler, Store, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { DemoNote } from '@/components/ui/DemoNote';
import { InquiryLink } from '@/components/ui/InquiryLink';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { services } from '@/data/services';
import { cn } from '@/lib/cn';
import { whatsappMessages } from '@/lib/whatsapp';
import type { ServiceIcon } from '@/types/content';

const icons: Record<ServiceIcon, LucideIcon> = {
  interiores: PencilRuler,
  muebles: Hammer,
  asesoria: Palette,
  optimizacion: LayoutGrid,
  residencial: House,
  comercial: Store,
};

/**
 * Índice de servicios: en escritorio, la fotografía del servicio activo acompaña
 * la lectura desde una columna fija; en móvil cada servicio muestra su imagen.
 */
export function ServicesSection() {
  const [activeId, setActiveId] = useState(services[0]?.id ?? '');
  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 id="servicios-title" className="text-display">
                Servicios de diseño interior
              </h2>
              <p className="mt-6 max-w-md text-lead text-muted">
                Acompañamiento para elegir, diseñar y amoblar cada ambiente, desde una pieza puntual hasta un espacio
                completo.
              </p>
            </Reveal>

            {active && (
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl bg-stone lg:block">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SmartImage image={active.image} sizes="40vw" className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            <DemoNote className="mt-6">Servicios propuestos para la demostración, sujetos a confirmación con Ksa Estilo.</DemoNote>
          </div>
        </div>

        <ul className="lg:col-span-6 lg:col-start-7">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const isActive = service.id === activeId;
            return (
              <li key={service.id}>
                <Reveal delay={index * 0.05} y={20}>
                  <div
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocusCapture={() => setActiveId(service.id)}
                    className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-t border-line py-8 sm:gap-x-7 lg:py-9"
                  >
                    <span
                      className={cn(
                        'flex size-12 items-center justify-center rounded-full border transition-colors duration-500',
                        isActive ? 'border-charcoal bg-charcoal text-ivory' : 'border-line text-walnut-deep',
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <h3
                        className={cn(
                          'text-title transition-[color,transform] duration-500 ease-soft',
                          isActive ? 'text-charcoal lg:translate-x-1' : 'text-charcoal/80',
                        )}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-muted">
                        {service.summary} {service.description}
                      </p>
                      <SmartImage
                        image={service.image}
                        sizes="(min-width: 640px) 70vw, 85vw"
                        className="mt-6 aspect-[16/10] rounded-xl lg:hidden"
                      />
                      <InquiryLink
                        message={whatsappMessages.service(service.title)}
                        fallbackTo={`/cotizacion?servicio=${service.slug}`}
                        className="mt-5 inline-flex min-h-10 items-center text-[0.875rem] font-semibold text-walnut-deep underline decoration-walnut/30 underline-offset-[6px] transition-colors hover:text-charcoal hover:decoration-charcoal"
                      >
                        Cotizar {service.title.toLowerCase()}
                      </InquiryLink>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
