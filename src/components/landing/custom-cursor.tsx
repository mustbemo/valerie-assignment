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

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let animationFrame = 0;

    const renderCursor = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      animationFrame = requestAnimationFrame(renderCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      cursor.classList.add(styles.cursorVisible);

      const hoveredElement = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        styles.cursorActive,
        Boolean(hoveredElement?.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const handlePointerLeave = () => {
      cursor.classList.remove(styles.cursorVisible);
    };

    document.documentElement.dataset.customCursor = "true";
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(renderCursor);

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.removeEventListener("pointermove", handlePointerMove);
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
