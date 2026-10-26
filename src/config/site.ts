/**
 * Configuración comercial del sitio. Todos los datos de contacto provienen de
 * variables de entorno (ver .env.example): nada se inventa ni se fija en el código.
 */
const env = import.meta.env;

const text = (value: string | undefined) => (value ?? '').trim();

/** Acepta solo URL http(s) para evitar enlaces inválidos o inseguros. */
const safeUrl = (value: string | undefined) => {
  const url = text(value);
  return /^https?:\/\/[^\s]+$/i.test(url) ? url : '';
};

const whatsappDigits = text(env.VITE_WHATSAPP_NUMBER).replace(/\D/g, '');

export type SocialNetwork = 'instagram' | 'facebook' | 'tiktok' | 'pinterest';

const socialLinks = (
  [
    { id: 'instagram', label: 'Instagram', url: safeUrl(env.VITE_INSTAGRAM_URL) },
    { id: 'facebook', label: 'Facebook', url: safeUrl(env.VITE_FACEBOOK_URL) },
    { id: 'tiktok', label: 'TikTok', url: safeUrl(env.VITE_TIKTOK_URL) },
    { id: 'pinterest', label: 'Pinterest', url: safeUrl(env.VITE_PINTEREST_URL) },
  ] satisfies { id: SocialNetwork; label: string; url: string }[]
).filter((link) => link.url !== '');

const mapEmbedUrl = safeUrl(env.VITE_MAP_EMBED_URL);
const address = text(env.VITE_ADDRESS);
const email = text(env.VITE_CONTACT_EMAIL);

export const siteConfig = {
  name: 'Ksa Estilo',
  tagline: 'Muebles & Diseño Interior',
  description:
    'Ksa Estilo: muebles y diseño interior. Explora piezas para sala, dormitorio, comedor, cocina y oficina, y solicita una cotización por WhatsApp.',
  url: safeUrl(env.VITE_SITE_URL).replace(/\/+$/, ''),
  locale: 'es-PE',

  /** Solo dígitos en formato internacional. Vacío si no está configurado o es inválido. */
  whatsappNumber: whatsappDigits.length >= 8 && whatsappDigits.length <= 15 ? whatsappDigits : '',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '',
  phone: text(env.VITE_CONTACT_PHONE),
  address,
  hours: text(env.VITE_BUSINESS_HOURS)
    .split('|')
    .map((line) => line.trim())
    .filter(Boolean),
  /** El mapa solo se muestra si existe una dirección real y una URL de Google Maps. */
  mapEmbedUrl: address && mapEmbedUrl.startsWith('https://www.google.com/maps/embed') ? mapEmbedUrl : '',
  socialLinks,

  developer: {
    name: 'ALUQIS',
    url: safeUrl(env.VITE_ALUQIS_URL),
  },

  /** Muestra avisos de contenido demostrativo. Desactivar con VITE_DEMO_MODE=false. */
  demoMode: text(env.VITE_DEMO_MODE).toLowerCase() !== 'false',

  /** URL base de la futura API REST. Vacía = se usan los datos locales. */
  apiUrl: safeUrl(env.VITE_API_URL).replace(/\/+$/, ''),
} as const;

export const hasContactDetails =
  Boolean(siteConfig.whatsappNumber || siteConfig.email || siteConfig.phone || siteConfig.address) ||
  siteConfig.hours.length > 0 ||
  siteConfig.socialLinks.length > 0;
