const reasons = [
  {
    number: "01",
    title: "Authentic Firewood Cooking",
    text: "Traditional firewood preparation brings a distinctive aroma, warmth, and depth of flavour to every batch.",
  },
  {
    number: "02",
    title: "Quality Ingredients",
    text: "Carefully selected ingredients and spices come together to create consistent taste and memorable food.",
  },
  {
    number: "03",
    title: "Customisable Menus",
    text: "Menus can be planned based on your event, guest count, preferences, and celebration style.",
  },
  {
    number: "04",
    title: "Thoughtful Catering",
    text: "From food preparation to serving, every event is handled with care, coordination, and hospitality.",
  },
];

function WhyDhanush() {
  return (
    <section className="why-section">
      <div className="why-heading">
        <p className="section-label">WHY DHANUSH</p>

        <h2>
          Tradition You Can
          <br />
          Taste.
        </h2>
      </div>

      <div className="why-grid">
        {reasons.map((reason) => (
          <div className="why-item" key={reason.number}>
            <span>{reason.number}</span>

            <h3>{reason.title}</h3>

            <p>{reason.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyDhanush;