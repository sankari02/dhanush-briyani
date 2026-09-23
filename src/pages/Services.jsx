import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InnerPageHero from "../components/InnerPageHero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventMarquee from "../components/EventMarquee";
import weddingImage from "../assets/images/wedding-catering.png";
import engagementImage from "../assets/images/about-banner-briyani.png";
import birthdayImage from "../assets/images/birthday-catering.png";
import familyImage from "../assets/images/why-catering.png";
import corporateImage from "../assets/images/corporate-catering.png";
import bulkImage from "../assets/images/why-firewood.png";
import "../components/Services.css";

const cateringServices = [
  { id: "wedding", title: "Wedding Catering", image: weddingImage, alt: "Wedding celebration catering", text: "Traditional firewood briyani and thoughtful catering prepared for wedding celebrations and memorable family gatherings." },
  { id: "engagement", title: "Engagement & Reception", image: engagementImage, alt: "Briyani prepared for an engagement or reception", text: "Celebrate the occasion with flavourful briyani and catering prepared with care for your guests." },
  { id: "birthday", title: "Birthday Celebrations", image: birthdayImage, alt: "Catering for a birthday celebration", text: "Bring family and friends together with authentic firewood briyani prepared for birthday celebrations." },
  { id: "family", title: "Family Functions", image: familyImage, alt: "Food prepared for a family gathering", text: "From intimate family gatherings to special occasions, we serve freshly prepared food made for sharing." },
  { id: "corporate", title: "Corporate Events", image: corporateImage, alt: "Catering for a corporate event", text: "Reliable catering for office gatherings, team celebrations and corporate occasions." },
  { id: "bulk", title: "Bulk Orders", image: bulkImage, alt: "Traditional firewood briyani cooking", text: "Authentic firewood briyani prepared for larger gatherings and celebrations with planned bulk-order service." },
];

function CateringServices() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      grid.classList.add("is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      grid.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="catering-listing" aria-labelledby="catering-listing-heading">
        <header className="catering-listing-header">
          <p className="catering-listing-eyebrow">WHAT WE DO</p>
          <h2 id="catering-listing-heading">Catering for Every<br /><em>Celebration.</em></h2>
          <p>From intimate gatherings to grand celebrations, we bring authentic firewood briyani and thoughtful catering to every occasion.</p>
        </header>
        <div className="catering-card-grid" ref={gridRef}>
          {cateringServices.map((service, index) => (
            <article className="catering-card" key={service.id} style={{ "--card-delay": `${(index % 3) * 100}ms` }}>
              <div className="catering-card-image"><img src={service.image} alt={service.alt} loading="lazy" width="1200" height="900" /></div>
              <span className="catering-card-goldline" aria-hidden="true" />
              <div className="catering-card-content">
                <span className="catering-card-number">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to="/contact#quotation" aria-label={`Discover ${service.title} and request a quotation`}>DISCOVER <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  );
}

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="db-services-page inner-page-shell">
        <div className="about-page-reveal">
          <InnerPageHero title="Catering" />
        </div>
        <CateringServices />
      </main>
      <EventMarquee />
      <Footer />
    </>
  );
}
