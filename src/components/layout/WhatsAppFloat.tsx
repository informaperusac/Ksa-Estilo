import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { EASE_SOFT } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

const bubbleClass =
  'group relative flex size-14 items-center justify-center rounded-full bg-charcoal text-ivory shadow-[0_14px_34px_-12px_rgb(34_34_34/0.6)] transition-colors duration-300 hover:bg-olive-deep';

/**
 * Botón flotante de WhatsApp visible en todas las páginas. Si el número no está
 * configurado, muestra una alternativa de contacto en lugar de un enlace roto.
 */
export function WhatsAppFloat() {
  const url = buildWhatsAppUrl(whatsappMessages.general);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <motion.div
      ref={wrapperRef}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 sm:bottom-8 sm:right-8"
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_SOFT, delay: 1.4 }}
    >
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Ksa Estilo por WhatsApp" className={bubbleClass}>
          <span aria-hidden="true" className="absolute inset-0 animate-soft-ring rounded-full border border-charcoal" />
          <WhatsAppIcon className="size-6" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap rounded-full bg-charcoal px-4 py-2 text-[0.8125rem] font-medium opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
          >
            Escríbenos por WhatsApp
          </span>
        </a>
      ) : (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                id="whatsapp-alternativa"
                role="dialog"
                aria-label="Contacto por WhatsApp no disponible"
                className="absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-ivory p-6 text-charcoal shadow-[0_24px_60px_-24px_rgb(34_34_34/0.45)]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-display text-2xl leading-tight">WhatsApp aún no está configurado</p>
                <p className="mt-2 text-sm text-muted">
                  Mientras tanto, completa el formulario de cotización: preparamos tu solicitud para que puedas copiarla
                  {siteConfig.email ? ' o enviarla por correo.' : '.'}
                </p>
                <div className="mt-5 flex flex-col gap-2 text-sm font-semibold">
                  <Link to="/cotizacion" onClick={() => setOpen(false)} className="text-walnut-deep underline-offset-4 hover:underline">
                    Ir al formulario de cotización
                  </Link>
                  {siteConfig.email && (
                    <a href={`mailto:${siteConfig.email}`} className="text-walnut-deep underline-offset-4 hover:underline">
                      Escribir a {siteConfig.email}
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="whatsapp-alternativa"
            aria-label={open ? 'Cerrar opciones de contacto' : 'Contactar a Ksa Estilo'}
            className={bubbleClass}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <WhatsAppIcon className="size-6" />}
          </button>
        </>
      )}
    </motion.div>
  );
}
