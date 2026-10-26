import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { ButtonLink } from '@/components/ui/Button';
import { EASE_SOFT } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { media } from '@/data/media';

const headline = ['Espacios que inspiran.', 'Diseños que enamoran.'];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-12%']);
  const hero = media['hero-sala'];

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-ivory"
    >
      {/* Fotografía con parallax sutil */}
      <motion.div className="absolute inset-0 -z-20" style={reduceMotion ? undefined : { y: imageY }}>
        <motion.img
          src={hero.src}
          srcSet={hero.srcSet}
          sizes="100vw"
          width={hero.width}
          height={hero.height}
          alt={hero.alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_60%]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE_SOFT }}
        />
      </motion.div>

      {/* Overlay para legibilidad: oscurece base e izquierda sin apagar la luz de la escena */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal/90 via-charcoal/35 to-charcoal/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-charcoal/55 via-charcoal/10 to-transparent" />

      <motion.div
        className="container-page pb-28 pt-36 sm:pb-32 lg:pb-36"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <h1 id="hero-title" className="font-display text-hero font-light">
          {headline.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, ease: EASE_SOFT, delay: 0.25 + index * 0.16 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-[34rem] text-lead text-ivory/85"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_SOFT, delay: 0.8 }}
        >
          Transformamos tus ideas en ambientes únicos, combinando diseño, funcionalidad y estilo para cada espacio.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_SOFT, delay: 0.95 }}
        >
          <ButtonLink to="/catalogo" variant="light" size="lg">
            Explorar colección
          </ButtonLink>
          <ButtonLink to="/cotizacion?servicio=asesoria-de-decoracion" variant="outline-light" size="lg">
            Solicitar asesoría
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll y crédito de imagen */}
      <motion.div
        className="container-page absolute inset-x-0 bottom-0 flex items-end justify-between pb-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <Link to="/#nosotros" className="group flex items-center gap-3 text-[0.8125rem] font-medium text-ivory/75 transition-colors hover:text-ivory">
          <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-ivory/20">
            <span className="absolute inset-0 animate-scroll-cue bg-ivory" />
          </span>
          Descubre más
        </Link>
        {/* Margen derecho para no quedar bajo el botón flotante de WhatsApp */}
        {siteConfig.demoMode && <p className="mr-20 hidden text-xs text-ivory/60 sm:block">Imagen referencial</p>}
      </motion.div>
    </section>
  );
}
