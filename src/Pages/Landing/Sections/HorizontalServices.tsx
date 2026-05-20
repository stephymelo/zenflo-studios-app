import React, { useEffect, useRef, useState } from 'react';

const services = [
  { ix: '01', name: <><span className="it">Brand</span> Identity</>, desc: 'Logo systems, type pairings, color strategy, packaging, and the tiny details that separate a brand people screenshot from one they scroll past.', tags: ['LOGO SYSTEM', 'COLOR', 'TYPE', 'PACKAGING'], tag: 'Core' },
  { ix: '02', name: <>Shopify <span className="pop">stores</span></>, desc: 'Custom Liquid themes built for speed, mobile-first, and conversion. Inventory, subscriptions, upsells — all wired.', tags: ['CUSTOM THEME', 'LIQUID', 'CRO', 'SUBSCRIPTIONS'], tag: 'Build', cls: 't2' },
  { ix: '03', name: <>Web <span className="it">design</span></>, desc: 'Marketing sites, landing pages, and microsites that load fast, rank well, and look like no one else in your category.', tags: ['NEXT.JS', 'WEBFLOW', 'ANIMATIONS', 'SEO'], tag: 'Design' },
  { ix: '04', name: <>Content <span className="pop">&</span> Social</>, desc: 'Monthly content calendars, reels, carousels, and stories. We shoot, edit, write, and schedule — you approve.', tags: ['REELS', 'CAROUSELS', 'STORIES', 'CALENDAR'], tag: 'Create', cls: 't4' },
  { ix: '05', name: <>SEO + <span className="it">Growth</span></>, desc: 'Technical audits, keyword maps, backlink campaigns, and the monthly reporting loop that actually moves the needle.', tags: ['TECHNICAL SEO', 'KEYWORDS', 'BACKLINKS', 'ANALYTICS'], tag: 'Grow' },
  { ix: '06', name: <>Creative <span className="pop">direction</span></>, desc: 'Photo shoots, campaign concepting, seasonal lookbooks. We art-direct the whole thing so every asset feels like one brand.', tags: ['ART DIRECTION', 'PHOTO', 'CAMPAIGNS', 'LOOKBOOKS'], tag: 'Direct', cls: 't6' },
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
                <span className="ix">{s.ix}</span>
                <h3 className="svc-name">{s.name}</h3>
                <p className="desc">{s.desc}</p>
                <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
              <div className="col-r" data-tag={s.tag}>
                <div style={{ width: '100%', height: '100%', background: 'var(--zen-green-mist)' }} />
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
