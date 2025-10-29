import * as React from 'react';


import { Hero } from './Sections/Hero';
import Services  from './Sections/Services';
import { Workflow } from './Sections/Workflow';
import About from './Sections/About';
import Solutions from './Sections/Solutions';
import Projects from './Sections/Projects';
import Quote from './Sections/Quote';
import Service from './Sections/Service';

interface Landing {
}

export const Landing: React.FC<Landing> = () => {
  return (
    <section className='landing'>
      <Hero />
      <About/>
      <Service/>
      {/* <Solutions /> */}
      {/* <Workflow /> */}
      <Services />

      <Quote/>

 

   


    </section>
  );
}