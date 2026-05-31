import React, { useEffect, useRef, useState } from 'react';
import brandImg from '../../../Assets/2026 Assets/nil-catalogpage.jpg';
import shopifyImg from '../../../Assets/2026 Assets/shopify-skin-homescreen.png';
import webVid from '../../../Assets/2026 Assets/ta-website-scroll.mov';
import socialVid from '../../../Assets/2026 Assets/socialmedia-reel.mp4';
import growthImg from '../../../Assets/2026 Assets/email-comebackcheckout.png';
import creativeVid from '../../../Assets/2026 Assets/ta-reelphotoshoot.mp4';

const services = [
  { ix: '01', name: <><span className="pop">Brand</span> Identity</>, desc: 'Make an impact with a strong brand identity that resonates with your audience.', tags: ['LOGO', 'BRAND BOOK', 'PACKAGING'], tag: 'Core', media: brandImg, video: false },
  { ix: '02', name: <>Shopify <span className="pop">stores</span></>, desc: 'Custom Liquid themes built for speed, mobile-first, and conversion. Add subscriptions, bundles, upsell and more.', tags: ['CUSTOM THEME', 'LIQUID', 'CRO'], tag: 'Build', cls: 't2', media: shopifyImg, video: false },
  { ix: '03', name: <>Web <span className="pop">design</span></>, desc: 'Landing pages and full websites that load fast, rank well, and turn visitors into customers. Designed around your goals, not a template.', tags: ['UX/UI DESIGN', 'IMPROVE TRAFFIC', 'WEBSITE UPDATES'], tag: 'Design', media: webVid, video: true },
  { ix: '04', name: <>Content <span className="pop">&</span> Social</>, desc: 'Monthly content calendars, reels, carousels, and stories. We shoot, edit, write, and schedule — you approve.', tags: ['REELS', 'CAROUSELS', 'STORIES', 'CALENDAR'], tag: 'Create', cls: 't4', media: socialVid, video: true },
  { ix: '05', name: <>SEO + <span className="pop">Growth</span></>, desc: 'Technical audits, keyword maps, backlink campaigns, and the monthly reporting loop that actually moves the needle.', tags: ['TECHNICAL SEO', 'KEYWORDS', 'BACKLINKS', 'ANALYTICS'], tag: 'Grow', media: growthImg, video: false },
  { ix: '06', name: <>Creative <span className="pop">studio</span></>, desc: 'We film content with your products and business, take high-quality photos, and produce printables and digital catalogs — everything your brand needs to show up polished.', tags: ['CONTENT FILMING', 'PRODUCT PHOTOGRAPHY', 'PRINTABLES', 'DIGITAL CATALOGS'], tag: 'Create', cls: 't6', media: creativeVid, video: true },
];

const HorizontalServices: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(1);

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
    <div className="hsvc-wrap" ref={wrapRef} id="services">
      <div className="hsvc-sticky">
        <div className="hsvc-head">
          <div className="lbl"><span>What we do</span></div>
          <h2>Six ways we<br />make you <span className="pop">bloom</span>.</h2>
        </div>
        <div className="hsvc-counter">
          <span className="cur">{String(current).padStart(2, '0')}</span>
          <span>/ {String(services.length).padStart(2, '0')} services</span>
        </div>
        <div className="hsvc-track" ref={trackRef}>
          {services.map((s, i) => (
            <div className={`hsvc-tile${s.cls ? ` ${s.cls}` : ''}`} key={i}>
              <div className="col-l">
                  <h3 className="svc-name">{s.name}</h3>
                <p className="desc">{s.desc}</p>
                <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
              <div className="col-r">
                {s.video ? (
                  <video src={s.media} autoPlay muted loop playsInline />
                ) : (
                  <img src={s.media} alt="" />
                )}
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
