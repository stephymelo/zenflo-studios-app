import React, { useEffect, useRef, useState } from 'react';
import { t, ntCls } from '../../../Components/LanguageToggle/LanguageToggle';
import shopifyImg from '../../../Assets/2026 Assets/ta-product-desktop.png';
import shopifyImgM from '../../../Assets/2026 Assets/ta-product-mobile.png';
import appDevImg from '../../../Assets/2026 Assets/amn-product-desktop.png';
import appDevImgM from '../../../Assets/2026 Assets/amn-product-mobile.png';
import webVid from '../../../Assets/2026 Assets/ta-landing-scroll.mp4';
import webVidM from '../../../Assets/2026 Assets/ta-landing-mobile-scroll.mp4';
import socialVid from '../../../Assets/2026 Assets/socialmedia-reel.mp4';
import growthImg from '../../../Assets/2026 Assets/ta-caseclosed-desktop.png';
import growthImgM from '../../../Assets/2026 Assets/ta-caseclosed-mobile.png';
import creativeVid from '../../../Assets/2026 Assets/ta-reelphotoshoot.mp4';

const MOBILE_QUERY = '(max-width: 768px)';

/* Phone tiles get a portrait capture of the same site, so the crop shows the
   page instead of a slice of a desktop screenshot. */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
};

const services = [
  { ix: '01', name: t(<>Shopify <span className="pop">stores</span></>, <>Tiendas <span className="pop">Shopify</span></>), desc: t('Custom Liquid themes built for speed, mobile-first, and conversion. Add subscriptions, bundles, upsell and more.', 'Temas Liquid a medida, pensados para velocidad, móvil primero y conversión. Suma suscripciones, paquetes, upsells y más.'), tags: t(['CUSTOM THEME', 'LIQUID', 'CRO'], ['TEMA A MEDIDA', 'LIQUID', 'CRO']), tag: 'Build', media: shopifyImg, mediaMobile: shopifyImgM, video: false },
  { ix: '02', name: t(<>App <span className="pop">development</span></>, <>Desarrollo de <span className="pop">apps</span></>), desc: t('Custom Shopify development when a theme can\'t take you further — private apps, integrations, custom features, and automations built for your store.', 'Desarrollo Shopify a medida cuando un tema ya no da más: apps privadas, integraciones, funciones personalizadas y automatizaciones para tu tienda.'), tags: t(['CUSTOM APPS', 'INTEGRATIONS', 'SHOPIFY API', 'AUTOMATIONS'], ['APPS A MEDIDA', 'INTEGRACIONES', 'SHOPIFY API', 'AUTOMATIZACIONES']), tag: 'Build', cls: 't2', media: appDevImg, mediaMobile: appDevImgM, video: false },
  { ix: '03', name: t(<>Web <span className="pop">design</span></>, <>Diseño <span className="pop">web</span></>), desc: t('Landing pages and full websites that load fast, rank well, and turn visitors into customers. Designed around your goals, not a template.', 'Landing pages y sitios completos que cargan rápido, posicionan bien y convierten visitas en clientes. Diseñados alrededor de tus metas, no de una plantilla.'), tags: t(['UX/UI DESIGN', 'IMPROVE TRAFFIC', 'WEBSITE UPDATES'], ['DISEÑO UX/UI', 'MÁS TRÁFICO', 'ACTUALIZACIONES WEB']), tag: 'Design', media: webVid, mediaMobile: webVidM, video: true },
  { ix: '04', name: t(<>Content <span className="pop">&</span> Social</>, <>Contenido <span className="pop">&</span> Redes</>), desc: t('Monthly content calendars, reels, carousels, and stories. We shoot, edit, write, and schedule — you approve.', 'Calendarios de contenido mensuales, reels, carruseles e historias. Grabamos, editamos, escribimos y programamos; tú apruebas.'), tags: t(['REELS', 'CAROUSELS', 'STORIES', 'CALENDAR'], ['REELS', 'CARRUSELES', 'HISTORIAS', 'CALENDARIO']), tag: 'Create', cls: 't4', media: socialVid, video: true },
  { ix: '05', name: t(<>SEO + <span className="pop">Growth</span></>, <>SEO + <span className="pop">Crecimiento</span></>), desc: t('Technical audits, keyword maps, backlink campaigns, and the monthly reporting loop that actually moves the needle.', 'Auditorías técnicas, mapas de palabras clave, campañas de backlinks y el reporte mensual que de verdad mueve la aguja.'), tags: t(['TECHNICAL SEO', 'KEYWORDS', 'BACKLINKS', 'ANALYTICS'], ['SEO TÉCNICO', 'PALABRAS CLAVE', 'BACKLINKS', 'ANALÍTICA']), tag: 'Grow', media: growthImg, mediaMobile: growthImgM, video: false },
  { ix: '06', name: t(<>Creative <span className="pop">studio</span></>, <>Estudio <span className="pop">creativo</span></>), desc: t('We film content with your products and business, take high-quality photos, and produce printables and digital catalogs — everything your brand needs to show up polished.', 'Grabamos contenido con tus productos y tu negocio, hacemos fotos de alta calidad y producimos imprimibles y catálogos digitales: todo lo que tu marca necesita para verse impecable.'), tags: t(['CONTENT FILMING', 'PRODUCT PHOTOGRAPHY', 'PRINTABLES', 'DIGITAL CATALOGS'], ['GRABACIÓN DE CONTENIDO', 'FOTOGRAFÍA DE PRODUCTO', 'IMPRIMIBLES', 'CATÁLOGOS DIGITALES']), tag: 'Create', cls: 't6', media: creativeVid, video: true },
];

const HorizontalServices: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(1);
  const isMobile = useIsMobile();

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, -rect.top / scrollable));
      const maxShift = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-scrolled * maxShift}px)`;
      setProgress(scrolled * 100);
      setCurrent(Math.min(services.length, Math.floor(scrolled * services.length) + 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={ntCls('hsvc-wrap')} ref={wrapRef} id="services">
      <div className="hsvc-sticky">
        <div className="hsvc-head">
          <div className="lbl"><span>{t('What we do', 'Lo que hacemos')}</span></div>
          {t(
            <h2>Six ways we<br />make you <span className="pop">bloom</span>.</h2>,
            <h2>Seis formas de<br />hacerte <span className="pop">florecer</span>.</h2>
          )}
        </div>
        <div className="hsvc-counter">
          <span className="cur">{String(current).padStart(2, '0')}</span>
          <span>/ {String(services.length).padStart(2, '0')} {t('services', 'servicios')}</span>
        </div>
        <div className="hsvc-track" ref={trackRef}>
          {services.map((s, i) => (
            <div className={`hsvc-tile${s.cls ? ` ${s.cls}` : ''}`} key={i}>
              <div className="col-l">
                  <h3 className="svc-name">{s.name}</h3>
                <p className="desc">{s.desc}</p>
                <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
              <div className={`col-r${isMobile && s.mediaMobile ? ' col-r--portrait' : ''}`}>
                {(() => {
                  const src = isMobile && s.mediaMobile ? s.mediaMobile : s.media;
                  return s.video ? (
                    <video key={src} src={src} autoPlay muted loop playsInline aria-label={`Example of our ${s.tag.toLowerCase()} work`} />
                  ) : (
                    <img src={src} alt={`Example of our ${s.tag.toLowerCase()} work`} />
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
        <div className="hsvc-progress">
          <div className="hsvc-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalServices;
