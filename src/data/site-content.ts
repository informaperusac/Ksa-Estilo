import type { NavItem, ProcessStep } from '@/types/content';

export const navItems: NavItem[] = [
  { label: 'Inicio', to: '/', sectionId: 'inicio' },
  { label: 'Nosotros', to: '/#nosotros', sectionId: 'nosotros' },
  { label: 'Catálogo', to: '/catalogo', sectionId: 'catalogo' },
  { label: 'Servicios', to: '/#servicios', sectionId: 'servicios' },
  { label: 'Proyectos', to: '/#proyectos', sectionId: 'proyectos' },
  { label: 'Contacto', to: '/#contacto', sectionId: 'contacto' },
];

/** Proceso ilustrativo: debe validarse con Ksa Estilo. */
export const processSteps: ProcessStep[] = [
  {
    title: 'Cuéntanos tu idea',
    description: 'Escríbenos o completa el formulario con el ambiente, el estilo que te gusta y lo que necesitas resolver.',
  },
  {
    title: 'Evaluamos tus necesidades',
    description: 'Revisamos medidas, uso del espacio y presupuesto para entender qué solución te conviene.',
  },
  {
    title: 'Diseñamos una propuesta',
    description: 'Preparamos una propuesta de mobiliario y ambientación para que la revises y ajustes.',
  },
  {
    title: 'Coordinamos los detalles',
    description: 'Definimos materiales, acabados, plazos y la logística de entrega o instalación.',
  },
  {
    title: 'Hacemos realidad tu proyecto',
    description: 'Las piezas llegan a tu espacio y acompañamos la entrega hasta el último detalle.',
  },
];

/** Principios de la propuesta de marca (sin cifras ni datos comerciales). */
export const brandPrinciples = [
  { title: 'Funcionalidad', text: 'Cada pieza responde a cómo vives y usas tu espacio.' },
  { title: 'Materiales nobles', text: 'Madera, fibras y textiles elegidos por su calidez y duración.' },
  { title: 'Atención al detalle', text: 'Proporciones, acabados y luz pensados en conjunto.' },
];
