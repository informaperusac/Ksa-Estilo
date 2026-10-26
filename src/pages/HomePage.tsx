import { useSeo } from '@/hooks/useSeo';
import { AboutSection } from '@/sections/AboutSection';
import { CatalogSection } from '@/sections/CatalogSection';
import { ContactSection } from '@/sections/ContactSection';
import { HeroSection } from '@/sections/HeroSection';
import { InspirationSection } from '@/sections/InspirationSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ServicesSection } from '@/sections/ServicesSection';

export default function HomePage() {
  useSeo({ path: '/' });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CatalogSection />
      <ServicesSection />
      <ProcessSection />
      <InspirationSection />
      <ContactSection />
    </>
  );
}
