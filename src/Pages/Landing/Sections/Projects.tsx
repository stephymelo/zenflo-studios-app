import React, { useRef, useState } from 'react';
import catalog from '../../../Assets/Projects/catalog-men-nil-mockup.png';
import finkargo from '../../../Assets/Projects/finkargo-mockup.png';
import progen from '../../../Assets/Projects/progen-mockup.png';
import hairloss from '../../../Assets/Projects/hairloss-mockup.png';
import progenbook from '../../../Assets/Projects/progen-brandbook-mockup.png';

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
      img: catalog // Directly use the imported image
    },
    { 
      id: 2, 
      title: 'E-commerce for Hair Care', 
      description: 'Built on Shopify',
      img: progen
    },
    { 
      id: 3, 
      title: 'Fintech Platform', 
      description: 'Credit for importers',
      img: finkargo
    },
    { 
      id: 4, 
      title: 'E-commerce for Hair loss', 
      description: 'Built on Shopify' ,
      img: hairloss
    },
    { 
      id: 5, 
      title: 'Branding for Hair Care', 
      description: 'Brand book, socials and e-mail' ,
      img: progenbook
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
      <h2 className="slider-title">Projects</h2>
  
      
      <div className="slider-wrapper">
        <div className="projects-slider" ref={sliderRef}>
          {projects.map((project) => (
            <div key={project.id} className="project-slide">
                <div className='project-img-container'>
               <img className='project-img' src={project.img} alt={project.title} />
                </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
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