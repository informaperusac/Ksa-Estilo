import type { ProductCategory } from '../types/catalog';

/**
 * Categorías propuestas para la demostración. Edita, agrega o elimina libremente:
 * el filtro del catálogo se construye a partir de esta lista.
 */
export const categories: ProductCategory[] = [
  { id: 'salas', name: 'Salas', description: 'Sofás, mesas de centro y muebles de entretenimiento.' },
  { id: 'dormitorios', name: 'Dormitorios', description: 'Camas, clósets y cómodas para descansar mejor.' },
  { id: 'comedores', name: 'Comedores', description: 'Mesas y sillas para compartir en familia.' },
  { id: 'cocina', name: 'Muebles de cocina', description: 'Muebles altos, bajos e islas de cocina.' },
  { id: 'oficina', name: 'Muebles de oficina', description: 'Escritorios y mobiliario para trabajar con orden.' },
  { id: 'personalizados', name: 'Muebles personalizados', description: 'Piezas diseñadas a la medida de cada espacio.' },
];

export function getCategoryName(id: string): string {
  return categories.find((category) => category.id === id)?.name ?? 'Mobiliario';
}
