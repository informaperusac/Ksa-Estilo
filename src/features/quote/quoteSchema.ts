import { z } from 'zod';
import { services } from '@/data/services';

export const CATALOG_SERVICE = 'Compra de un mueble del catálogo';

export const serviceOptions = [...services.map((service) => service.title), CATALOG_SERVICE, 'Otro'];

export const roomOptions = ['Sala', 'Dormitorio', 'Comedor', 'Cocina', 'Oficina', 'Espacio comercial', 'Otro'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

/** Fecha local de hoy en formato AAAA-MM-DD (para el mínimo del campo fecha). */
export function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Ingresa tu nombre completo.')
    .max(80, 'Usa como máximo 80 caracteres.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Ingresa tu número de teléfono.')
    .refine((value) => {
      const digits = value.replace(/\D/g, '');
      return PHONE_PATTERN.test(value) && digits.length >= 7 && digits.length <= 15;
    }, 'Ingresa un teléfono válido: solo números, entre 7 y 15 dígitos.'),
  email: z
    .string()
    .trim()
    .min(1, 'Ingresa tu correo electrónico.')
    .regex(EMAIL_PATTERN, 'Ingresa un correo válido, por ejemplo nombre@correo.com.'),
  service: z.string().min(1, 'Selecciona el tipo de servicio.'),
  room: z.string().min(1, 'Selecciona el tipo de ambiente.'),
  description: z
    .string()
    .trim()
    .min(20, 'Cuéntanos un poco más sobre tu proyecto (mínimo 20 caracteres).')
    .max(1000, 'Usa como máximo 1000 caracteres.'),
  budget: z.string().trim().max(60, 'Usa como máximo 60 caracteres.'),
  city: z.string().trim().min(2, 'Ingresa tu ciudad.').max(60, 'Usa como máximo 60 caracteres.'),
  estimatedDate: z.string().refine((value) => value === '' || value >= todayIso(), 'Elige una fecha a partir de hoy.'),
  consent: z.boolean().refine((value) => value, 'Necesitamos tu autorización para preparar la solicitud.'),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
