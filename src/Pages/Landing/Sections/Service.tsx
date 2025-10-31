import React, { useEffect, useRef, useState } from "react";

const Service = () => {
  const [isVisible, setIsVisible] = useState(false);
  const serviceRef = useRef<HTMLDivElement>(null);

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

    const currentRef = serviceRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  console.log("Service isVisible:", isVisible);

  return (
    <div className="services-section" ref={serviceRef}>
      <h4>How We Flow</h4>
      <div
        className={`service-item ${isVisible ? "animate" : ""}`}
        style={{ transitionDelay: "0.1s" }}
      >
        <div className="rect"></div>
        <div className="content">
          <h2 className="service-title">Strategy</h2>
          <p className="service-description">
            Share your story and goals — we'll use UX and design thinking to align your brand's core values with your market.
          </p>
        </div>
      </div>

      <div
        className={`service-item ${isVisible ? "animate" : ""}`}
        style={{ transitionDelay: "0.3s" }}
      >
        <div className="rect"></div>
        <div className="content">
          <h2 className="service-title">Design</h2>
          <p className="service-description">
            We create what you need to express your brand. We design with purpose to ensure your brand looks cohesive, feels authentic, and delivers real value.
          </p>
        </div>
      </div>

      <div
        className={`service-item ${isVisible ? "animate" : ""}`}
        style={{ transitionDelay: "0.5s" }}
      >
        <div className="rect"></div>
        <div className="content">
          <h2 className="service-title">Implementation</h2>
          <p className="service-description">
            Turning ideas into impact — that's where implementation begins. We transform design concepts into real-world experiences that connect with people and drive results. Whether it's launching your new website or rolling out a campaign, we handle it with creative precision and technical expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;