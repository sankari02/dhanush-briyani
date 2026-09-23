import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { servicePreviews } from "../data/services";
import "./Services.css";

export default function ServicesPreview() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        grid.classList.add("db-services-visible");
        observer.disconnect();
      }
    }, { threshold: 0.05 });
    grid.classList.add("db-services-animate");
    observer.observe(grid);
    const reveal = () => {
      if (motion.matches) {
        grid.classList.add("db-services-visible");
        observer.disconnect();
      }
    };
    motion.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", reveal);
      grid.classList.remove("db-services-animate");
    };
  }, []);

  return (
    <section className="db-services-preview" id="services" aria-labelledby="services-preview-heading">
      <div className="db-services-container">
        <header className="db-services-intro">
          <p className="db-services-label">WHAT WE DO</p>
          <h2 id="services-preview-heading">Premium Services</h2>
        </header>
        <div className="db-services-grid" ref={gridRef}>
          {servicePreviews.map((service, index) => (
            <article className="db-services-preview-item" key={service.id} style={{ "--service-delay": `${index * 120}ms` }}>
              <Link className="db-services-preview-link" to={`/services#${service.id}`}>
                <div className="db-services-photo"><img src={service.image} alt={service.alt} loading="lazy" width="800" height="620" /></div>
                <div className="db-services-item-meta"><span>0{index + 1}</span><span className="db-services-rule" /></div>
                <h3>{service.title}</h3>
                <p className="db-services-copy">{service.text}</p>
                <span className="db-services-arrow" aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="db-services-preview-bottom"><Link className="db-services-button" to="/services">VIEW ALL SERVICES <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}
