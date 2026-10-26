import { Info } from 'lucide-react';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

interface DemoNoteProps {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}

/** Aviso de contenido demostrativo. Desaparece con VITE_DEMO_MODE=false. */
export function DemoNote({ children, tone = 'dark', className }: DemoNoteProps) {
  if (!siteConfig.demoMode) return null;
  return (
    <p
      className={cn(
        'flex max-w-prose items-start gap-2.5 text-[0.8125rem] leading-relaxed',
        tone === 'dark' ? 'text-muted' : 'text-ivory/60',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
