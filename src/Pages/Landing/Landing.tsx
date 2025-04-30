import * as React from 'react';


import { Hero } from './Sections/Hero';
import Services  from './Sections/Services';
import { Workflow } from './Sections/Workflow';
import Solutions from './Sections/Solutions';
import Projects from './Sections/Projects';
import Quote from './Sections/Quote';

interface Landing {
}

export const Landing: React.FC<Landing> = () => {
  return (
    <section className='landing'>
      <Hero />
      <Solutions />
      <Workflow />
      <Services />
      <Projects/>
      <Quote/>

 

   


    </section>
  );
}