import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    const currentRef = aboutRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  console.log("About isVisible:", isVisible); // Debug log

  return (
    <section className="about" ref={aboutRef}>
      <div className="about-container">
            <h4>Who</h4>
        <p
          className={`about-text ${isVisible ? "animate" : ""}`}
          style={{ transitionDelay: "0.1s" }}
        >
          Zenflo Studios is an interactive design agency creating digital
          products and services.
        </p>
        <p
          className={`about-text ${isVisible ? "animate" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        >
          Founded in 2025 in South Florida, with roots in Colombia, we blend
          creativity and innovation to drive growth and transformation for every
          client.
        </p>
      </div>
    </section>
  );
};

export default About;
