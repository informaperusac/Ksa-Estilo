import { siteConfig } from '@/config/site';
import { JsonLd } from './JsonLd';

/**
 * Datos estructurados de la marca. Solo incluye información configurada:
 * sin reseñas, calificaciones, precios ni datos comerciales inventados.
 * Si hay dirección se declara como tienda de muebles (LocalBusiness);
 * de lo contrario, como organización.
 */
export function SiteStructuredData() {
  const { url, email, phone, address, socialLinks } = siteConfig;

  const business: Record<string, unknown> = {
    '@type': address ? 'FurnitureStore' : 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    ...(url && { url, image: `${url}/og-image.jpg` }),
    ...(email && { email }),
    ...(phone && { telephone: phone }),
    ...(address && { address: { '@type': 'PostalAddress', streetAddress: address, addressCountry: 'PE' } }),
    ...(socialLinks.length > 0 && { sameAs: socialLinks.map((link) => link.url) }),
  };

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    name: siteConfig.name,
    inLanguage: siteConfig.locale,
    ...(url && { url }),
  };

  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': [business, website] }} />;
}
