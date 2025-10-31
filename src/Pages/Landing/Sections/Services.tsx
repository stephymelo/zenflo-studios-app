import React from 'react';
import leaf from '../../../Assets/Media/bamboo-shoot-mini.svg'; 

interface Service {
  id: number;
  name: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    { id: 1, name: 'Shopify Website' },
    { id: 2, name: 'Website Design' },
    { id: 3, name: 'Branding' },
    { id: 5, name: 'Visual Styling' },
    { id: 6, name: 'Content Creation' },
    { id: 7, name: 'Print' },
    { id: 8, name: 'Photo Direction' },
    { id: 11, name: 'Google Ads' },
    { id: 12, name: 'UX Strategy' },
    { id: 13, name: 'User and Market Research' },
  ];

  return (
    <div className="services">
      <div className='services-container'>

        <div className='services-title'>
          <h4>Services</h4>
          <p className='services-title__description'>From digital spaces to tangible moments, we create connection and interaction.</p>
        </div>
        <div className="services-pills">
          {services.map((service, index) => (
            <React.Fragment key={service.id}>
              <p className="service-pill">
                {service.name}
              </p>

              {/* {(index + 1 === 3 || index + 1 === 8 || index + 1 === 11) && (
              <img 
                src={leaf} 
                alt="Divider" 
                className="leaf-divider" 
              />
            )} */}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Services;