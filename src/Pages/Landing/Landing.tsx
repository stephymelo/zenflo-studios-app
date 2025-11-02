import * as React from 'react';


import { Hero } from './Sections/Hero';
import Services from './Sections/Services';
import About from './Sections/About';
import Quote from './Sections/Quote';
import Service from './Sections/Service';
import Reel from './Sections/Reel';
import Markets from './Sections/Markets';
import Testimonials from './Sections/Testimonials';

export const Landing: React.FC = () => {
  return (
    <section className='landing'>
      <Hero />
      <Quote />
      <Reel />

      <About />
      <Service />
      {/* <Solutions /> */}
      {/* <Workflow /> */}
      <Services />
      <Markets />
      <Testimonials />







    </section>
  );
}