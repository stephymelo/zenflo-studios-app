import React, { useEffect, useRef } from 'react';

export const Hero: React.FC = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => h1Ref.current?.classList.add('in'), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-eyebrows">
        <span className="dot-line">Zenflo Studios · Est. 2025</span>
        <span>Boca Raton · South Florida</span>
      </div>

      <div className="hero-inner">
        <h1 className="hero-h1" ref={h1Ref}>
          <span className="line">We build</span>
          <span className="line">your <em>vision,</em></span>
          <span className="line">you <span className="scribble">grow.</span></span>
        </h1>
      </div>

      <div className="hero-foot">
        <p className="hero-sub">
          A creative studio from <strong>South Florida</strong> turning beauty + lifestyle brands into the kind of shops you screenshot. Brand → website → followers → sales.
        </p>
        <div className="hero-stamps">
          <span className="stamp"><span className="bullet" /> Brand</span>
          <span className="stamp butter"><span className="bullet" /> Shopify</span>
          <span className="stamp coral"><span className="bullet" /> SEO + Social</span>
          <span className="stamp green"><span className="bullet" /> Print</span>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="line-anim" />
      </div>
    </section>
  );
};

export default Hero;
