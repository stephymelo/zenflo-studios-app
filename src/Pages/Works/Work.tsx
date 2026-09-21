import React from "react";
import { useSeo } from "../../utils/useSeo";
import { t, ntCls } from "../../Components/LanguageToggle/LanguageToggle";

import catalog from '../../Assets/Projects/catalog-men-nil-mockup.png';
import catalogW from '../../Assets/Projects/catalog-women-mockup.png';
import catalogA from '../../Assets/Projects/catalog-accessory.png';
import progen from '../../Assets/Projects/progen-mockup.png';
import progenbook from '../../Assets/Projects/progen-brandbook-mockup.png';
import progenWeb from '../../Assets/Projects/progen-web.png';

interface WorkItem {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
}

const Work: React.FC = () => {
  useSeo(
    'Work — Zenflo Studios | Shopify Builds, Brand & Content Projects',
    'Selected projects: custom Shopify stores and apps, catalogs, brand books, and content for small product brands.',
    '/work'
  );
  // Sample data - replace with your actual work items
  const workItems: WorkItem[] = [
    {
      id: 1,
      title: t("Catalogs for print and digital", "Catálogos para impresión y digital"),
      subtitle: t("Re-designing the catalogs to better fit the products, improve readibility and navigation. Designed covers and took photos for catalog use. ", "Rediseño de los catálogos para ajustarse mejor a los productos y mejorar la lectura y la navegación. Diseñamos las portadas y tomamos las fotos para el catálogo."),
      images: [
        catalog,
        catalogW,
        catalogA,
      ],
    },
    {
      id: 2,
      title: t("E-commerce for Hair Care with Branding", "E-commerce de cuidado capilar con branding"),
      subtitle: t("Designed brand book for socials and web. Built e-commerse with Shopify, customized to the brands needs to include Wholesale, interactive elements, and more.", "Diseñamos el brand book para redes y web. Construimos el e-commerce en Shopify, personalizado a las necesidades de la marca con mayoreo, elementos interactivos y más."),
      images: [
        progen,
        progenWeb,
        progenbook,
      
      ],
    },
    // {
    //   id: 3,
    //   title: "Credit platform for importers in Colombia",
    //   subtitle: "Created design system, aligned previous designs and created new designs for new services. Working with developers that used React and integrations for a Web-based platform that connected not only the customers, but also internal and admin functionalities.",
    //   images: [
    //    finkargo,
    //     finkargoButton,
    //     finkargoColor,
     
        
    //   ],
    // },
  ];

  return (
    <div className={ntCls("section-work")}>
      <h1>{t("Work", "Proyectos")}</h1>
      
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