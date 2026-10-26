import { siteConfig } from '@/config/site';

/**
 * Cliente HTTP mínimo para la futura API REST del ERP (productos, clientes,
 * cotizaciones, pedidos…). Solo se usa cuando VITE_API_URL está configurada.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const isApiEnabled = siteConfig.apiUrl !== '';

interface RequestOptions {
  signal?: AbortSignal;
  body?: unknown;
}

async function request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, options: RequestOptions = {}): Promise<T> {
  if (!isApiEnabled) throw new ApiError(0, 'La API no está configurada (VITE_API_URL).');

  const response = await fetch(`${siteConfig.apiUrl}${path}`, {
    method,
    signal: options.signal,
    headers: {
      Accept: 'application/json',
      ...(options.body !== undefined && { 'Content-Type': 'application/json' }),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) throw new ApiError(response.status, `Error ${response.status} al consultar ${path}`);
  return (await response.json()) as T;
}

export const http = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>('GET', path, { signal }),
  post: <T>(path: string, body: unknown, signal?: AbortSignal) => request<T>('POST', path, { body, signal }),
};
