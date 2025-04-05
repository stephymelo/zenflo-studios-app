import * as React from 'react';


import { Hero } from './Sections/Hero';
import { Services } from './Sections/Services';
import { Workflow } from './Sections/Workflow';

interface Landing {
}

export const Landing: React.FC<Landing> = () => {
    return (
<section className='Landing'>
<Hero />
      <Services />
      <Workflow />
<section className="banner">
        <div className="banner-content">
          <h1>Transform Your Brand with Stunning Design</h1>
          <p>We create modern, impactful designs that elevate your business.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section who-we-are">
        <h2>Who We Are</h2>
        <p>
          We are a team of passionate designers and developers dedicated to crafting
          beautiful, functional, and user-centric designs. Our mission is to help
          businesses stand out in a competitive market.
        </p>
      </section>

      {/* How We Work Section */}
      <section className="section how-we-work">
        <h2>How We Work</h2>
        <p>
          We follow a collaborative and iterative process to ensure your vision comes to life.
          From concept to execution, we work closely with you to deliver a product that
          exceeds expectations.
        </p>
        <ul>
          <li>Research & Strategy</li>
          <li>Design & Prototyping</li>
          <li>Development & Testing</li>
          <li>Launch & Support</li>
        </ul>
      </section>

      {/* Our Services Section */}
      <section className="section services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Branding</h3>
            <p>Create a unique identity for your brand.</p>
          </div>
          <div className="service-item">
            <h3>Web Design</h3>
            <p>Design modern, responsive websites.</p>
          </div>
          <div className="service-item">
            <h3>UI/UX Design</h3>
            <p>Enhance user experience with intuitive designs.</p>
          </div>
          <div className="service-item">
            <h3>Marketing Materials</h3>
            <p>Design brochures, flyers, and more.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="section contact">
        <h2>Contact Us</h2>
        <p>Ready to start your project? Get in touch with us today!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
</section>
);
}