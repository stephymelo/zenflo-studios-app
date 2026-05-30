import React from 'react';
import Hero from './Sections/Hero';
import Marquee, { MarqueeItem } from './Sections/Marquee';
import About from './Sections/About';
import HorizontalServices from './Sections/HorizontalServices';
import ProcessRail from './Sections/ProcessRail';
import Testimonials from './Sections/Testimonials';
import CtaSection from './Sections/CtaSection';

export const Landing: React.FC = () => {
  return (
    <section className="landing">
      <Hero />
      <Marquee>
        <MarqueeItem text="Branding" />
        <MarqueeItem text="Shopify" />
        <MarqueeItem text="Web Design" />
        <MarqueeItem text="SEO" />
        <MarqueeItem text="Content" />
        <MarqueeItem text="Creative Direction" />
      </Marquee>
      <About />
      <Marquee variant="alt">
        <MarqueeItem text="Beauty" />
        <MarqueeItem text="Wellness" />
        <MarqueeItem text="Skincare" />
        <MarqueeItem text="Lifestyle" />
        <MarqueeItem text="DTC" />
        <MarqueeItem text="E-Commerce" />
      </Marquee>
      <HorizontalServices />
      <ProcessRail />
      {/* <Testimonials /> */}
      <Marquee variant="butter">
        <MarqueeItem text="Let's grow" />
        <MarqueeItem text="Let's bloom" />
        <MarqueeItem text="Let's build" />
        <MarqueeItem text="Let's create" />
      </Marquee>
      <CtaSection />
    </section>
  );
};
