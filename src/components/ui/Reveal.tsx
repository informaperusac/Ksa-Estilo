import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Desplazamiento vertical inicial en píxeles. */
  y?: number;
}

/**
 * Aparición suave al entrar en pantalla (una sola vez). Con movimiento reducido
 * activado, MotionConfig omite el desplazamiento y solo se conserva el fundido.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE_SOFT, delay }}
    >
      {children}
    </motion.div>
  );
}
