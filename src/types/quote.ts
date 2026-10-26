/** Datos de una solicitud de cotización tal como los captura el formulario. */
export interface QuoteRequest {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  room: string;
  description: string;
  budget?: string;
  city: string;
  /** Fecha estimada en formato ISO (AAAA-MM-DD). */
  estimatedDate?: string;
}
