import { useEffect, useRef } from "react";
import founderImage from "../assets/images/dhanush-founder.png";
import "./FounderSection.css";

function FounderSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="founder-section" aria-labelledby="founder-heading" ref={sectionRef}>
      <div className="founder-inner">
        <p className="founder-eyebrow">THE PERSON BEHIND THE FLAME</p>

        <div className="founder-layout">
          <div className="founder-visual">
            <div className="founder-portrait-frame">
              <img src={founderImage} alt="Dhanush, founder of Dhanush Briyani" loading="lazy" />
            </div>
            <div className="founder-index" aria-hidden="true">
              <span>01</span>
              <small>FOUNDER</small>
            </div>
          </div>

          <div className="founder-copy">
            <h2 id="founder-heading">Meet the<br /><em>Founder.</em></h2>
            <div className="founder-identity">
              <h3>Mr.Dhanush</h3>
              <p className="founder-role">FOUNDER — DHANUSH BRIYANI</p>
              <p className="founder-qualification">B.Sc. Computer Science</p>
            </div>
            <span className="founder-divider" aria-hidden="true" />
            <p className="founder-story">
              Dhanush Briyani began with a passion for bringing the authentic taste of traditional firewood-cooked briyani to celebrations. With a focus on careful preparation, quality ingredients and traditional cooking, the journey continues with one simple purpose — to make every feast memorable.
            </p>
            <p className="founder-signoff">AUTHENTIC FIREWOOD BRIYANI</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderSection;
