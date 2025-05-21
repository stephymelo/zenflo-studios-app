import React from "react";


import catalog from '../../Assets/Projects/catalog-men-nil-mockup.png';
import catalogW from '../../Assets/Projects/catalog-women-mockup.png';
import catalogA from '../../Assets/Projects/catalog-accessory.png';

import finkargo from '../../Assets/Projects/finkargo-mockup.png';
import progen from '../../Assets/Projects/progen-mockup.png';
import hairloss from '../../Assets/Projects/hairloss-mockup.png';
import progenbook from '../../Assets/Projects/progen-brandbook-mockup.png';

interface WorkItem {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
}

const Work: React.FC = () => {
  // Sample data - replace with your actual work items
  const workItems: WorkItem[] = [
    {
      id: 1,
      title: "Catalog design",
      subtitle: "Included re-designing",
      images: [
        catalog,
        catalogW,
        catalogA,
      ],
    },
    {
      id: 2,
      title: "E-commerce for Hair Care with Branding",
      subtitle: "Designed brand book for socials and web. Built e-commerse with Shopify, customized to the brands needs to include Wholesale, interactive elements, and more.",
      images: [
        progen,
        progen,
        progen,
        progen,
      ],
    },
    {
      id: 3,
      title: "Credit platform for importers in Colombia",
      subtitle: "Created design system, aligned previous designs and created new designs for new services",
      images: [
       finkargo,
        finkargo,
        finkargo,
        finkargo,
        finkargo,
        
      ],
    },
  ];

  return (
    <div className="section-work">
      <h1>Work</h1>
      
      <div className="work-items-container">
        {workItems.map((item) => (
          <div key={item.id} className="work-item">
            <div className="work-item-header">
              <h2>{item.title}</h2>
              <p className="subtitle">{item.subtitle}</p>
            </div>
            
            <div className={`work-gallery images-${item.images.length}`}>
              {item.images.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img 
                    src={image} 
                    alt={`${item.title} - ${index + 1}`} 
                    className="work-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;