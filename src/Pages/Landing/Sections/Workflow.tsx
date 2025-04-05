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
      </section>
    );
  };