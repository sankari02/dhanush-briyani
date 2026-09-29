import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import plateImage from "../assets/about-animation/briyani-plate.png";
import onionImage from "../assets/about-animation/onion.png";
import chilliImage from "../assets/about-animation/chilli.png";
import leavesImage from "../assets/about-animation/leaves.png";
import topPaperImage from "../assets/about-animation/top-red-paper.png";
import bottomPaperImage from "../assets/about-animation/bottom-red-paper.png";

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
  const animationRef = useRef(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    const composition = animationRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      if (!section || !composition) return;
      if (reduceMotion.matches) {
        composition.style.setProperty("--top-paper-y", "0px");
        composition.style.setProperty("--bottom-paper-y", "0px");
        composition.style.setProperty("--plate-angle", "0deg");
        composition.style.setProperty("--plate-scale", "1");
        composition.style.setProperty("--plate-y", "0px");
        composition.style.setProperty("--plate-opacity", "1");
        composition.style.setProperty("--onion-parallax", "0px");
        composition.style.setProperty("--chilli-parallax", "0px");
        composition.style.setProperty("--leaves-parallax", "0px");
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / Math.max(1, rect.height)));
      const revealProgress = Math.min(1, sectionProgress / 0.65);
      const opacity = Math.min(1, 0.7 + revealProgress * 0.44);
      const plateScale = sectionProgress <= 0.5
        ? 0.68 + sectionProgress * 0.4
        : 0.88 + (sectionProgress - 0.5) * 0.4;
      const plateY = sectionProgress <= 0.5
        ? 25 - sectionProgress * 34
        : 8 - (sectionProgress - 0.5) * 16;

      composition.style.setProperty("--reveal-progress", revealProgress.toFixed(4));
      composition.style.setProperty("--section-progress", sectionProgress.toFixed(4));
      composition.style.setProperty("--top-paper-y", `${220 * (1 - revealProgress)}px`);
      composition.style.setProperty("--bottom-paper-y", `${-220 * (1 - revealProgress)}px`);
      composition.style.setProperty("--plate-angle", `${50 * sectionProgress}deg`);
      composition.style.setProperty("--plate-scale", `${plateScale}`);
      composition.style.setProperty("--plate-y", `${plateY}px`);
      composition.style.setProperty("--plate-opacity", `${opacity}`);
      composition.style.setProperty("--onion-parallax", `${10 * (1 - sectionProgress)}px`);
      composition.style.setProperty("--chilli-parallax", `${12 * (1 - sectionProgress)}px`);
      composition.style.setProperty("--leaves-parallax", `${-8 * (1 - sectionProgress)}px`);
    };

    const requestProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    requestProgress();
    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress);
    reduceMotion.addEventListener("change", requestProgress);
    return () => {
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      reduceMotion.removeEventListener("change", requestProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-intro" id="about" aria-labelledby="about-intro-heading">
      <svg className="about-intro-botanical" viewBox="0 0 200 300" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M30 290Q130 150 135 15M68 232Q5 185 30 130Q80 158 68 232ZM92 187Q155 185 181 115Q120 115 92 187ZM111 137Q53 116 70 62Q116 82 111 137ZM126 87Q170 76 173 23Q135 34 126 87Z" />
      </svg>
      <div className="about-intro-inner">
        <div className="about-intro-images">
          <div ref={animationRef} className="about-food-composition" aria-hidden="true">
            <div className="about-food-layer about-food-paper about-food-paper-top"><img src={topPaperImage} alt="" /></div>
            <span className="about-food-word about-food-word-dhanush">DHANUSH</span>
            <span className="about-food-word about-food-word-briyani">BRIYANI</span>
            <div className="about-food-layer about-food-onion"><div className="about-food-float about-food-onion-float"><img src={onionImage} alt="" /></div></div>
            <div className="about-food-layer about-food-chilli"><div className="about-food-float about-food-chilli-float"><img src={chilliImage} alt="" /></div></div>
            <div className="about-food-plate-position">
              <div className="about-food-plate-scroll"><div className="about-food-plate-float"><img src={plateImage} alt="" /></div></div>
            </div>
            <div className="about-food-layer about-food-leaves"><div className="about-food-float about-food-leaves-float"><img src={leavesImage} alt="" /></div></div>
            <div className="about-food-layer about-food-paper about-food-paper-bottom"><img src={bottomPaperImage} alt="" /></div>
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
