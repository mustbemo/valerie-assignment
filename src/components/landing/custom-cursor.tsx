"use client";

import { useEffect, useRef } from "react";

import styles from "./landing.module.css";

const INTERACTIVE_SELECTOR = "a, button, input, [role='button']";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");

    if (!cursor || !finePointer.matches) return;

    let animationFrame = 0;
    let customCursorEnabled = false;
    let pointerX = -100;
    let pointerY = -100;

    const renderCursor = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!customCursorEnabled) {
        document.documentElement.dataset.customCursor = "true";
        customCursorEnabled = true;
      }

      cursor.classList.add(styles.cursorVisible);

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(renderCursor);
      }

      const hoveredElement = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        styles.cursorActive,
        Boolean(hoveredElement?.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const handlePointerLeave = () => {
      cursor.classList.remove(styles.cursorVisible);
    };

    const handleScroll = () => {
      if (customCursorEnabled) {
        cursor.classList.add(styles.cursorVisible);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <span className={styles.cursorRing} />
      <span className={styles.cursorDot} />
    </div>
  );
}
