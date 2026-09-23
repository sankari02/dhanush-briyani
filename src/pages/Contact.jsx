import { useEffect, useRef } from "react";
import InnerPageHero from "../components/InnerPageHero";
import Navbar from "../components/Navbar";
import QuotationForm from "../components/QuotationForm";
import EventMarquee from "../components/EventMarquee";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";


import "./Contact.css";

export default function Contact() {
  const contentRef = useRef(null);
  useEffect(() => {
    const content = contentRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const panels = content.querySelectorAll(".quotation-left, .quotation-right");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("contact-panel-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .05 });
    content.classList.add("contact-reveal");
    panels.forEach(panel => observer.observe(panel));
    const reveal = () => {
      if (motion.matches) {
        content.classList.remove("contact-reveal");
        observer.disconnect();
      }
    };
    motion.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", reveal);
      content.classList.remove("contact-reveal");
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <div className="about-page-reveal">
        <InnerPageHero title="Contact Us" />
        <div ref={contentRef} className="contact-page-content inner-page-reveal-content"><QuotationForm /></div>
        </div>
      </main>
      <Testimonials />
      <EventMarquee />
      <Footer />
    </>
  );
}
