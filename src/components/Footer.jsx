import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/db log.png";
import { services } from "../data/services";
import "./Footer.css";

const instagram = "https://www.instagram.com/dhanush_.briyani/";
const whatsapp = "https://wa.me/919344496756";
const explore = [["Home", "/"], ["About Us", "/about"], ["Catering", "/services"], ["Contact Us", "/contact"], ["Get Quotation", "/contact#quotation"]];

function FooterIcon({ type }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" /></>}
      {type === "whatsapp" && <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 21l1.6-5A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="m8 7 2 3-1.2 1.2a9 9 0 0 0 4 4L14 14l3 2c-1 3-4 2-6 0S6 10 8 7Z" /></>}
      {type === "phone" && <path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3c-1 5-5 5-10 1S1 8 3 5l4-2Z" />}
      {type === "fire" && <><path d="M13 2c3 5-3 6-1 10 2-1 3-3 3-5 4 4 6 8 3 11a7 7 0 0 1-12-4c0-3 2-5 4-7-1 3 0 4 1 5" /><path d="m4 21 16 2M4 23l16-2" /></>}
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  useEffect(() => {
    const footer = footerRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    footer.classList.add("db-footer-animate");
    footer.querySelectorAll(".db-footer-column").forEach(column => observer.observe(column));
    const reveal = () => {
      if (motion.matches) {
        footer.classList.remove("db-footer-animate");
        observer.disconnect();
      }
    };
    motion.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", reveal);
      footer.classList.remove("db-footer-animate");
    };
  }, []);

  const backToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });

  return (
    <footer className="db-footer" ref={footerRef}>
      <span className="db-footer-watermark" aria-hidden="true">DHANUSH</span>
      <svg className="db-footer-art" viewBox="0 0 480 400" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M90 168h235l-17 110q-100 48-201 0ZM78 162h260M112 152q95-78 190 0M195 108V93h25v15M91 182H62v42h35m227-42h29v42h-35M88 355l248 27M88 382l248-27M180 340q-25-29 2-59c-3 19 20 15 16 38m35 21q30-32 2-59c4 24-23 23-19 42M148 83c-28-24 22-36 0-60m62 58c-28-24 22-36 0-60m63 61c-28-24 22-36 0-60" />
        <path d="M382 120q-12-55 59-77c6 61-25 92-59 77Zm-7 25 52-85M25 90l13-22 5 25 24 3-21 15 4 25-19-16-23 10 10-23-17-18Z" />
      </svg>
      <div className="db-footer-inner">
        <div className="db-footer-grid">
          <div className="db-footer-column db-footer-brand">
            <Link to="/" className="db-footer-brand-link" aria-label="Dhanush Briyani home"><img src={logo} alt="" width="70" height="70" loading="lazy" /><h2>Dhanush<br />Briyani</h2></Link>
            <p className="db-footer-tagline">AUTHENTIC FIREWOOD BRIYANI</p>
            <p className="db-footer-description">Authentic firewood-cooked briyani and thoughtful catering crafted for celebrations worth remembering.</p>
            <div className="db-footer-socials">
              <a href={instagram} target="_blank" rel="noreferrer" aria-label="Dhanush Briyani on Instagram"><FooterIcon type="instagram" /></a>
              <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Dhanush Briyani on WhatsApp"><FooterIcon type="whatsapp" /></a>
            </div>
          </div>
          <nav className="db-footer-column" aria-labelledby="footer-explore-heading">
            <h3 id="footer-explore-heading">EXPLORE</h3>
            <ul className="db-footer-links">{explore.map(([label, to]) => <li key={to}><Link to={to}><span aria-hidden="true">→</span>{label}</Link></li>)}</ul>
          </nav>
          <nav className="db-footer-column" aria-labelledby="footer-catering-heading">
            <h3 id="footer-catering-heading">CATERING</h3>
            <ul className="db-footer-links">{services.map(service => <li key={service.id}><Link to={`/services#${service.id}`}><span aria-hidden="true">→</span>{service.title}</Link></li>)}</ul>
          </nav>
          <div className="db-footer-column db-footer-contact">
            <h3>CONTACT</h3>
            <div className="db-footer-contact-item"><FooterIcon type="phone" /><div><span>PHONE / WHATSAPP</span><a href="tel:+919344496756">+91 93444 96756</a></div></div>
            <div className="db-footer-contact-item"><FooterIcon type="instagram" /><div><span>INSTAGRAM</span><a href={instagram} target="_blank" rel="noreferrer">@dhanush_.briyani</a></div></div>
            <div className="db-footer-contact-item"><FooterIcon type="fire" /><div><span>SPECIALITY</span><p>Authentic Firewood Briyani<br />&amp; Catering</p></div></div>
          </div>
        </div>
        <p className="db-footer-signature">CRAFTED OVER FIRE.</p>
        <div className="db-footer-bottom">
          <p>© {new Date().getFullYear()}  Dhanush Caterings All rights reserved | Designed By sankari.v</p>
          <button type="button" onClick={backToTop}>BACK TO TOP <span aria-hidden="true">↑</span></button>
        </div>
      </div>
    </footer>
  );
}
