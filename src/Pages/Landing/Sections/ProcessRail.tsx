import React, { useEffect, useRef } from 'react';

const steps = [
  { phase: 'Phase 01', time: 'Week 1', title: 'Plant — discovery', desc: "We dig into audience, competitors, voice, and where the wedge is. Output is a one-page strategy doc you'll actually reference." },
  { phase: 'Phase 02', time: 'Wk 2–4', title: 'Sprout — brand', desc: "Logo, type, color, photography direction, packaging system. Two rounds of revisions. We build for scale, not just a hero shot." },
  { phase: 'Phase 03', time: 'Wk 5–9', title: 'Grow — site', desc: 'Custom Shopify or marketing site. Real copy, real photography, real inventory. Tested across every device + connection speed.' },
  { phase: 'Phase 04', time: 'Ongoing', title: 'Bloom — launch', desc: "Launch campaign, SEO foundation, paid + social. We stay on as growth partner — quarterly retainers, no lock-ins." },
];

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
    <section className="process" id="process" ref={sectionRef}>
      <div className="process-inner">
        <div className="process-head">
          <div className="lbl rv">§ How we flow</div>
          <h2 className="rv rv-2"><span className="swash">Four</span> phases, eight to twelve weeks.</h2>
          <p className="rv rv-3">No agency theatre, no slide decks for the sake of slide decks. Just the work, done together.</p>
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
