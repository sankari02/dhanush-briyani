import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import muttonBriyani from "../assets/hero-motion/mutton-briyani.png";
import chickenBriyani from "../assets/hero-motion/chicken-briyani.png";
import chicken65Briyani from "../assets/hero-motion/chicken65-briyani.png";
import chicken65 from "../assets/hero-motion/chicken65.png";
import onion from "../assets/hero-motion/onion.png";
import leaves from "../assets/hero-motion/leaves.png";
import "./Hero.css";

const foods = [
  { name: "Mutton Briyani", image: muttonBriyani },
  { name: "Chicken Briyani", image: chickenBriyani },
  { name: "Chicken 65 Briyani", image: chicken65Briyani },
  { name: "Chicken 65", image: chicken65 },
];

const showcaseImages = [...foods.map(({ image }) => image), onion, leaves];
const heroPhrases = [
  ["Memorable", "Feasts."],
  ["Firewood", "Flavour."],
  ["DHANUSH BRIYANI."],
  ["Briyani is emotion!"],
];

const preloadImage = (src) => new Promise((resolve) => {
  const image = new Image();
  const finish = () => {
    if (typeof image.decode === "function") {
      image.decode().catch(() => {}).finally(resolve);
    } else {
      resolve();
    }
  };

  image.onload = finish;
  image.onerror = resolve;
  image.src = src;
  if (image.complete) finish();
});

function HomeFoodShowcase({ onFoodChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [compositionSettled, setCompositionSettled] = useState(false);
  const autoTimerRef = useRef(null);
  const autoplayStartRef = useRef(null);
  const changeFoodRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const activeIndexRef = useRef(currentIndex);
  const nextIndexRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const entryReadyRef = useRef(false);
  const finishTransitionRef = useRef(null);
  const finishTransition = useCallback(() => {
    if (!isTransitioningRef.current || nextIndexRef.current === null) return;
    window.clearTimeout(transitionTimerRef.current);
    const completedIndex = nextIndexRef.current;
    activeIndexRef.current = completedIndex;
    nextIndexRef.current = null;
    setCurrentIndex(completedIndex);
    setNextIndex(null);
    setIsTransitioning(false);
    isTransitioningRef.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoTimerRef.current = window.setTimeout(() => {
      changeFoodRef.current(activeIndexRef.current + 1);
    }, 1700);
  }, []);

  const changeFood = useCallback((nextIndex) => {
    const normalizedIndex = (nextIndex + foods.length) % foods.length;
    if (!entryReadyRef.current || isTransitioningRef.current) return;

    window.clearTimeout(autoTimerRef.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (normalizedIndex === activeIndexRef.current) {
      if (reduceMotion) return;
      autoTimerRef.current = window.setTimeout(() => {
        changeFoodRef.current(activeIndexRef.current + 1);
      }, 1700);
      return;
    }

    onFoodChange(normalizedIndex);

    if (reduceMotion) {
      activeIndexRef.current = normalizedIndex;
      setCurrentIndex(normalizedIndex);
      setNextIndex(null);
      setIsTransitioning(false);
      isTransitioningRef.current = false;
      return;
    }

    isTransitioningRef.current = true;
    nextIndexRef.current = normalizedIndex;
    setNextIndex(normalizedIndex);
    setIsTransitioning(true);
    window.clearTimeout(transitionTimerRef.current);
  }, [onFoodChange]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(showcaseImages.map(preloadImage)).then(() => {
      if (!cancelled) {
        setAssetsReady(true);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          entryReadyRef.current = true;
          setCompositionSettled(true);
        }
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(autoTimerRef.current);
      window.clearTimeout(autoplayStartRef.current);
      window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    changeFoodRef.current = changeFood;
    finishTransitionRef.current = finishTransition;
    if (!compositionSettled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    autoplayStartRef.current = window.setTimeout(() => {
      changeFoodRef.current(activeIndexRef.current + 1);
    }, 550);

    return () => {
      window.clearTimeout(autoplayStartRef.current);
      window.clearTimeout(autoTimerRef.current);
    };
  }, [changeFood, compositionSettled, finishTransition]);

  const handleCompositionAnimationEnd = (event) => {
    if (event.target !== event.currentTarget || event.animationName !== "homeFoodCompositionEnter") return;
    entryReadyRef.current = true;
    setCompositionSettled(true);
  };

  const handleSelectorKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % foods.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index + foods.length - 1) % foods.length;
    else return;

    event.preventDefault();
    changeFood(nextIndex);
    event.currentTarget.parentElement
      .querySelector(`[data-food-index="${nextIndex}"]`)
      ?.focus();
  };

  const activeFood = foods[currentIndex];
  const highlightedIndex = isTransitioning ? nextIndex : currentIndex;

  return (
    <>
      <div
        className={`home-food-composition-entry${compositionSettled ? " is-settled" : assetsReady ? " is-entering" : " is-loading"}`}
        onAnimationEnd={handleCompositionAnimationEnd}
        aria-label="Featured food composition"
      >
        <div className="home-food-stage">
          <div className="home-food-ingredient home-food-onion" aria-hidden="true">
            <img src={onion} alt="" />
          </div>
          <div className="home-food-ingredient home-food-onion-front" aria-hidden="true">
            <img src={onion} alt="" />
          </div>
          <div className="home-food-ingredient home-food-leaves" aria-hidden="true">
            <img src={leaves} alt="" />
          </div>

          <div className="home-food-orbit" role="group" aria-label="Choose featured food">
            <svg className="home-food-orbit-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 65 5 C 52 13, 38 22, 35 33 S 26 55, 27 67 S 40 88, 59 95" />
            </svg>
            {foods.map((food, index) => (
              <button
                key={`orbit-${food.name}`}
                type="button"
                className={`home-food-thumbnail home-food-thumbnail-${index + 1}${index === highlightedIndex ? " is-active" : ""}`}
                aria-label={`Show ${food.name}`}
                aria-pressed={index === highlightedIndex}
                data-food-index={index}
                onClick={() => changeFood(index)}
                onKeyDown={(event) => handleSelectorKeyDown(event, index)}
              >
                <img src={food.image} alt="" />
              </button>
            ))}
          </div>

          <div className="home-food-plate-viewport" aria-live="off">
            {isTransitioning ? (
              <>
                <div
                  key={`outgoing-${currentIndex}`}
                  className="home-food-plate-transition is-exiting"
                  aria-hidden="true"
                  onAnimationEnd={(event) => {
                    if (
                      event.target === event.currentTarget
                      && event.animationName === "homeFoodExit"
                    ) {
                      finishTransitionRef.current();
                    }
                  }}
                >
                  <img className="home-food-plate-image" src={activeFood.image} alt="" />
                </div>
                <div
                  key={`incoming-${nextIndex}`}
                  className="home-food-plate-transition is-entering"
                  aria-hidden="true"
                >
                  <img className="home-food-plate-image" src={foods[nextIndex].image} alt="" fetchPriority="high" />
                </div>
              </>
            ) : (
              <div key={`current-${currentIndex}`} className="home-food-plate-transition is-current">
                <img className="home-food-plate-image" src={activeFood.image} alt={activeFood.name} fetchPriority="high" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="home-food-controls">
        <div className="home-food-highlights" aria-label="Catering highlights">
          <div className="home-food-highlight">
            <span className="home-food-highlight-mark" aria-hidden="true"><i /></span>
            <span>Traditional<br />Cooking</span>
          </div>
          <div className="home-food-highlight">
            <span className="home-food-highlight-mark" aria-hidden="true"><i /></span>
            <span>Premium<br />Catering</span>
          </div>
          <div className="home-food-highlight">
            <span className="home-food-highlight-mark" aria-hidden="true"><i /></span>
            <span>Memorable<br />Celebrations</span>
          </div>
        </div>

        <div className="home-food-actions">
          <Link to="/contact#quotation" className="home-food-primary">Book Your Event <span aria-hidden="true">&rarr;</span></Link>
          <a href="#services" className="home-food-secondary">Explore Services <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </>
  );
}

function HomeFoodCopy({ phraseIndex }) {
  const [phrasePhase, setPhrasePhase] = useState(() => (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "holding" : "entering"
  ));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    setPhrasePhase("entering");
    const holdTimer = window.setTimeout(() => setPhrasePhase("holding"), 450);
    return () => window.clearTimeout(holdTimer);
  }, [phraseIndex]);

  const phrase = heroPhrases[phraseIndex];

  return (
    <div className="home-food-copy">
      <p className="home-food-eyebrow">Authentic Firewood Briyani</p>
      <h1 className="home-food-heading">
        <span key={phraseIndex} className={`home-food-heading-phrase is-${phrasePhase}`}>
          <span>{phrase[0]}</span>
          <span className="home-food-heading-italic">{phrase[1]}</span>
        </span>
      </h1>
      <p className="home-food-description">
        Traditional firewood-cooked briyani and thoughtful catering crafted
        for celebrations worth remembering.
      </p>
    </div>
  );
}

function Hero() {
  const [activeFoodIndex, setActiveFoodIndex] = useState(0);

  return (
    <section className="hero home-food-hero" id="home" aria-label="Dhanush Briyani showcase">
      <HomeFoodCopy phraseIndex={activeFoodIndex} />
      <HomeFoodShowcase onFoodChange={setActiveFoodIndex} />
    </section>
  );
}

export default Hero;


