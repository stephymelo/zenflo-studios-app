export const Services = () => {
    const services = [
      {
        title: "Graphic Design",
        items: ["Social media graphics", "Presentation design", "Print collateral"]
      },
      {
        title: "Digital Design",
        items: ["Web & app UI", "Banners & ads", "Email templates"]
      },
      {
        title: "Motion Design",
        items: ["Animated ads", "Explainer videos", "Micro-animations"]
      }
    ];
  
    return (
      <section className="services">
        <h2>Design services we offer</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <ul>
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  };