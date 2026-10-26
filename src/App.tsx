import { MotionConfig } from 'motion/react';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';

// El inicio se carga de inmediato; el resto de páginas se divide en bloques bajo demanda.
const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const QuotePage = lazy(() => import('@/pages/QuotePage'));
const LegalPage = lazy(() => import('@/pages/LegalPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      {/* "user": respeta la preferencia de movimiento reducido del sistema */}
      <MotionConfig reducedMotion="user">
        <Layout>
          {(location) => (
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/catalogo/:slug" element={<ProductPage />} />
              <Route path="/cotizacion" element={<QuotePage />} />
              <Route path="/privacidad" element={<LegalPage kind="privacidad" />} />
              <Route path="/terminos" element={<LegalPage kind="terminos" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </Layout>
      </MotionConfig>
    </BrowserRouter>
  );
}
