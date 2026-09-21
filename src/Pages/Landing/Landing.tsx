import React from 'react';
import { t } from '../../Components/LanguageToggle/LanguageToggle';
import Hero from './Sections/Hero';
import Marquee, { MarqueeItem } from './Sections/Marquee';
import About from './Sections/About';
import HorizontalServices from './Sections/HorizontalServices';
import ProcessRail from './Sections/ProcessRail';
import Testimonials from './Sections/Testimonials';
import CtaSection from './Sections/CtaSection';
import { useSeo } from '../../utils/useSeo';

export const Landing: React.FC = () => {
  useSeo(
    'Zenflo Studios — Shopify & Digital Marketing Studio in South Florida',
    'Custom Shopify stores and app development, web design, content & social, SEO for small brands — plus a free monthly Shopify class for beginners. Boca Raton, South Florida.',
    '/'
  );
  return (
    <section className="landing">
      <Hero />
      <Marquee>
        <MarqueeItem text="Branding" />
        <MarqueeItem text="Shopify" />
        <MarqueeItem text={t('Web Design', 'Diseño web')} />
        <MarqueeItem text="SEO" />
        <MarqueeItem text={t('Content', 'Contenido')} />
        <MarqueeItem text={t('Creative Direction', 'Dirección creativa')} />
      </Marquee>
      <About />
      <Marquee variant="alt">
        <MarqueeItem text={t('Beauty', 'Belleza')} />
        <MarqueeItem text={t('Wellness', 'Bienestar')} />
        <MarqueeItem text={t('Skincare', 'Cuidado de la piel')} />
        <MarqueeItem text={t('Lifestyle', 'Estilo de vida')} />
        <MarqueeItem text="DTC" />
        <MarqueeItem text="E-Commerce" />
      </Marquee>
      <HorizontalServices />
      <ProcessRail />
      {/* <Testimonials /> */}
      <Marquee variant="butter">
        <MarqueeItem text={t("Let's grow", 'Vamos a crecer')} />
        <MarqueeItem text={t("Let's bloom", 'Vamos a florecer')} />
        <MarqueeItem text={t("Let's build", 'Vamos a construir')} />
        <MarqueeItem text={t("Let's create", 'Vamos a crear')} />
      </Marquee>
      <CtaSection />
    </section>
  );
};
