/** Imagen lista para renderizar. Compatible con imágenes locales o servidas por una API. */
export interface ImageAsset {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  /** Color de fondo mientras carga la imagen. */
  color?: string;
}
