import { useEffect, useRef } from "react";
import "./CursorFollower.css";

const interactiveSelector = "a, button, input, select, textarea, summary, [role='button'], [role='link'], [tabindex]:not([tabindex='-1'])";

export default function CursorFollower() {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;
    const eligible = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let removeListeners = () => {};

    const configure = () => {
      removeListeners();
      follower.classList.remove("is-visible", "is-interactive", "is-pressed");
      if (!eligible.matches) return;

      let frame = 0;
      let lastTime = 0;
      let visible = false;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const position = () => {
        follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      };
      const updateHover = () => {
        if (!visible) return;
        const target = document.elementFromPoint(targetX, targetY);
        follower.classList.toggle("is-interactive", Boolean(target?.closest(interactiveSelector)));
      };
      const animate = (time) => {
        // Equivalent to lerp .16 at 60 Hz, consistent on high refresh displays.
        const elapsed = lastTime ? Math.min(time - lastTime, 64) : 1000 / 60;
        const blend = 1 - Math.pow(.84, elapsed / (1000 / 60));
        lastTime = time;
        currentX += (targetX - currentX) * blend;
        currentY += (targetY - currentY) * blend;
        if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < .1) {
          currentX = targetX;
          currentY = targetY;
          frame = 0;
          lastTime = 0;
        } else {
          frame = window.requestAnimationFrame(animate);
        }
        position();
      };
      const hide = () => {
        visible = false;
        follower.classList.remove("is-visible", "is-pressed");
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      };
      const move = (event) => {
        if (event.pointerType !== "mouse") {
          hide();
          return;
        }
        targetX = event.clientX;
        targetY = event.clientY;
        if (!visible) {
          currentX = targetX;
          currentY = targetY;
          position();
          visible = true;
          follower.classList.add("is-visible");
        }
        updateHover();
        if (!frame) frame = window.requestAnimationFrame(animate);
      };
      const leave = (event) => { if (!event.relatedTarget) hide(); };
      const press = (event) => {
        if (event.pointerType !== "mouse") return hide();
        follower.classList.add("is-pressed");
      };
      const release = () => follower.classList.remove("is-pressed");
      const visibility = () => { if (document.hidden) hide(); };

      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", move, { passive: true });
      window.addEventListener("pointerout", leave);
      window.addEventListener("pointerdown", press);
      window.addEventListener("pointerup", release);
      window.addEventListener("pointercancel", hide);
      window.addEventListener("blur", hide);
      window.addEventListener("scroll", updateHover, { passive: true, capture: true });
      document.addEventListener("visibilitychange", visibility);
      removeListeners = () => {
        hide();
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", move);
        window.removeEventListener("pointerout", leave);
        window.removeEventListener("pointerdown", press);
        window.removeEventListener("pointerup", release);
        window.removeEventListener("pointercancel", hide);
        window.removeEventListener("blur", hide);
        window.removeEventListener("scroll", updateHover, true);
        document.removeEventListener("visibilitychange", visibility);
      };
    };

    configure();
    eligible.addEventListener("change", configure);
    return () => {
      eligible.removeEventListener("change", configure);
      removeListeners();
    };
  }, []);

  return <div ref={followerRef} className="cursor-follower" aria-hidden="true"><span /></div>;
}
