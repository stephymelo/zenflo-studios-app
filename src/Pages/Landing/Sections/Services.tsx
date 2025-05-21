import React from 'react';
import leaf from '../../../Assets/Media/leaf-zen.svg';
import rightpic from '../../../Assets/Media/zenflo-flow.svg';

interface Services {
  id: number;
  name: string;
}

const Services: React.FC = () => {
  const services: Services[] = [
    { id: 1, name: 'Website Development' },
    { id: 2, name: 'Website Design' },
    { id: 3, name: 'Content Design' },
    { id: 4, name: 'Product Design' },
    { id: 5, name: 'Prototyping' },
    { id: 6, name: 'Content Creation' },
    { id: 7, name: 'Printables' },
    { id: 8, name: 'Meta Ads' },
    { id: 9, name: 'UI & UX Design' },
    { id: 10, name: 'Market Research' },
    { id: 11, name: 'Google Ads' },
    { id: 12, name: 'UX Strategy' },
    { id: 13, name: 'User Research' },
    { id: 14, name: 'Slide Decks' },
  ];

  return (
    <div className="services-container">
      <div className="services-pills">
        {services.map((service, index) => (
          <React.Fragment key={service.id}>
            <p className="service-pill">
              {service.name}
            </p>

            {(index + 1 === 3 || index + 1 === 8 || index + 1 === 11) && (
              <img 
                src={leaf} 
                alt="Divider" 
                className="leaf-divider" 
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="services-image">
     
      
         <img className='image-placeholder' src={rightpic}></img>
       
      </div>
    </div>
  );
};

export default Services;