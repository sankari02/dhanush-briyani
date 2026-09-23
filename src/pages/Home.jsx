import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import ServicesPreview from "../components/ServicesPreview";
import WhyChooseDhanush from "../components/WhyChooseDhanush";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import EventMarquee from "../components/EventMarquee";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutIntro />
      <ServicesPreview />
      <WhyChooseDhanush />
      <Testimonials />
<EventMarquee />
<Footer />
    </>
  );
}

export default Home;
