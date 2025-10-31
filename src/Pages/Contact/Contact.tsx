import React, { useState } from "react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/zenflo.studios@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Contact Form Submission"
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__description">
  You can email us at{" "}
  <a
    href="mailto:hello@zenflostudios.com"
    className="contact__email-button"
  >
    hello@zenflostudios.com
  </a>{" "}
  or shoot us a message :)
</p>
        
        {submitStatus === "success" && (
          <div className="contact__alert contact__alert--success">
            Thank you! Your message has been sent successfully.
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="contact__alert contact__alert--error">
            There was an error sending your message. Please try again later.
          </div>
        )}

        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="contact__input"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="contact__input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
            <input
            type="text"
            name="company"
            className="contact__input"
            placeholder="Company"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="contact__textarea"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className={`contact__button ${isSubmitting ? "contact__button--disabled" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;