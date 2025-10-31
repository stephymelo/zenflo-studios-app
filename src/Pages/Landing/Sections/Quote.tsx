import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // if using React Router
import { IconArrowRight } from "@tabler/icons-react";


const Quote = () => {
  const [number, setNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const quoteRef = useRef(null);
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            let count = 0;
            const interval = setInterval(() => {
              setNumber(Math.floor(Math.random() * 10));
              count++;
              if (count > 20) {
                clearInterval(interval);
                setNumber(5);
              }
            }, 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (quoteRef.current) observer.observe(quoteRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleClick = () => {
    navigate("/work"); // navigate to /work
  };

  return (
    <div className="quote" ref={quoteRef}>
      <h4 className="quote-text">
        You plant the seed — we nurture its growth towards it's fullest potential.
      </h4>
      <div className="quote-number" onClick={handleClick}>
        <h4 className="quote-number__digit">{number}</h4>
        <h4 className="quote-number__label">projects in 2025</h4>
       <IconArrowRight size={16} stroke={1.5} />
      </div>
    </div>
  );
};

export default Quote;
