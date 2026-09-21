import React, { useEffect, useRef } from 'react';
import { t, ntCls } from '../../../Components/LanguageToggle/LanguageToggle';

const steps = t([
  { phase: 'Phase 01', time: 'Week 1', title: 'Plant — discovery', desc: "We dig into audience, competitors, voice, and where the wedge is. Output is a one-page strategy doc you'll actually reference." },
  { phase: 'Phase 02', time: 'Wk 2–4', title: 'Sprout — brand', desc: "Logo, type, color, photography direction, packaging system. Two rounds of revisions. We build for scale, not just a hero shot." },
  { phase: 'Phase 03', time: 'Wk 5–9', title: 'Grow — site', desc: 'Custom Shopify or marketing site. Real copy, real photography, real inventory. Tested across every device + connection speed.' },
  { phase: 'Phase 04', time: 'Ongoing', title: 'Bloom — launch', desc: "Launch campaign, SEO foundation, paid + social. We stay on as growth partner — quarterly retainers, no lock-ins." },
], [
  { phase: 'Fase 01', time: 'Semana 1', title: 'Plantar — descubrimiento', desc: 'Analizamos audiencia, competencia, voz y dónde está la oportunidad. El resultado es un documento de estrategia de una página que de verdad vas a consultar.' },
  { phase: 'Fase 02', time: 'Sem. 2–4', title: 'Brotar — marca', desc: 'Logo, tipografía, color, dirección fotográfica, sistema de empaque. Dos rondas de revisiones. Construimos para escalar, no solo para una foto bonita.' },
  { phase: 'Fase 03', time: 'Sem. 5–9', title: 'Crecer — sitio', desc: 'Tienda Shopify o sitio de marketing a medida. Textos reales, fotografía real, inventario real. Probado en cada dispositivo y velocidad de conexión.' },
  { phase: 'Fase 04', time: 'Continuo', title: 'Florecer — lanzamiento', desc: 'Campaña de lanzamiento, base SEO, pauta y redes. Seguimos como tu socio de crecimiento: retainers trimestrales, sin ataduras.' },
]);

const ProcessRail: React.FC = () => {
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
    <section className={ntCls('process')} id="process" ref={sectionRef}>
      <div className="process-inner">
        <div className="process-head">
          <div className="lbl rv"></div>
          <h2 className="rv rv-2">{t(
            <><span className="swash">Four</span> phases, eight to twelve weeks.</>,
            <><span className="swash">Cuatro</span> fases, de ocho a doce semanas.</>
          )}</h2>
         
        </div>
        <div className="process-rail">
          {steps.map((step, i) => (
            <div className={`process-step rv${i > 0 ? ` rv-${i + 1}` : ''}`} key={i}>
              <span className="dot" />
              <div className="ix"><span>{step.phase}</span><span>{step.time}</span></div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessRail;
