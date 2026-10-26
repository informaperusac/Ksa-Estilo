import type { ImageAsset } from './media';

export type ServiceIcon = 'interiores' | 'muebles' | 'asesoria' | 'optimizacion' | 'residencial' | 'comercial';

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: ServiceIcon;
  image: ImageAsset;
}

export interface InspirationCategory {
  id: string;
  name: string;
}

export interface InspirationItem {
  id: string;
  title: string;
  categoryId: InspirationCategory['id'];
  image: ImageAsset;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  /** Ruta de destino. Las secciones del inicio usan "/#id". */
  to: string;
  /** id de la sección del inicio que activa este enlace. */
  sectionId: string;
}
