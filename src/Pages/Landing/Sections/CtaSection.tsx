import React, { useEffect, useRef } from 'react';
import logo from '../../../Assets/Logo/logo-zenflo-2026.svg';

const CtaSection: React.FC = () => {
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
    <section className="cta-section" id="contact" ref={sectionRef}>
      <div className="cta-section-mark"><img src={logo} alt="" /></div>
      <div className="cta-section-inner">
        <div>
          <h2 className="rv">Let's <span className="pop">grow</span> something <span className="coral-text">together.</span></h2>
          <p className="rv rv-2">Tell us about your brand and where you want it to go. We'll come back within 48 hours with a flight plan, a rough timeline, and an honest estimate.</p>
          <form className="cta-form rv rv-3" onSubmit={(e) => e.preventDefault()}>
            <div className="cta-row">
              <label><span>Your name</span><input type="text" /></label>
              <label><span>Your brand</span><input type="text" placeholder="Aura Beauty" /></label>
            </div>
            <label><span>Email</span><input type="email" placeholder="hello@yourbrand.com" /></label>
            <label><span>What are you working on?</span><textarea placeholder="A skincare launch. Need brand + Shopify + first 90 days of content." /></label>
            <button type="button">Send the seed →</button>
          </form>
        </div>
        <aside className="cta-aside">
          <div className="block rv rv-2">
            <h4>Email us</h4>
            <p><a href="mailto:hello@zenflostudios.com">hello@zenflostudios.com</a></p>
          </div>
          <div className="block rv rv-3">
            <h4>We're based in</h4>
            <p>Boca Raton, South Florida.</p>
          </div>
          <div className="block rv rv-4">
            <h4>Office hours</h4>
            <p>Mon–Fri · 9am to 6pm EST<br />Async by default — meetings on purpose.</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CtaSection;
