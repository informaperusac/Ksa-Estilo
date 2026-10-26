# Ksa Estilo — Muebles & Diseño Interior

Sitio web corporativo de **Ksa Estilo**, tienda de muebles y diseño interior en Perú.
Demostración comercial desarrollada por **ALUQIS**.

> **Importante:** esta versión es una demostración. Productos, imágenes, servicios y proceso de trabajo son
> referenciales y deben validarse con Ksa Estilo. El sitio no inventa datos de contacto, precios, reseñas ni cifras:
> todo dato comercial se configura mediante variables de entorno y, si falta, simplemente no se muestra.

---

## Contenido

1. [Tecnologías](#tecnologías)
2. [Requisitos](#requisitos)
3. [Instalación y ejecución](#instalación-y-ejecución)
4. [Configuración (.env)](#configuración-env)
5. [Configurar WhatsApp](#configurar-whatsapp)
6. [Modificar productos](#modificar-productos)
7. [Reemplazar imágenes](#reemplazar-imágenes)
8. [Actualizar información comercial](#actualizar-información-comercial)
9. [Estructura del proyecto](#estructura-del-proyecto)
10. [SEO, accesibilidad y rendimiento](#seo-accesibilidad-y-rendimiento)
11. [Preparación para el ERP (API REST)](#preparación-para-el-erp-api-rest)
12. [Despliegue en Netlify o Vercel](#despliegue-en-netlify-o-vercel)
13. [Créditos](#créditos)

---

## Tecnologías

| Área | Herramienta |
| --- | --- |
| Interfaz | React 19 + TypeScript 6 |
| Compilación | Vite 8 |
| Estilos | Tailwind CSS 4 (tokens en `src/styles/index.css`) |
| Animaciones | Motion for React |
| Rutas | React Router 8 |
| Formularios | React Hook Form + Zod |
| Íconos | Lucide React (+ íconos de marca en SVG propios) |
| Tipografías | Cormorant Garamond (títulos) y Manrope (texto), vía Google Fonts |

No hay backend en esta versión.

## Requisitos

- **Node.js 22.22 o superior** (recomendado: Node 24 LTS; ver `.nvmrc`).
- npm 10 o superior.

## Instalación y ejecución

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # verificación de tipos + compilación de producción en /dist
npm run preview    # sirve /dist localmente → http://localhost:4173
npm run typecheck  # solo verificación de tipos
```

## Configuración (.env)

Copia `.env.example` como `.env` y completa lo que tengas. **Todos los valores son opcionales**: lo que no se
configure no aparece en el sitio (no se generan enlaces vacíos ni rotos). Reinicia `npm run dev` tras cada cambio.

| Variable | Uso |
| --- | --- |
| `VITE_SITE_URL` | Dominio público sin barra final (`https://www.tudominio.pe`). Activa canonical, Open Graph absoluto y `sitemap.xml`. |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional (ver abajo). |
| `VITE_CONTACT_EMAIL` | Correo visible en contacto y pie de página. |
| `VITE_CONTACT_PHONE` | Teléfono visible (texto libre, se enlaza con `tel:`). |
| `VITE_ADDRESS` | Dirección comercial. |
| `VITE_BUSINESS_HOURS` | Horarios separados por `\|`. Ej.: `Lunes a viernes: 9:00 a 18:00\|Sábados: 9:00 a 13:00` |
| `VITE_MAP_EMBED_URL` | URL de inserción de Google Maps. El mapa solo se muestra si además hay dirección. |
| `VITE_INSTAGRAM_URL`, `VITE_FACEBOOK_URL`, `VITE_TIKTOK_URL`, `VITE_PINTEREST_URL` | Redes sociales (URL completas). |
| `VITE_ALUQIS_URL` | Enlace del crédito “Desarrollado por ALUQIS”. |
| `VITE_DEMO_MODE` | `true` (por defecto) muestra los avisos de contenido demostrativo. Usa `false` al publicar contenido real. |
| `VITE_API_URL` | Futuro: URL base de la API REST del ERP. Vacía = datos locales. |

Por seguridad, las URL que no empiezan con `http://` o `https://` se ignoran.

> En Netlify o Vercel estas variables se definen en el panel del proyecto (no se sube el archivo `.env`).

## Configurar WhatsApp

1. Define `VITE_WHATSAPP_NUMBER` solo con dígitos: código de país + número.
   Para Perú: `51` + los 9 dígitos del celular (formato `51XXXXXXXXX`).
2. Reinicia el servidor o vuelve a compilar.

Con el número configurado se activan: el botón flotante, “Consultar precio” en cada producto, “Cotizar” en cada
servicio y el envío del formulario. Los mensajes están en `src/lib/whatsapp.ts`:

- **General:** “Hola, Ksa Estilo. Me gustaría recibir información sobre sus muebles y servicios de diseño interior.”
- **Producto:** “Hola, Ksa Estilo. Estoy interesado en el producto [NOMBRE]. ¿Podrían brindarme información y una cotización?”
- **Servicio:** “Hola, Ksa Estilo. Me gustaría solicitar una cotización para [SERVICIO].”

**Sin número configurado**, ningún enlace apunta a WhatsApp: el botón flotante explica que el canal no está activo y
dirige al formulario; los botones de producto y servicio llevan a `/cotizacion` con los datos precargados; y el
formulario permite copiar el mensaje (o enviarlo por correo si existe `VITE_CONTACT_EMAIL`).

### Formulario de cotización

No hay servidor, así que el formulario **no simula un envío**: valida los datos (Zod), arma un mensaje estructurado y
ofrece abrirlo en WhatsApp o copiarlo. El sitio no guarda ningún dato. El mensaje se construye en
`src/services/quote.service.ts` y las reglas de validación están en `src/features/quote/quoteSchema.ts`.

## Modificar productos

Los productos viven en **`src/data/products.ts`**, separados del código de la interfaz:

```ts
{
  id: 'demo-001',
  slug: 'sofa-contemporaneo-milano',   // URL: /catalogo/sofa-contemporaneo-milano (único, minúsculas, sin tildes)
  name: 'Sofá Contemporáneo Milano',
  categoryId: 'salas',                 // id existente en src/data/categories.ts
  summary: 'Texto breve para tarjetas…',
  description: 'Texto ampliado para la página de detalle…',
  features: ['…'],
  materials: ['Madera', 'Cuero'],
  images: [media['sofa-milano-1'], media['sofa-milano-2']],  // la primera es la principal
}
```

- **Categorías:** edítalas en `src/data/categories.ts`. Los filtros se generan automáticamente.
- **Precios:** el sitio muestra “Consultar precio” a propósito. No se publican precios.
- El `sitemap.xml` incluye automáticamente cada producto al compilar.

## Reemplazar imágenes

Las fotografías están en `public/images/` en formato WebP, con dos o tres anchos por imagen (para que cada pantalla
descargue solo el tamaño que necesita). El registro central es **`src/data/media.ts`**.

Para reemplazar una imagen por una fotografía real:

1. Exporta la foto en WebP en dos anchos, por ejemplo `640` y `1280` px (calidad ~75).
2. Copia los archivos en `public/images/` (ej.: `mi-sofa-640.webp` y `mi-sofa-1280.webp`).
3. Actualiza o agrega la entrada en `src/data/media.ts`:

```ts
'mi-sofa': {
  src: '/images/mi-sofa-1280.webp',
  srcSet: '/images/mi-sofa-640.webp 640w, /images/mi-sofa-1280.webp 1280w',
  width: 1280,       // dimensiones reales de la versión grande
  height: 960,
  alt: 'Descripción de lo que se ve en la foto',
  color: '#b8a58c',  // color de fondo mientras carga (tono dominante)
},
```

4. Usa la clave (`media['mi-sofa']`) en productos, servicios o galería.

Otras imágenes:

- **Hero:** entrada `hero-sala` (ideal: 960, 1600 y 2400 px). Si cambias sus archivos, actualiza también la
  precarga en `index.html`.
- **Galería de inspiración:** `src/data/inspiration.ts`. Hoy contiene referencias visuales, **no proyectos de Ksa
  Estilo**; reemplázalas por fotos de proyectos reales manteniendo la misma estructura.
- **Imagen para redes sociales:** `public/og-image.jpg` (1200 × 630 px).
- **Favicon:** `public/favicon.svg`.

## Actualizar información comercial

| Qué | Dónde |
| --- | --- |
| WhatsApp, correo, teléfono, dirección, horarios, mapa, redes | `.env` (ver tabla de configuración) |
| Servicios | `src/data/services.ts` |
| Proceso de trabajo | `src/data/site-content.ts` → `processSteps` |
| Principios de la sección Nosotros | `src/data/site-content.ts` → `brandPrinciples` |
| Menú de navegación | `src/data/site-content.ts` → `navItems` |
| Textos de secciones del inicio | `src/sections/*.tsx` |
| Política de privacidad y términos | `src/pages/LegalPage.tsx` (textos referenciales: requieren revisión legal) |
| Título y descripción SEO por defecto | `index.html` y `src/config/site.ts` |
| Avisos de demostración | `VITE_DEMO_MODE=false` los oculta todos |

## Estructura del proyecto

```
├── public/
│   ├── images/            Fotografías optimizadas (WebP) + CREDITOS.txt
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── brand/         Logotipo
│   │   ├── icons/         Íconos de marca (WhatsApp, redes)
│   │   ├── layout/        Header, menú móvil, footer, botón flotante, scroll
│   │   ├── seo/           Datos estructurados JSON-LD
│   │   └── ui/            Botones, imagen responsiva, filtros, visor, animaciones
│   ├── config/site.ts     Lectura y validación de variables de entorno
│   ├── data/              Contenido editable (productos, categorías, servicios, galería, textos, imágenes)
│   ├── features/
│   │   ├── catalog/       Tarjeta, grilla y galería de producto
│   │   └── quote/         Formulario de cotización, validación y datos de contacto
│   ├── hooks/             SEO por ruta, scroll spy, carga de productos, diálogos accesibles
│   ├── lib/               Utilidades (WhatsApp, texto, clases)
│   ├── pages/             Inicio, catálogo, producto, cotización, legales, 404
│   ├── sections/          Secciones del inicio
│   ├── services/          Capa de datos: cliente HTTP, catálogo y cotizaciones
│   ├── styles/index.css   Tokens de diseño y utilidades
│   └── types/             Modelos de dominio
├── netlify.toml / vercel.json
└── vite.config.ts         Incluye la generación de sitemap.xml y robots.txt
```

### Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio (Nosotros, Catálogo, Servicios, Proceso, Proyectos, Contacto) |
| `/catalogo` | Catálogo con búsqueda y filtros (`?categoria=salas&q=madera`) |
| `/catalogo/:slug` | Detalle del producto con galería |
| `/cotizacion` | Formulario (`?producto=slug` o `?servicio=slug` lo precargan) |
| `/privacidad`, `/terminos` | Textos legales referenciales (`noindex`) |

## SEO, accesibilidad y rendimiento

- **SEO:** título, descripción, Open Graph y canonical por ruta; `sitemap.xml` y `robots.txt` generados al compilar
  (el sitemap requiere `VITE_SITE_URL`); datos estructurados `Organization`/`FurnitureStore`, `WebSite` y
  `BreadcrumbList` construidos solo con datos configurados (sin reseñas, calificaciones ni precios inventados);
  HTML semántico y textos alternativos descriptivos.
- **Accesibilidad:** enlace “Saltar al contenido”, foco visible, menú y visor con foco atrapado y cierre con Escape,
  formularios con etiquetas y errores asociados (`aria-describedby`), contraste AA y respeto de
  `prefers-reduced-motion` (animaciones de desplazamiento desactivadas).
- **Rendimiento:** imágenes WebP responsivas con `srcset`, lazy loading y dimensiones explícitas (sin saltos de
  diseño); precarga de la imagen principal; páginas y formulario cargados bajo demanda; librerías en bloques
  separados y cacheables.

## Preparación para el ERP (API REST)

La interfaz nunca lee los datos directamente: pasa por la capa `src/services/`.

- `services/http.ts`: cliente HTTP con URL base `VITE_API_URL` y manejo de errores (`ApiError`).
- `services/catalog.service.ts`: `getCategories`, `getProducts({ categoryId, query })` y `getProductBySlug`. Si
  `VITE_API_URL` está vacía usa los datos locales; si está definida consulta:
  `GET /categories`, `GET /products?category=&q=` y `GET /products/:slug`.
- `services/quote.service.ts`: hoy arma el mensaje de WhatsApp. Con backend, el mismo `QuoteRequest`
  (`src/types/quote.ts`) puede enviarse a `POST /quotes`.
- `types/`: modelos (`Product`, `ProductCategory`, `QuoteRequest`…) listos para corresponder con la API.

Módulos futuros previstos (no desarrollados): productos, inventario, clientes, cotizaciones, pedidos,
proveedores, proyectos, ventas, reportes, panel administrativo y usuarios/roles. Cada uno puede agregarse como un
nuevo servicio en `src/services/` y una carpeta en `src/features/`, sin modificar las páginas públicas.

## Despliegue en Netlify o Vercel

Ambos proyectos incluyen la configuración para que las rutas del SPA (`/catalogo/...`) funcionen al recargar.

### Netlify

1. Sube el proyecto a un repositorio (GitHub, GitLab o Bitbucket).
2. En Netlify: **Add new site → Import an existing project** y elige el repositorio.
3. `netlify.toml` ya define: comando `npm run build`, carpeta `dist` y Node 24.
4. En **Site configuration → Environment variables** agrega las variables `VITE_*` necesarias
   (al menos `VITE_SITE_URL` y `VITE_WHATSAPP_NUMBER`).
5. Despliega. Cada cambio de variables requiere un nuevo despliegue.

### Vercel

1. En Vercel: **Add New → Project** e importa el repositorio.
2. Framework: **Vite** (detectado automáticamente). Build: `npm run build`. Output: `dist`.
3. En **Settings → Environment Variables** agrega las variables `VITE_*`.
4. Despliega. `vercel.json` incluye las reescrituras del SPA y cabeceras de caché y seguridad.

Tras publicar con el dominio definitivo, registra `https://tudominio/sitemap.xml` en Google Search Console.

## Créditos

- Fotografías demostrativas: [Unsplash](https://unsplash.com) bajo la
  [Unsplash License](https://unsplash.com/license) (uso comercial gratuito, sin atribución obligatoria). El
  listado de fuentes está en `public/images/CREDITOS.txt`. Deben reemplazarse por fotografías propias de Ksa Estilo.
- Diseño y desarrollo: **ALUQIS**.

© 2026 Ksa Estilo. Todos los derechos reservados.
