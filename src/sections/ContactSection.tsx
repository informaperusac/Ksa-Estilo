import { lazy, Suspense } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { ContactDetails } from '@/features/quote/ContactDetails';

// El formulario (y sus validaciones) se descarga aparte: está al final de la página.
const QuoteForm = lazy(() => import('@/features/quote/QuoteForm').then((module) => ({ default: module.QuoteForm })));

function QuoteFormSkeleton() {
  return (
    <div className="rounded-3xl border border-line bg-ivory p-6 sm:p-10" aria-busy="true" aria-label="Cargando formulario">
      <div className="skeleton h-9 w-2/3 rounded bg-stone" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="skeleton h-12 rounded-lg bg-stone" />
        ))}
      </div>
      <div className="skeleton mt-6 h-32 rounded-lg bg-stone" />
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-y bg-stone/60">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="contacto-title" className="text-display">
              Conversemos sobre tu espacio
            </h2>
            <p className="mt-6 max-w-md text-lead text-muted">
              Cuéntanos qué ambiente quieres transformar. Con tus respuestas preparamos un mensaje ordenado, listo para
              enviar por WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ContactDetails />
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-7">
          <Suspense fallback={<QuoteFormSkeleton />}>
            <QuoteForm />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
