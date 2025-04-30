import React, { useRef, useState } from 'react';
import progen from '../../../Assets/Projects/memorialday-banner-mobile.png';

interface Project {
  id: number;
  title: string;
  description: string;
  img?: string; // Changed from object to string for image path
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Catalogs for Hair Units', 
      description: 'For Digital and Print', 
      img: progen // Directly use the imported image
    },
    { 
      id: 2, 
      title: 'E-commerce for Hair Care', 
      description: 'Built on Shopify' 
    },
    { 
      id: 3, 
      title: 'Fintech Platform', 
      description: 'Credit for importers' 
    },
    { 
      id: 4, 
      title: 'E-commerce for Hair loss', 
      description: 'Built on Shopify' 
    },
    { 
      id: 5, 
      title: 'Branding for Hair Care', 
      description: 'Brand book, socials and e-mail' 
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToNext = () => {
    if (sliderRef.current) {
      const newIndex = Math.min(currentIndex + 1, projects.length - 1);
      setCurrentIndex(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * 320, // Adjust based on your slide width
        behavior: 'smooth'
      });
    }
  };

  const scrollToPrev = () => {
    if (sliderRef.current) {
      const newIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * 320, // Adjust based on your slide width
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="project-slider-container">
      <h1 className="slider-title">Projects</h1>
      
      <div className="slider-wrapper">
        <div className="projects-slider" ref={sliderRef}>
          {projects.map((project) => (
            <div key={project.id} className="project-slide">
                <div className='project-img-container'>
               <img className='project-img' src={project.img} alt={project.title} />
                </div>
              
              <div className="project-content">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-controls">
        <button 
          className="slider-arrow left" 
          onClick={scrollToPrev} 
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <button 
          className="slider-arrow right" 
          onClick={scrollToNext} 
          disabled={currentIndex === projects.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Projects;