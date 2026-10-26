import { Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { ButtonLink } from '@/components/ui/Button';
import { EASE_SOFT } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { navItems } from '@/data/site-content';
import { cn } from '@/lib/cn';
import { buildWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import type { NavItem } from '@/types/content';

interface MobileMenuProps {
  open: boolean;
  onNavigate: () => void;
  isActive: (item: NavItem) => boolean;
}

export function MobileMenu({ open, onNavigate, isActive }: MobileMenuProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappMessages.general);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-movil"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-linen px-5 pb-10 pt-24 sm:px-8 lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: EASE_SOFT }}
        >
          <nav aria-label="Menú móvil" className="flex-1">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.to}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    data-autofocus={index === 0 ? true : undefined}
                    aria-current={isActive(item) ? 'location' : undefined}
                    className={cn(
                      'flex items-baseline justify-between py-4 font-display text-[2.4rem] leading-none transition-colors',
                      isActive(item) ? 'text-walnut-deep' : 'text-charcoal',
                    )}
                  >
                    {item.label}
                    {isActive(item) && <span aria-hidden="true" className="size-2 rounded-full bg-walnut" />}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="mt-10 flex flex-col gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ButtonLink to="/cotizacion" size="lg" onClick={onNavigate}>
              Solicitar cotización
            </ButtonLink>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem] font-medium">
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <WhatsAppIcon className="size-4.5" /> WhatsApp
                </a>
              )}
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2">
                  <Mail className="size-4.5" aria-hidden="true" /> {siteConfig.email}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
