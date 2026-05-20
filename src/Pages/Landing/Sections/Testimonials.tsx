import React, { useEffect, useRef } from 'react';

const testimonials = [
  { quote: "Zenflo made us look like a brand that's been around for ten years — on launch day.", name: 'Mariana Restrepo', role: 'Founder, Aura Beauty', initials: 'MR' },
  { quote: "They get beauty. They get DTC. They get that I'm not just buying pixels — I'm buying a business that works.", name: 'Daniela Castro', role: 'CEO, Florería Skin', initials: 'DC' },
  { quote: 'Our Shopify revenue tripled in the first quarter post-relaunch. The site does the work for me now.', name: 'Sofía Vega', role: 'Founder, Botánica Co.', initials: 'SV' },
  { quote: 'Working with Zenflo felt like having a creative director on the team — without the agency price tag.', name: 'Lina Pacheco', role: 'Brand Lead, Mango Hair', initials: 'LP' },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cards = [...testimonials, ...testimonials];

  return (
    <section className="testi" ref={sectionRef}>
      <div className="testi-head">
        <div className="testi-eyebrow rv">Kind words</div>
        <h2 className="rv rv-2">Founders who let us <span className="pop">help</span>.</h2>
      </div>
      <div className="testi-track-wrap">
        <div className="testi-track">
          {cards.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="stars">★★★★★</div>
              <blockquote>"{t.quote}"</blockquote>
              <div className="who">
                <div className="avatar">{t.initials}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
