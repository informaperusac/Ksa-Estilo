import { AnimatePresence, motion } from 'motion/react';
import { Suspense, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { SiteStructuredData } from '@/components/seo/SiteStructuredData';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollManager } from './ScrollManager';
import { WhatsAppFloat } from './WhatsAppFloat';

function PageFallback() {
  return (
    <div className="container-page min-h-screen pt-36" aria-busy="true" aria-label="Cargando página">
      <div className="skeleton h-14 w-2/3 max-w-lg rounded-md bg-stone" />
      <div className="skeleton mt-6 h-5 w-full max-w-xl rounded bg-stone" />
    </div>
  );
}

interface LayoutProps {
  /** Recibe la ubicación para que las rutas salientes se mantengan durante la transición. */
  children: (location: ReturnType<typeof useLocation>) => ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <>
      <ScrollManager />
      <SiteStructuredData />
      <Header />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      >
        <motion.main
          key={location.pathname}
          id="contenido"
          tabIndex={-1}
          data-path={location.pathname}
          className="outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Suspense fallback={<PageFallback />}>{children(location)}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
