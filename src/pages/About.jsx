import InnerPageHero from "../components/InnerPageHero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import EventMarquee from "../components/EventMarquee";
import bannerImage from "../assets/images/about-banner-briyani.png";
import briyaniImage from "../assets/about-briyani.png";
import firewoodImage from "../assets/about-firewood.png";
import logo from "../assets/images/db log.png";
import FounderSection from "../components/FounderSection";
import "./About.css";

function About() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <div className="about-page-reveal">
        <InnerPageHero title="About Us" />

        <section className="about-page-intro about-page-container about-page-section" aria-labelledby="about-introduction-heading">
          <div className="about-page-photos">
            <img className="about-page-photo-first" src={briyaniImage} alt="Briyani prepared with aromatic rice and spices" loading="lazy" />
            <img className="about-page-photo-second" src={firewoodImage} alt="Traditional briyani preparation over a firewood flame" loading="lazy" />
            <div className="about-page-since" aria-label="Dhanush Briyani logo"><img src={logo} alt="Dhanush Briyani" /></div>
          </div>
          <div>
            <p className="about-page-label">ABOUT US</p>
            <h2 id="about-introduction-heading">Tradition, Firewood &amp;<br />Flavour in Every<br /><em>Celebration.</em></h2>
            <p className="about-page-copy">Dhanush Briyani began two years ago with a simple passion — serving authentic firewood-cooked briyani with rich flavour and care. From small gatherings to memorable celebrations, we focus on traditional preparation, quality ingredients, and food that brings people together.</p>
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
