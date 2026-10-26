import { cn } from '@/lib/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  /** Oculta el subtítulo (útil en espacios reducidos). */
  compact?: boolean;
}

/** Logotipo textual con isotipo de arco, el motivo arquitectónico de la marca. */
export function Logo({ tone = 'dark', className, compact = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg viewBox="0 0 32 40" className="h-9 w-[1.8rem] shrink-0" aria-hidden="true">
        <path
          d="M6 38V17.5a10 10 0 0 1 20 0V38"
          fill="none"
          strokeWidth="1.6"
          className={tone === 'dark' ? 'stroke-walnut' : 'stroke-walnut-light'}
        />
        <path d="M11.5 38V19.5a4.5 4.5 0 0 1 9 0V38" fill="none" strokeWidth="1.2" className="stroke-current opacity-50" />
        <path d="M1.5 38.4h29" strokeWidth="1.6" className="stroke-current" />
      </svg>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-display text-[1.375rem] font-medium tracking-[0.22em]">KSA ESTILO</span>
        {!compact && (
          <span className={cn('mt-1.5 text-[0.6875rem] font-medium tracking-[0.02em]', tone === 'dark' ? 'text-muted' : 'text-ivory/70')}>
            Muebles &amp; Diseño Interior
          </span>
        )}
      </span>
    </span>
  );
}
