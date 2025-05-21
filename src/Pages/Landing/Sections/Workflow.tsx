// export const Workflow = () => {
//   const steps = [
//     {
//       title: "Story",
//       duration: "1 week",
//       description: "Share your story and objectives. What you need and want"
//     },
//     {
//       title: "Strategy",
//       duration: "1 week",
//       description: "We investigate and comprehend the product's core value and target market"
//     },
//     {
//       title: "Design",
//       duration: "1-2 weeks",
//       description: "Now that we have a plan and KPI's, we start creating"
//     },
//     {
//       title: "Feedback & changes",
//       duration: "1 week",
//       description: "It's important for us to know your opinion and do the necessary changes"
//     },
//     {
//       title: "Final product",
//       description: "We finally present and deliver the product, ready to launch"
//     }
//   ];

//   return (
//     <section className="workflow">
//       <div className="workflow-richtext">
//         <h2>How We Flow</h2>
//         <p className="subtitle">
//           We follow a collaborative and iterative process to ensure your vision comes to life.
//           From concept to execution, we work closely with you to deliver a product that
//           exceeds expectations.
//         </p>
//       </div>

//       <div className="timeline-container">
//         {steps.map((step, index) => (
//           <div key={index} className="step">
//             {step.duration && <p className="step-duration">{step.duration}</p>}
//             <div className="step-content">
//               <h3>{step.title}</h3>
//               <p>{step.description}</p>
//             </div>
//             <div className="step-marker"></div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

import bamboo from '../../../Assets/Media/bamboo-shoot.svg';

export const Workflow = () => {
  const steps = [
    {
      title: "Story",
      duration: "1 day",
      description: "Share your story and objectives. What you need and want"
    },
    {
      title: "Strategy",
      duration: "1 week",
      description: "We investigate and comprehend the product's core value and target market"
    },
    {
      title: "Design",
      duration: "1-2 weeks",
      description: "Now that we have a plan and KPI's, we start creating"
    },
    {
      title: "Feedback & changes",
      duration: "1 week",
      description: "It's important for us to know your opinion and do the necessary changes"
    },
    {
      title: "Final product",
      duration: "1 week",
      description: "We present and deliver the product, ready to launch"
    }
  ];

  return (
    <section className="workflow">
      <div className="workflow-richtext">
        <h2>How We Flow</h2>
        <p className="subtitle">
          We follow a collaborative and iterative process to ensure your vision comes to life.
      
        </p>
      </div>

      <div className="timeline-container">
        {/* Gray container for Story and Strategy */}
        <img src={bamboo}></img>
        <div className="planning-container">
          {steps.slice(0, 2).map((step, index) => (
            <div key={index} className="step">
              {step.duration && <p className="step-duration">{step.duration}</p>}
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-marker"></div>
            </div>
          ))}
        </div>

        {/* Green container for Design and Final Product */}
        <div className="execution-container">
          {steps.slice(2).map((step, index) => (
            <div key={index + 2} className="step">
              {step.duration && <p className="step-duration">{step.duration}</p>}
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-marker"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};