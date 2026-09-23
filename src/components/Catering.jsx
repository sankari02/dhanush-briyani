import { Link } from "react-router-dom";
const services = [
  {
    number: "01",
    title: "Wedding Catering",
    text: "Complete catering support for weddings with carefully planned menus, service, and memorable firewood briyani.",
  },
  {
    number: "02",
    title: "Engagement & Reception",
    text: "Elegant catering for engagement and reception events with menu options suitable for every guest.",
  },
  {
    number: "03",
    title: "Birthday Celebrations",
    text: "Freshly prepared food and customised menu choices for birthdays and joyful family celebrations.",
  },
  {
    number: "04",
    title: "Family Functions",
    text: "Traditional and comforting food prepared for family gatherings, ceremonies, and special occasions.",
  },
  {
    number: "05",
    title: "Corporate Events",
    text: "Professional catering for office gatherings, corporate celebrations, team events, and business occasions.",
  },
  {
    number: "06",
    title: "Bulk Orders",
    text: "Large quantity briyani and food orders prepared with the same care, flavour, and attention to quality.",
  },
];

function Catering() {
  return (
    <section className="catering-section" id="catering">
      <div className="catering-heading">
        <div>
          <p className="section-label">CATERING SERVICES</p>

          <h2>
            Made For Every
            <br />
            Celebration.
          </h2>
        </div>

        <p className="catering-intro">
          From intimate gatherings to large celebrations, Dhanush Briyani brings
          traditional flavour and thoughtful catering to every occasion.
        </p>
      </div>

      <div className="catering-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <span className="service-number">{service.number}</span>

            <h3>{service.title}</h3>

            <p>{service.text}</p>

            <Link to="/contact#quotation">
              Enquire Now <span>→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="catering-cta">
        <p>Planning a celebration?</p>

        <Link to="/contact#quotation">Get Your Quotation</Link>
      </div>
    </section>
  );
}

export default Catering;