import type { Service } from '@/types/content';
import { media } from './media';

/**
 * Servicios propuestos para la demostración.
 * Están sujetos a confirmación con Ksa Estilo antes de publicarse.
 */
export const services: Service[] = [
  {
    id: 'svc-01',
    slug: 'diseno-de-interiores',
    title: 'Diseño de interiores',
    summary: 'Propuestas estéticas y funcionales para transformar ambientes.',
    description: 'Definimos estilo, paleta, mobiliario e iluminación para que cada ambiente se sienta coherente y propio.',
    icon: 'interiores',
    image: media['servicio-interiores'],
  },
  {
    id: 'svc-02',
    slug: 'muebles-personalizados',
    title: 'Muebles personalizados',
    summary: 'Soluciones de mobiliario adaptadas a diferentes espacios.',
    description: 'Piezas pensadas a partir de tus medidas, tu forma de usar el espacio y los acabados que prefieres.',
    icon: 'muebles',
    image: media['servicio-muebles'],
  },
  {
    id: 'svc-03',
    slug: 'asesoria-de-decoracion',
    title: 'Asesoría de decoración',
    summary: 'Orientación para seleccionar materiales, colores y mobiliario.',
    description: 'Te acompañamos a elegir texturas, colores y piezas que combinen entre sí antes de invertir.',
    icon: 'asesoria',
    image: media['servicio-asesoria'],
  },
  {
    id: 'svc-04',
    slug: 'optimizacion-de-espacios',
    title: 'Optimización de espacios',
    summary: 'Distribuciones funcionales para aprovechar mejor cada ambiente.',
    description: 'Analizamos circulación, almacenamiento y proporciones para sacar provecho a cada metro.',
    icon: 'optimizacion',
    image: media['servicio-optimizacion'],
  },
  {
    id: 'svc-05',
    slug: 'diseno-residencial',
    title: 'Diseño residencial',
    summary: 'Propuestas para salas, dormitorios, cocinas y otros ambientes.',
    description: 'Proyectos para el hogar, desde un ambiente puntual hasta la propuesta integral de una vivienda.',
    icon: 'residencial',
    image: media['servicio-residencial'],
  },
  {
    id: 'svc-06',
    slug: 'diseno-comercial',
    title: 'Diseño comercial',
    summary: 'Soluciones de mobiliario y ambientación para negocios.',
    description: 'Mobiliario y ambientación para tiendas, oficinas, cafeterías y espacios de atención al público.',
    icon: 'comercial',
    image: media['servicio-comercial'],
  },
];
