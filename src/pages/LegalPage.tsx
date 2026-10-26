import { useSeo } from '@/hooks/useSeo';

type LegalKind = 'privacidad' | 'terminos';

interface LegalSection {
  title: string;
  paragraphs: string[];
}

/**
 * Textos legales REFERENCIALES para la demostración. Deben ser revisados y
 * completados por Ksa Estilo con asesoría legal antes de publicar el sitio.
 */
const content: Record<LegalKind, { title: string; intro: string; sections: LegalSection[] }> = {
  privacidad: {
    title: 'Política de privacidad',
    intro: 'Explica qué datos se solicitan en este sitio, para qué se usan y cómo puedes ejercer tus derechos.',
    sections: [
      {
        title: 'Responsable',
        paragraphs: [
          'Ksa Estilo es responsable del tratamiento de los datos que le envíes. Sus datos de identificación y contacto se completarán al publicar el sitio.',
        ],
      },
      {
        title: 'Datos que solicitamos',
        paragraphs: [
          'El formulario de cotización solicita nombre, teléfono, correo electrónico, ciudad y detalles de tu proyecto.',
          'Este sitio no almacena esa información: se procesa únicamente en tu navegador para preparar un mensaje que tú decides enviar por WhatsApp o correo electrónico.',
        ],
      },
      {
        title: 'Finalidad',
        paragraphs: ['Usamos los datos que nos envías para responder tu solicitud de información o cotización y comunicarnos contigo sobre ella.'],
      },
      {
        title: 'Servicios de terceros',
        paragraphs: [
          'Al abrir WhatsApp o tu aplicación de correo, el envío del mensaje se rige por las condiciones de esos servicios. Las tipografías del sitio se cargan desde Google Fonts.',
        ],
      },
      {
        title: 'Tus derechos',
        paragraphs: [
          'Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, y su reglamento, escribiendo a los canales de contacto de Ksa Estilo.',
        ],
      },
    ],
  },
  terminos: {
    title: 'Términos y condiciones',
    intro: 'Condiciones generales para el uso de este sitio web.',
    sections: [
      {
        title: 'Uso del sitio',
        paragraphs: ['Este sitio tiene fines informativos: presenta productos, servicios e ideas de diseño interior y facilita el contacto con Ksa Estilo.'],
      },
      {
        title: 'Productos e imágenes',
        paragraphs: [
          'Las imágenes son referenciales. Medidas, materiales, acabados y disponibilidad se confirman en cada cotización.',
        ],
      },
      {
        title: 'Cotizaciones',
        paragraphs: [
          'El sitio no muestra precios. Cada cotización es personalizada y solo es válida cuando Ksa Estilo la confirma directamente.',
        ],
      },
      {
        title: 'Propiedad intelectual',
        paragraphs: ['La marca, los textos y el diseño del sitio pertenecen a sus respectivos titulares. No está permitido reproducirlos sin autorización.'],
      },
      {
        title: 'Enlaces externos',
        paragraphs: ['Los enlaces a servicios de terceros, como WhatsApp o redes sociales, se rigen por las condiciones de cada servicio.'],
      },
    ],
  },
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const page = content[kind];
  useSeo({ title: page.title, description: page.intro, path: `/${kind}`, noindex: true });

  return (
    <article className="container-page max-w-3xl pb-28 pt-32 lg:pt-40">
      <h1 className="text-display">{page.title}</h1>
      <p className="mt-6 text-lead text-muted">{page.intro}</p>
      <p className="mt-8 rounded-2xl border border-dashed border-walnut/40 bg-ivory p-5 text-[0.875rem] leading-relaxed text-muted">
        Texto referencial preparado para la demostración. Debe ser revisado y completado por Ksa Estilo con asesoría
        legal antes de publicarse.
      </p>
      {page.sections.map((section) => (
        <section key={section.title} className="mt-12 border-t border-line pt-8">
          <h2 className="text-title">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-prose leading-relaxed text-charcoal/85">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
