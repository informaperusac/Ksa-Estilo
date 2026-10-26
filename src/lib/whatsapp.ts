import { siteConfig } from '@/config/site';

export const isWhatsAppConfigured = siteConfig.whatsappNumber !== '';

export const whatsappMessages = {
  general: 'Hola, Ksa Estilo. Me gustaría recibir información sobre sus muebles y servicios de diseño interior.',
  product: (productName: string) =>
    `Hola, Ksa Estilo. Estoy interesado en el producto ${productName}. ¿Podrían brindarme información y una cotización?`,
  service: (serviceName: string) => `Hola, Ksa Estilo. Me gustaría solicitar una cotización para ${serviceName}.`,
};

/**
 * Enlace universal de WhatsApp (funciona en móvil, escritorio y WhatsApp Web).
 * Devuelve null si el número no está configurado, para no generar enlaces incorrectos.
 */
export function buildWhatsAppUrl(message: string): string | null {
  if (!isWhatsAppConfigured) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string | null {
  if (!siteConfig.email) return null;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
