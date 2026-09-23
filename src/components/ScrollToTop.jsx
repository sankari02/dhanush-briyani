import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    // Route content has mounted, including homepage hash targets.
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      // Override global smooth scrolling when opening a page.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToTop;
