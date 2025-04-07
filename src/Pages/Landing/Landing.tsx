import * as React from 'react';


import { Hero } from './Sections/Hero';
import { Services } from './Sections/Services';
import { Workflow } from './Sections/Workflow';
import Solutions from './Sections/Solutions';

interface Landing {
}

export const Landing: React.FC<Landing> = () => {
  return (
    <section className='Landing'>
      <Hero />
      <Solutions />
      <Services />
      <Workflow />

      <section className="section who-we-are">
        <h2>Who We Are</h2>
        <p>
          We are a team of passionate designers and developers dedicated to crafting
          beautiful, functional, and user-centric designs. Our mission is to help
          businesses stand out in a competitive market.
        </p>
      </section>



    </section>
  );
}