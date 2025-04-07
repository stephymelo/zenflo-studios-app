export const Workflow = () => {
    const steps = [
      {
        title: "Request",
        description: "Submit your design brief through our platform"
      },
      {
        title: "Match",
        description: "We assign the perfect designer for your needs"
      },
      {
        title: "Deliver",
        description: "Receive your files in hours, not weeks"
      }
    ];
  
    return (
      <section className="workflow">
        <h2>How it works</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        
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
      </section>
    );
  };