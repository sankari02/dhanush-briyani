import { useEffect, useRef } from "react";
import firewoodPhoto from "../assets/images/why-firewood.png";
import cateringPhoto from "../assets/images/why-catering.png";
import freshPrepPhoto from "../assets/images/why-fresh-prep.png";
import ingredientsPhoto from "../assets/images/why-ingredients.png";
import naturalCookingPhoto from "../assets/images/why-natural-cooking.png";
import "./WhyChooseDhanush.css";

const promisePhotos = [
  { src: firewoodPhoto, alt: "Traditional firewood cooking beneath a briyani vessel" },
  { src: cateringPhoto, alt: "Catering preparation and serving setup for a celebration" },
  { src: freshPrepPhoto, alt: "Clean, professional fresh food preparation" },
  { src: ingredientsPhoto, alt: "Spices, rice and herbs for traditional briyani" },
  { src: naturalCookingPhoto, alt: "Traditional cooking with fresh, natural ingredients" },
];

const reasons = [
  { title: "Cooked with Casuarina Wood", text: "Our briyani is traditionally cooked using only Casuarina wood for an authentic firewood cooking experience.", icon: "wood" },
  { title: "On-Time Catering", text: "We focus on timely preparation and catering service for every celebration.", icon: "clock" },
  { title: "Fresh-Cut Meat", text: "No pre-cut meat. Meat is freshly cut for every cooking batch.", icon: "chef" },
  { title: "Quality Ingredients", text: "Made with quality ingredients, crafted for great taste, and served with your satisfaction in mind.", icon: "ingredients" },
  { title: "No Palm Oil. No Ajinomoto.", text: "We never use palm oil or Ajinomoto in our catering.", icon: "leaf" },
];

function ReasonIcon({ type }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "wood" && <><path d="M18 3c2 6-4 7-3 11 2-1 3-3 3-5 4 4 6 7 5 10a7 7 0 0 1-14-1c0-3 2-6 4-8-1 4 0 5 1 6" /><path d="m6 26 20 3M6 29l20-3" /></>}
      {type === "clock" && <><circle cx="16" cy="16" r="12" /><path d="M16 8v8l5 3M14 4h4" /></>}
      {type === "chef" && <><path d="M9 21v-7a5 5 0 1 1 2-9 6 6 0 0 1 10 0 5 5 0 1 1 2 9v7ZM9 24h14v4H9ZM13 13v5m6-5v5" /></>}
      {type === "ingredients" && <><path d="M5 18h22a11 11 0 0 1-22 0ZM10 29h12M16 18V7M16 12C9 12 7 8 8 4c6 0 8 3 8 8ZM16 15c7 0 10-4 9-8-6 0-9 3-9 8Z" /></>}
      {type === "leaf" && <><path d="M7 23C0 12 13 4 27 5c1 13-5 23-16 19M5 28 22 11M11 21v-7m5 2h7" /></>}
    </svg>
  );
}

export default function WhyChooseDhanush() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const items = [...section.querySelectorAll(".db-why-promise")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const configure = () => {
      cleanup();
      if (motion.matches || !("IntersectionObserver" in window)) {
        section.classList.remove("db-why-animate");
        path.style.setProperty("--progress", 1);
        return;
      }
      section.classList.add("db-why-animate");
      let frame = 0;
      let inView = false;
      const update = () => {
        frame = 0;
        const rect = path.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight * .7 - rect.top) / rect.height));
        path.style.setProperty("--progress", progress);
      };
      const schedule = () => {
        if (inView && !frame) frame = window.requestAnimationFrame(update);
      };
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .2, rootMargin: "0px 0px -8% 0px" });
      items.forEach(item => revealObserver.observe(item));
      const sectionObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        schedule();
      });
      sectionObserver.observe(section);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
      cleanup = () => {
        revealObserver.disconnect();
        sectionObserver.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        window.cancelAnimationFrame(frame);
      };
    };
    configure();
    motion.addEventListener("change", configure);
    return () => {
      cleanup();
      motion.removeEventListener("change", configure);
      section.classList.remove("db-why-animate");
    };
  }, []);

  return (
    <section className="db-why" id="why-choose-dhanush" ref={sectionRef} aria-labelledby="db-why-heading">
      <div className="db-why-inner">
        <header className="db-why-header">
          <p className="db-why-label">WHY CHOOSE US</p>
          <h2 id="db-why-heading">Why <em>Dhanush Briyani?</em></h2>
          <p className="db-why-subtitle">Five promises behind every feast.</p>
        </header>
        <div className="db-why-journey">
          <div className="db-why-path" ref={pathRef} aria-hidden="true"><span /></div>
          <div className="db-why-embers" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <i key={index} style={{ "--ember-index": index }} />)}
          </div>
          <ol className="db-why-promises">
            {reasons.map(({ title, text, icon }, index) => (
              <li className="db-why-promise" key={title}>
                <span className="db-why-dot" aria-hidden="true" />
                <article className="db-why-content">
                  <div className="db-why-number" aria-hidden="true">0{index + 1}</div>
                  <div className="db-why-detail">
                    <span className="db-why-icon"><ReasonIcon type={icon} /></span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <figure className="db-why-photo">
                    <div className="db-why-photo-zoom">
                      <img src={promisePhotos[index].src} alt={promisePhotos[index].alt} loading="lazy" decoding="async" />
                    </div>
                  </figure>
                </article>
              </li>
            ))}
          </ol>
          <div className="db-why-ending"><span aria-hidden="true">◇</span><p>OUR PROMISE</p></div>
        </div>
      </div>
    </section>
  );
}
