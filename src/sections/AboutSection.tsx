import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { media } from '@/data/media';
import { brandPrinciples } from '@/data/site-content';

export function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="section-y overflow-hidden">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <div ref={imageRef} className="arch relative mx-auto aspect-[3/4] max-w-md overflow-hidden bg-stone lg:max-w-none">
            <motion.div className="absolute -inset-y-[8%] inset-x-0" style={reduceMotion ? undefined : { y }}>
              <SmartImage image={media['nosotros-detalle']} sizes="(min-width: 1024px) 40vw, 90vw" className="h-full w-full" />
            </motion.div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 id="nosotros-title" className="text-display">
              Diseñamos espacios para vivir mejor
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lead text-charcoal/85">
              En Ksa Estilo creemos que cada espacio tiene el potencial de convertirse en algo extraordinario. Nuestra
              propuesta combina mobiliario, diseño y atención al detalle para crear ambientes funcionales y llenos de
              personalidad.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {brandPrinciples.map((principle) => (
                <li key={principle.title} className="border-t border-charcoal/20 pt-5">
                  <h3 className="text-[1.5rem] leading-tight">{principle.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <ButtonLink to="/#servicios" variant="outline" size="lg" className="mt-12">
              Conoce nuestra propuesta
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
