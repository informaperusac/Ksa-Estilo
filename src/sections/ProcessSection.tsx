import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { DemoNote } from '@/components/ui/DemoNote';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/site-content';

/** Línea de tiempo que se completa a medida que avanza el scroll. */
export function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section aria-labelledby="proceso-title" className="section-y bg-charcoal text-ivory">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 id="proceso-title" className="text-display">
              De tu idea al espacio ideal
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-ivory/70">Un recorrido claro, desde la primera conversación hasta la entrega de tu espacio.</p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative mt-16 grid gap-12 pl-12 lg:mt-24 lg:grid-cols-5 lg:gap-8 lg:pl-0 lg:pt-14">
          {/* Línea vertical (móvil) y horizontal (escritorio) */}
          <span aria-hidden="true" className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-ivory/15 lg:hidden">
            <motion.span className="absolute inset-0 origin-top bg-walnut-light" style={{ scaleY: progress }} />
          </span>
          <span aria-hidden="true" className="absolute inset-x-0 top-[0.6875rem] hidden h-px bg-ivory/15 lg:block">
            <motion.span className="absolute inset-0 origin-left bg-walnut-light" style={{ scaleX: progress }} />
          </span>

          {processSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-12 top-1 flex size-[1.4rem] items-center justify-center rounded-full border border-walnut-light bg-charcoal lg:-top-14 lg:left-0"
              >
                <span className="size-1.5 rounded-full bg-walnut-light" />
              </span>
              <Reveal delay={index * 0.08} y={20}>
                <p className="font-display text-[3.25rem] font-light leading-none text-walnut-light lining-nums">
                  {String(index + 1).padStart(2, '0')}
                  <span className="sr-only">.</span>
                </p>
                <h3 className="mt-4 text-[1.6rem] leading-tight">{step.title}</h3>
                <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-ivory/65">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <DemoNote tone="light" className="mt-16">
          Proceso ilustrativo para la demostración. Las etapas definitivas se validarán con Ksa Estilo.
        </DemoNote>
      </div>
    </section>
  );
}
