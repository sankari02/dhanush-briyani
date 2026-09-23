function FirewoodDifference() {
  const steps = [
    {
      number: "01",
      title: "FIRE",
      text: "Traditional firewood cooking creates natural heat, aroma, and depth of flavour.",
    },
    {
      number: "02",
      title: "INGREDIENTS",
      text: "Quality rice, spices, meat, and fresh ingredients are carefully selected for every batch.",
    },
    {
      number: "03",
      title: "CRAFT",
      text: "Slow cooking and careful preparation bring every layer of flavour together.",
    },
    {
      number: "04",
      title: "FEAST",
      text: "The result is rich, aromatic briyani made to be enjoyed around memorable celebrations.",
    },
  ];

  return (
    <section className="firewood-section">
      <div className="firewood-heading">
        <p className="section-label">THE FIREWOOD DIFFERENCE</p>

        <h2>
          Slow Fire.
          <br />
          Deep Flavour.
        </h2>

        <p>
          Firewood cooking is not just a method. It is part of the character,
          aroma, and experience behind every Dhanush Briyani celebration.
        </p>
      </div>

      <div className="firewood-steps">
        {steps.map((step) => (
          <div className="firewood-step" key={step.number}>
            <span className="step-number">{step.number}</span>

            <div className="step-line"></div>

            <h3>{step.title}</h3>

            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FirewoodDifference;