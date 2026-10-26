// Rutas relativas con extensión: este archivo también lo lee vite.config.ts (sitemap).
import type { Product } from '../types/catalog.ts';
import { media } from './media.ts';

/**
 * PRODUCTOS DEMOSTRATIVOS
 * ──────────────────────
 * Piezas de referencia para la presentación comercial. No representan inventario
 * real de Ksa Estilo ni incluyen precios. Para cargar productos reales:
 *   1. Agrega las fotos en public/images/ y regístralas en src/data/media.ts.
 *   2. Reemplaza los objetos de esta lista (mantén el "slug" único y en minúsculas).
 *   3. Usa en "categoryId" un id existente en src/data/categories.ts.
 * Cuando exista la API del ERP, esta lista se sustituye por GET /products
 * (ver src/services/catalog.service.ts).
 */
export const products: Product[] = [
  {
    id: 'demo-001',
    slug: 'sofa-contemporaneo-milano',
    name: 'Sofá Contemporáneo Milano',
    categoryId: 'salas',
    summary: 'Sofá de tres cuerpos de líneas limpias, pensado como pieza central de la sala.',
    description:
      'Un sofá de proporciones generosas y perfil bajo que equilibra confort y presencia. Sus líneas rectas y las patas de madera a la vista lo hacen fácil de combinar con mesas de centro de madera, alfombras claras y textiles naturales.',
    features: [
      'Configuración de tres cuerpos',
      'Cojines de respaldo independientes',
      'Patas de madera a la vista',
      'Tapiz en tono caramelo de referencia',
    ],
    materials: ['Cuero', 'Madera', 'Espuma de alta densidad'],
    images: [media['sofa-milano-1'], media['sofa-milano-2'], media['sofa-milano-3']],
  },
  {
    id: 'demo-002',
    slug: 'comedor-nordico',
    name: 'Comedor Nórdico',
    categoryId: 'comedores',
    summary: 'Mesa de madera maciza con sillas de inspiración escandinava para el día a día.',
    description:
      'Un comedor de estética nórdica donde la madera es protagonista. La mesa rectangular convive con sillas de asiento envolvente y patas de madera, una combinación cálida que funciona tanto en departamentos como en casas amplias.',
    features: [
      'Mesa rectangular de madera',
      'Sillas de asiento envolvente',
      'Estilo nórdico de líneas simples',
      'Composición para seis personas como referencia',
    ],
    materials: ['Madera maciza', 'Tapiz textil'],
    images: [media['comedor-nordico-1'], media['comedor-nordico-2'], media['comedor-nordico-3']],
  },
  {
    id: 'demo-003',
    slug: 'centro-de-entretenimiento-elegance',
    name: 'Centro de Entretenimiento Elegance',
    categoryId: 'salas',
    summary: 'Mueble de TV flotante con repisas abiertas y acabado en madera.',
    description:
      'Un centro de entretenimiento de montaje mural que libera el piso y aligera visualmente la sala. Combina módulos cerrados para ocultar equipos con repisas abiertas para libros, plantas y objetos decorativos.',
    features: [
      'Diseño flotante de montaje mural',
      'Módulos cerrados y repisas abiertas',
      'Espacio para equipos y cableado',
      'Composición modular de referencia',
    ],
    materials: ['Melamina', 'Enchape de madera'],
    images: [media['centro-elegance-1'], media['centro-elegance-2'], media['centro-elegance-3']],
  },
  {
    id: 'demo-004',
    slug: 'escritorio-ejecutivo-minimal',
    name: 'Escritorio Ejecutivo Minimal',
    categoryId: 'oficina',
    summary: 'Escritorio de madera con cajón y estructura ligera para trabajar con orden.',
    description:
      'Superficie de trabajo amplia, cajón frontal y una estructura delgada que mantiene el conjunto liviano. Una pieza pensada para oficinas en casa y despachos que buscan una estética sobria.',
    features: [
      'Cubierta de madera de bordes suaves',
      'Cajón frontal para documentos',
      'Estructura delgada de líneas rectas',
      'Proporciones aptas para oficina en casa',
    ],
    materials: ['Madera', 'Metal'],
    images: [media['escritorio-minimal-1'], media['escritorio-minimal-2'], media['escritorio-minimal-3']],
  },
  {
    id: 'demo-005',
    slug: 'closet-moderno',
    name: 'Clóset Moderno',
    categoryId: 'dormitorios',
    summary: 'Clóset con repisas, cajones y zonas de colgado para organizar cada prenda.',
    description:
      'Un sistema de almacenamiento que distribuye el espacio según el uso: barras de colgado a distintas alturas, repisas para prendas dobladas y cajones para accesorios. Puede plantearse abierto o con puertas.',
    features: [
      'Zonas de colgado a distintas alturas',
      'Repisas y cajones combinables',
      'Versión abierta o con puertas',
      'Distribución interior de referencia',
    ],
    materials: ['Melamina', 'Madera', 'Herrajes metálicos'],
    images: [media['closet-moderno-1'], media['closet-moderno-2'], media['closet-moderno-3']],
  },
  {
    id: 'demo-006',
    slug: 'mueble-de-cocina-premium',
    name: 'Mueble de Cocina Premium',
    categoryId: 'cocina',
    summary: 'Muebles altos, bajos e isla central combinando madera y superficies claras.',
    description:
      'Una cocina que integra almacenamiento, zona de preparación y un punto de encuentro en la isla central. La combinación de frentes de madera con cubiertas claras aporta calidez sin perder luminosidad.',
    features: [
      'Isla central con barra',
      'Muebles altos y bajos de almacenamiento',
      'Espacio para electrodomésticos empotrados',
      'Cubiertas claras de referencia',
    ],
    materials: ['Madera', 'Cuarzo', 'Melamina'],
    images: [media['cocina-premium-1'], media['cocina-premium-2'], media['cocina-premium-3']],
  },
  {
    id: 'demo-007',
    slug: 'cama-roble-natural',
    name: 'Cama Roble Natural',
    categoryId: 'dormitorios',
    summary: 'Cama con base de madera maciza y presencia cálida para el dormitorio.',
    description:
      'Una base de madera de perfil robusto que aporta calidez y textura al dormitorio. Su diseño sencillo acompaña ropa de cama en tonos neutros y bancas al pie de la cama.',
    features: [
      'Base de madera de perfil robusto',
      'Diseño de líneas sencillas',
      'Combina con bancas y mesas de noche',
      'Medida de referencia: dos plazas',
    ],
    materials: ['Madera maciza'],
    images: [media['cama-roble-1'], media['cama-roble-2'], media['cama-roble-3']],
  },
  {
    id: 'demo-008',
    slug: 'aparador-terra',
    name: 'Aparador Terra',
    categoryId: 'personalizados',
    summary: 'Aparador de madera con puertas corredizas para recibidores y comedores.',
    description:
      'Un aparador bajo con puertas corredizas y patas de madera, pensado para ordenar vajilla, libros o accesorios del recibidor. Sus medidas y acabados pueden adaptarse a cada espacio.',
    features: [
      'Puertas corredizas',
      'Patas de madera inclinadas',
      'Medidas adaptables al espacio',
      'Acabados de referencia',
    ],
    materials: ['Madera', 'Ratán'],
    images: [media['aparador-terra-1'], media['aparador-terra-2'], media['aparador-terra-3']],
  },
];
