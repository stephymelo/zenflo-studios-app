import React, { useEffect, useRef } from 'react';
import { t, ntCls } from '../../../Components/LanguageToggle/LanguageToggle';

export const Hero: React.FC = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => h1Ref.current?.classList.add('in'), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={ntCls('hero')}>
      {/* <div className="hero-eyebrows">
        <span className="dot-line">Zenflo Studios · Est. 2025</span>
        <span>Boca Raton · South Florida</span>
      </div> */}

      <div className="hero-inner">
        <h1 className="hero-h1" ref={h1Ref}>
          <span className="line">{t('We build', 'Construimos')}</span>
          <span className="line">{t('your', 'tu')} <em>{t('vision,', 'visión,')}</em></span>
          <span className="line">{t('you', 'tú')} <span className="scribble">{t('grow.', 'creces.')}</span></span>
        </h1>
      </div>

      <div className="hero-foot">
        {/* <p className="hero-sub">
          A creative studio from <strong>South Florida</strong> building the next wave of brands.
        </p> */}
        <div className="hero-stamps">
          <span className="stamp"><span className="bullet" /> {t('Brand', 'Marca')}</span>
          <span className="stamp butter"><span className="bullet" /> Shopify/E-commerce</span>
          <span className="stamp coral"><span className="bullet" /> {t('AI + SEO + Social', 'IA + SEO + Redes')}</span>
          <span className="stamp green"><span className="bullet" /> {t('Print', 'Impresión')}</span>
        </div>
      </div>

      {/* <div className="hero-scroll">
        <span>Scroll</span>
        <span className="line-anim" />
      </div> */}
    </section>
  );
};

export default Hero;
