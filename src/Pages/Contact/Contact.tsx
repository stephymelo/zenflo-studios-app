import React from "react";

const Contact = () => {
  return (
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
  );
};

export default Contact;