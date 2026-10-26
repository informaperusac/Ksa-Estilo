import { motion } from 'motion/react';
import { cn } from '@/lib/cn';

export interface ChipOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
  /** Etiqueta accesible del grupo de filtros. */
  label: string;
  /** Identificador único para animar el indicador activo. */
  layoutId: string;
  tone?: 'dark' | 'light';
}

/** Filtros tipo píldora. En móvil se desplazan horizontalmente sin generar scroll de página. */
export function FilterChips({ options, value, onChange, label, layoutId, tone = 'dark' }: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative min-h-10 shrink-0 rounded-full border px-4.5 text-[0.875rem] font-medium transition-colors duration-300',
              active && 'border-transparent',
              active && (tone === 'dark' ? 'text-ivory' : 'text-charcoal'),
              !active &&
                (tone === 'dark'
                  ? 'border-line text-charcoal/75 hover:border-charcoal/40 hover:text-charcoal'
                  : 'border-ivory/20 text-ivory/75 hover:border-ivory/50 hover:text-ivory'),
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className={cn('absolute inset-0 rounded-full', tone === 'dark' ? 'bg-charcoal' : 'bg-ivory')}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
