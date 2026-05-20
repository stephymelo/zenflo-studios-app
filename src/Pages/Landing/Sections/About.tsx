import React, { useEffect, useRef } from 'react';

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
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-inner">
        <div>
          <div className="about-eyebrow rv">About the studio</div>
          <h2 className="about-title rv rv-2">
            <span className="swash">Creative</span> muscle for brands with taste.
          </h2>
          <p className="about-body rv rv-3">
            We're a <strong>small, senior team</strong> — no juniors, no layers, no meetings-about-meetings. Every pixel, every line of code, every strategy deck is touched by someone who's done this a hundred times and still cares about doing it right.
          </p>
          <p className="about-body rv rv-4">
            Based in <strong>Boca Raton</strong> with roots in <strong>Colombia</strong> — we speak the language of South Florida beauty and Latin American hustle.
          </p>
          <div className="about-stats rv rv-5">
            <div className="stat"><span className="stat-num">50+</span><span className="stat-lbl">Brands launched</span></div>
            <div className="stat"><span className="stat-num">3×</span><span className="stat-lbl">Avg. revenue lift</span></div>
            <div className="stat"><span className="stat-num">98%</span><span className="stat-lbl">Client retention</span></div>
          </div>
        </div>
        <div className="about-collage">
          <div className="collage-card c1"><div style={{ width: '100%', height: '100%', background: 'var(--zen-green-mist)' }} /></div>
          <div className="collage-card c2"><div style={{ width: '100%', height: '100%', background: 'var(--sand)' }} /></div>
          <div className="collage-card c3"><div style={{ width: '100%', height: '100%', background: 'var(--butter)' }} /></div>
          <div className="collage-tag">Est. 2025</div>
          <div className="collage-script">zen</div>
        </div>
      </div>
    </section>
  );
};

export default About;
