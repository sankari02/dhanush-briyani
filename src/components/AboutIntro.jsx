import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import briyaniImage from "../assets/about-briyani.png";
import firewoodImage from "../assets/about-firewood.png";

const highlights = [
  { title: "2 Years", caption: "Serving with Passion", icon: "flame" },
  { title: "Firewood Cooking", caption: "Traditional Preparation", icon: "chef" },
  { title: "Event Catering", caption: "Crafted for Celebrations", icon: "catering" },
];

function AboutIcon({ type }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "flame" ? (
        <><path d="M17 3c2 6-3 7-2 11 2-1 3-3 3-5 5 4 7 7 6 11a8 8 0 0 1-16-1c0-4 3-7 5-9-1 4 0 5 1 6" /><path d="m7 28 18-3M7 25l18 3" /></>
      ) : type === "chef" ? (
        <><path d="M10 21v-6a5 5 0 1 1 1-10 6 6 0 0 1 10 0 5 5 0 1 1 1 10v6ZM10 24h12v4H10ZM16 12v6M12 12l1 6m7-6-1 6" /></>
      ) : (
        <><path d="M5 23a11 11 0 0 1 22 0ZM3 27h26M16 9v3M13 9h6M7 4v4M5 6h4m16-3v4m-2-2h4" /></>
      )}
    </svg>
  );
}

function AboutIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        section.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    section.classList.add("about-intro-animate");
    observer.observe(section);
    const reveal = () => {
      if (motion.matches) {
        section.classList.add("is-visible");
        observer.disconnect();
      }
    };
    motion.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", reveal);
      section.classList.remove("about-intro-animate");
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-intro" id="about" aria-labelledby="about-intro-heading">
      <svg className="about-intro-botanical" viewBox="0 0 200 300" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M30 290Q130 150 135 15M68 232Q5 185 30 130Q80 158 68 232ZM92 187Q155 185 181 115Q120 115 92 187ZM111 137Q53 116 70 62Q116 82 111 137ZM126 87Q170 76 173 23Q135 34 126 87Z" />
      </svg>
      <div className="about-intro-inner">
        <div className="about-intro-images">
          <img className="about-intro-image about-intro-image-first" src={briyaniImage} alt="Briyani prepared with aromatic rice and spices" loading="lazy" />
          <img className="about-intro-image about-intro-image-second" src={firewoodImage} alt="Traditional briyani preparation over a firewood flame" loading="lazy" />
          <span className="about-intro-assembly-spark" aria-hidden="true" />
          <div className="about-intro-badge" aria-label="Since 2024">
            <svg className="about-intro-badge-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="59.5" pathLength="100" />
            </svg>
            <span>SINCE</span>
            <strong>2024</strong>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="about-intro-content">
          <p className="about-intro-label">ABOUT US</p>
          <h2 id="about-intro-heading">Tradition, Firewood &amp;<br />Flavour in Every <span>Celebration.</span></h2>
          <p className="about-intro-description">
            Dhanush Briyani began two years ago with a simple passion — serving
            authentic firewood-cooked briyani with rich flavour and care. From
            small gatherings to memorable celebrations, we focus on traditional
            preparation, quality ingredients, and food that brings people together.
          </p>
          <ul className="about-intro-features">
            {highlights.map(({ title, caption, icon }) => (
              <li className="about-intro-feature" key={title}>
                <span className="about-intro-icon"><AboutIcon type={icon} /></span>
                <div><h3>{title}</h3><p>{caption}</p></div>
              </li>
            ))}
          </ul>
          <div className="about-intro-bottom">
            <Link className="about-intro-button" to="/about">
              OUR STORY <span aria-hidden="true"><i>→</i></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIntro;
