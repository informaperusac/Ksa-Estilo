import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'light' | 'outline' | 'outline-light';
type ButtonSize = 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-charcoal text-ivory hover:bg-walnut-deep',
  light: 'bg-ivory text-charcoal hover:bg-linen',
  outline: 'border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory',
  'outline-light': 'border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-6 text-[0.875rem]',
  lg: 'min-h-13 px-8 text-[0.9375rem]',
};

export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em] whitespace-nowrap',
    'transition-[background-color,color,border-color,transform] duration-300 ease-soft active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  );
}

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant, size, className, type = 'button', ...props }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonStyles(variant, size, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: StyleProps & LinkProps) {
  return <Link className={buttonStyles(variant, size, className)} {...props} />;
}

export function ButtonAnchor({ variant, size, className, ...props }: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonStyles(variant, size, className)} {...props} />;
}
