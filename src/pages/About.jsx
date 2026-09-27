import InnerPageHero from "../components/InnerPageHero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import EventMarquee from "../components/EventMarquee";
import bannerImage from "../assets/images/why-firewood.png";
import shopImage from "../assets/images/Dhanush Briyani shop.png";
import FounderSection from "../components/FounderSection";
import { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const shopStoryRef = useRef(null);

  useEffect(() => {
    const section = shopStoryRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || reduceMotion.matches || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    section.classList.add("about-shop-reveal");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="about-page">
        <div className="about-page-reveal">
        <InnerPageHero title="About Us" />

        <section ref={shopStoryRef} className="about-page-intro about-page-container about-page-section" aria-labelledby="about-introduction-heading">
          <figure className="about-shop-photo">
            <img src={shopImage} alt="The Dhanush Briyani shop in the evening, with its signboard and customers" loading="lazy" />
          </figure>
          <div className="about-shop-copy">
            <p className="about-page-label">OUR SHOP</p>
            <h2 id="about-introduction-heading">Where the Night Meets<br /><em>Dhanush Briyani.</em></h2>
            <p className="about-page-copy">Dhanush Briyani comes alive in the evening, serving freshly prepared briyani through the night until midnight. What started with a passion for authentic firewood cooking has grown into a place where people gather for hot, flavourful briyani after the sun goes down.</p>
            <p className="about-shop-highlights">EVENING TO MIDNIGHT <span aria-hidden="true">�</span> FRESHLY PREPARED <span aria-hidden="true">�</span> FIREWOOD COOKED</p>
          </div>
        </section>

        </div>

        <section className="about-page-container about-page-section about-page-firewood" aria-labelledby="firewood-tradition-heading">
          <div>
            <p className="about-page-label">THE FIREWOOD TRADITION</p>
            <h2 id="firewood-tradition-heading">Cooked Over Fire.<br /><em>Made with Tradition.</em></h2>
            <p className="about-page-copy">At Dhanush Briyani, we use Casuarina wood for traditional firewood cooking. Cooking over a wood fire is at the heart of our preparation, keeping tradition close to every batch of briyani we serve.</p>
            <p className="about-page-copy">From the ingredients we select to the care we take at the stove, our focus stays on authentic flavour and a meal made for your celebration.</p>
          </div>
          <figure>
            <img src={bannerImage} alt="Briyani and firewood, at the heart of our cooking tradition" loading="lazy" />
            <figcaption>CASUARINA WOOD. AUTHENTIC FIREWOOD COOKING.</figcaption>
          </figure>
        </section>

        <FounderSection />
</main>
      <Testimonials />
      <EventMarquee />
      <Footer />
    </>
  );
}

export default About;
