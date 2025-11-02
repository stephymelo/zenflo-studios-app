import React, { useState, useEffect, useRef } from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "“Attentive, communicative, and always ready with helpful guidance — a pleasure to work with.",
      name: "Michael Kerzner",
      role: "CEO, Premier Nail Source"
    },
    {
      id: 2,
      quote: "Collaborative environment and truly understood our vision and brought it to life.",
      name: "Ricky Arias",
      role: "Marketing Director, New Image Labs"
    },

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setDirection('right');
        handleNext();
      }, 6000);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex]);

  const handlePreviousClick = () => {
    setDirection('left');
    handlePrevious();
  };

  const handleNextClick = () => {
    setDirection('right');
    handleNext();
  };

  return (
    <section className="testimonials">
      <h4 className="testimonials-heading">Testimonials</h4>

      <div className="testimonials-container">
        <div
          className="testimonials-arrow testimonials-arrow-left"
          onClick={handlePreviousClick}
          aria-label="Previous testimonial"
          role="button"
          tabIndex={0}
        >
          <IconArrowLeft size={32} stroke={1} />
        </div>

        <div className="testimonials-content" key={currentIndex}>
          <div className={`testimonials-slide testimonials-slide-${direction}`}>
            <p className="testimonials-quote">"{currentTestimonial.quote}"</p>
            <p className="testimonials-name">{currentTestimonial.name}</p>
            <p className="testimonials-role">{currentTestimonial.role}</p>
          </div>
        </div>

        <div
          className="testimonials-arrow testimonials-arrow-right"
          onClick={handleNextClick}
          aria-label="Next testimonial"
          role="button"
          tabIndex={0}
        >
          <IconArrowRight size={32} stroke={1} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
