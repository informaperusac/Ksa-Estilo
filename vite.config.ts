import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';
// Extensión explícita: requerida por el cargador nativo de configuración de Vite.
import { products } from './src/data/products.ts';

/**
 * SEO en tiempo de compilación:
 * - Inserta en index.html las etiquetas que requieren URL absoluta (canonical, og:url, og:image).
 * - Genera robots.txt y sitemap.xml a partir de las rutas y del catálogo.
 * Ambos dependen de VITE_SITE_URL; si no está definida, se omiten las URL absolutas.
 */
function seoPlugin(siteUrl: string): Plugin {
  const indexable = ['/', '/catalogo', '/cotizacion', ...products.map((p) => `/catalogo/${p.slug}`)];

  return {
    name: 'ksa-seo',
    transformIndexHtml() {
      const ogImage = `${siteUrl}/og-image.jpg`;
      const tags: HtmlTagDescriptor[] = [
        { tag: 'meta', attrs: { property: 'og:image', content: ogImage }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: ogImage }, injectTo: 'head' },
      ];
      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
        );
      }
      return tags;
    },
    generateBundle() {
      // Las páginas legales usan <meta name="robots" content="noindex">: deben poder rastrearse.
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });

      if (!siteUrl) {
        this.warn('VITE_SITE_URL no está definida: se omite sitemap.xml. Configúrala antes de publicar.');
        return;
      }
      const today = new Date().toISOString().slice(0, 10);
      const urls = indexable
        .map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      rolldownOptions: {
        output: {
          // Librerías en bloques separados: se cachean entre despliegues y se cargan en paralelo.
          codeSplitting: {
            groups: [
              { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/, priority: 3 },
              { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/, priority: 2 },
              { name: 'forms', test: /node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/, priority: 2 },
            ],
          },
        },
      },
    },
  };
});
