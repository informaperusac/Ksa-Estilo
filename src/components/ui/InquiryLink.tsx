import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface InquiryLinkProps {
  /** Mensaje prellenado para WhatsApp. */
  message: string;
  /** Ruta interna usada cuando WhatsApp no está configurado. */
  fallbackTo: string;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/**
 * Abre WhatsApp con un mensaje personalizado. Si el número no está configurado,
 * lleva al formulario de cotización en lugar de generar un enlace incorrecto.
 */
export function InquiryLink({ message, fallbackTo, className, children, ...rest }: InquiryLinkProps) {
  const url = buildWhatsAppUrl(message);
  if (!url) {
    return (
      <Link to={fallbackTo} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}
