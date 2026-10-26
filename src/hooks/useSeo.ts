import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface SeoOptions {
  /** Título de la página. Se completa con el nombre de la marca. */
  title?: string;
  description?: string;
  /** Ruta canónica (ej. "/catalogo"). */
  path: string;
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/** Actualiza title, description, Open Graph, canonical y robots por ruta. */
export function useSeo({ title, description = siteConfig.description, path, noindex = false }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.tagline}`;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    if (siteConfig.url) {
      setMeta('property', 'og:url', `${siteConfig.url}/#${path}`);
      setCanonical(`${siteConfig.url}/#${path}`);
    }
  }, [title, description, path, noindex]);
}
