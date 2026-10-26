import type { InspirationCategory, InspirationItem } from '@/types/content';
import { media } from './media';

/**
 * Galería de inspiración: referencias visuales y ejemplos conceptuales.
 * NO son proyectos realizados por Ksa Estilo. Reemplázalas por fotografías
 * reales del cliente manteniendo esta misma estructura.
 */
export const inspirationCategories: InspirationCategory[] = [
  { id: 'salas', name: 'Salas modernas' },
  { id: 'dormitorios', name: 'Dormitorios' },
  { id: 'cocinas', name: 'Cocinas' },
  { id: 'oficinas', name: 'Oficinas' },
  { id: 'comerciales', name: 'Espacios comerciales' },
];

export const inspirationItems: InspirationItem[] = [
  { id: 'insp-01', title: 'Sala integrada con muro de madera', categoryId: 'salas', image: media['inspiracion-sala-1'] },
  { id: 'insp-02', title: 'Dormitorio con cabecera tapizada', categoryId: 'dormitorios', image: media['inspiracion-dormitorio-1'] },
  { id: 'insp-03', title: 'Cocina con repisas de madera', categoryId: 'cocinas', image: media['inspiracion-cocina-1'] },
  { id: 'insp-04', title: 'Sala luminosa con listones', categoryId: 'salas', image: media['inspiracion-sala-2'] },
  { id: 'insp-05', title: 'Oficina tipo loft', categoryId: 'oficinas', image: media['inspiracion-oficina-1'] },
  { id: 'insp-06', title: 'Tienda con exhibición de madera', categoryId: 'comerciales', image: media['inspiracion-comercial-1'] },
  { id: 'insp-07', title: 'Sala de luz tenue', categoryId: 'salas', image: media['inspiracion-sala-3'] },
  { id: 'insp-08', title: 'Cocina blanca con isla', categoryId: 'cocinas', image: media['inspiracion-cocina-2'] },
  { id: 'insp-09', title: 'Dormitorio con salida al jardín', categoryId: 'dormitorios', image: media['inspiracion-dormitorio-2'] },
  { id: 'insp-10', title: 'Zona de descanso de oficina', categoryId: 'oficinas', image: media['inspiracion-oficina-2'] },
  { id: 'insp-11', title: 'Espacio abierto con comedor', categoryId: 'salas', image: media['inspiracion-sala-4'] },
  { id: 'insp-12', title: 'Cafetería cálida', categoryId: 'comerciales', image: media['inspiracion-comercial-2'] },
];
