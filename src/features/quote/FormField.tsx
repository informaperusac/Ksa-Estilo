import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export const inputClass = cn(
  'block w-full rounded-lg border border-line bg-white/70 px-4 text-[0.9375rem] text-charcoal placeholder:text-muted/70',
  'transition-[border-color,box-shadow,background-color] duration-200',
  'hover:border-charcoal/30 focus:border-walnut focus:bg-white focus:shadow-[0_0_0_3px_rgb(139_111_71/0.15)] focus:outline-none',
  'aria-[invalid=true]:border-danger aria-[invalid=true]:focus:shadow-[0_0_0_3px_rgb(162_59_42/0.15)]',
);

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

/** Etiqueta, control y mensajes de ayuda/error vinculados por aria-describedby. */
export function FormField({ id, label, error, hint, optional, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.875rem] font-semibold">
        {label}
        {optional && <span className="text-[0.75rem] font-medium text-muted">Opcional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.8125rem] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Atributos ARIA para un control según su estado de validación. */
export function fieldAria(id: string, error?: string, hint?: string) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}
