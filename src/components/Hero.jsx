import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const heroPhrases = [
  "DHANUSH BRIYANI.",
  "SLOW FIRE.",
  "DEEP FLAVOUR.",
  "MEMORABLE FEASTS.",
];

function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const currentPhrase = heroPhrases[phraseIndex];

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      return undefined;
    }

    const phraseTimer = window.setInterval(() => {
      setPhraseIndex((currentIndex) => (currentIndex + 1) % heroPhrases.length);
    }, 2800);

    return () => window.clearInterval(phraseTimer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-embers" aria-hidden="true">
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
        <span className="hero-ember"></span>
      </div>

      <div className="hero-content">
        <p className="hero-label hero-animate hero-delay-1">
          <span></span>
          AUTHENTIC FIREWOOD BRIYANI
          <span></span>
        </p>

        <h1 className="hero-heading hero-animate hero-delay-2">
          <span className="hero-heading-mask">
            <span key={currentPhrase} className="hero-heading-phrase">
              {currentPhrase === "MEMORABLE FEASTS." ? (
                <>
                  MEMORABLE
                  <br />
                  FEASTS.
                </>
              ) : (
                currentPhrase
              )}
            </span>
          </span>
        </h1>

        <p className="hero-description hero-animate hero-delay-3">
          Traditional firewood-cooked briyani and thoughtful catering
          crafted for celebrations worth remembering.
        </p>

        <div className="hero-buttons hero-animate hero-delay-4">
          <Link to="/contact#quotation" className="primary-btn">
            <span>Book Your Event</span>
            <span>-&gt;</span>
          </Link>

          <a href="#services" className="secondary-btn">
            <span>Explore Services</span>
            <span>-&gt;</span>
          </a>
        </div>
      </div>

      <div className="hero-bottom hero-animate hero-delay-5">
        <div className="hero-feature">
          <span className="hero-feature-icon"></span>
          <span>
            Traditional
            <br />
            Cooking
          </span>
        </div>
        <span className="hero-feature-divider"></span>
        <div className="hero-feature">
          <span className="hero-feature-icon"></span>
          <span>
            Premium
            <br />
            Catering
          </span>
        </div>
        <span className="hero-feature-divider"></span>
        <div className="hero-feature">
          <span className="hero-feature-icon"></span>
          <span>
            Memorable
            <br />
            Celebrations
          </span>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-frame">
          <span></span>
        </span>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}

export default Hero;
