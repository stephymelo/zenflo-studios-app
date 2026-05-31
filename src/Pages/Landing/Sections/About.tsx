import React, { useEffect, useRef } from 'react';
import hlVid from '../../../Assets/2026 Assets/hl-socialmedia-website.mov';
import hairlossImg from '../../../Assets/2026 Assets/hairloss-mobile-home.png';
import catalogImg from '../../../Assets/2026 Assets/nil-catalogpage.jpg';

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
            We believe the strongest brands are built through story, strategy, and intentional design. 
          </p>
          <p className="about-body rv rv-4">
           As a collective of experienced creatives, strategists, and developers, we build brands that feel cohesive and are engaging.
          </p>
          {/* <div className="about-stats rv rv-5">
            <div className="stat"><span className="stat-num">50+</span><span className="stat-lbl">Brands launched</span></div>
            <div className="stat"><span className="stat-num">3×</span><span className="stat-lbl">Avg. revenue lift</span></div>
            <div className="stat"><span className="stat-num">98%</span><span className="stat-lbl">Client retention</span></div>
          </div> */}
        </div>
        <div className="about-collage">
          <div className="collage-card c1"><video src={hlVid} autoPlay muted loop playsInline /></div>
          <div className="collage-card c2"><img src={hairlossImg} alt="" /></div>
          <div className="collage-card c3"><img src={catalogImg} alt="" /></div>
         
        </div>
      </div>
    </section>
  );
};

export default About;
