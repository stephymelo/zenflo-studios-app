import React, { useEffect, useRef } from 'react';
import hlVid from '../../../Assets/2026 Assets/hl-mobile-scroll.mp4';
import hlProsImg from '../../../Assets/2026 Assets/hl-pros-mobile.png';
import { t, ntCls } from '../../../Components/LanguageToggle/LanguageToggle';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={ntCls('about')} id="about" ref={sectionRef}>
      <div className="about-inner">
        <div>
          <div className="about-eyebrow rv">{t('About the studio', 'Sobre el estudio')}</div>
          <h2 className="about-title rv rv-2">
            {t(
              <><span className="swash">Creative</span> muscle for brands with taste.</>,
              <><span className="swash">Músculo</span> creativo para marcas con gusto.</>
            )}
          </h2>
          <p className="about-body rv rv-3">
            {t(
              'We believe the strongest brands are built through story, strategy, and intentional design.',
              'Creemos que las marcas más fuertes se construyen con historia, estrategia y diseño intencional.'
            )}
          </p>
          <p className="about-body rv rv-4">
            {t(
              'As a collective of experienced creatives, strategists, and developers, we build brands that feel cohesive and are engaging.',
              'Como colectivo de creativos, estrategas y desarrolladores con experiencia, construimos marcas coherentes que enganchan.'
            )}
          </p>
          {/* <div className="about-stats rv rv-5">
            <div className="stat"><span className="stat-num">50+</span><span className="stat-lbl">Brands launched</span></div>
            <div className="stat"><span className="stat-num">3×</span><span className="stat-lbl">Avg. revenue lift</span></div>
            <div className="stat"><span className="stat-num">98%</span><span className="stat-lbl">Client retention</span></div>
          </div> */}
        </div>
        <div className="about-collage">
          <div className="collage-card c1"><video src={hlVid} autoPlay muted loop playsInline /></div>
          <div className="collage-card c2"><img src={hlProsImg} alt="" /></div>
         
        </div>
      </div>
    </section>
  );
};

export default About;
