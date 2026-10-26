import { formatIsoDate } from '@/lib/text';
import type { QuoteRequest } from '@/types/quote';

/**
 * Cotizaciones. En esta versión no existe backend: la solicitud se convierte en
 * un mensaje estructurado para WhatsApp y no se almacena en ningún lugar.
 * Con la API del ERP bastará con enviar el mismo QuoteRequest a POST /quotes.
 */
export const quoteService = {
  buildMessage(data: QuoteRequest): string {
    const lines = [
      'Hola, Ksa Estilo. Quisiera solicitar una cotización.',
      '',
      '*Datos de contacto*',
      `Nombre: ${data.fullName}`,
      `Teléfono: ${data.phone}`,
      `Correo: ${data.email}`,
      `Ciudad: ${data.city}`,
      '',
      '*Proyecto*',
      `Servicio: ${data.service}`,
      `Ambiente: ${data.room}`,
    ];
    if (data.budget) lines.push(`Presupuesto aproximado: ${data.budget}`);
    if (data.estimatedDate) lines.push(`Fecha estimada: ${formatIsoDate(data.estimatedDate)}`);
    lines.push('', '*Descripción*', data.description);
    return lines.join('\n');
  },
};
