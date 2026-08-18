"use client";

import { useEffect, useRef } from "react";

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

      cursor.dataset.visible = "true";

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(renderCursor);
      }

      const hoveredElement = event.target instanceof Element ? event.target : null;
      cursor.dataset.active = String(
        Boolean(hoveredElement?.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const handlePointerLeave = () => {
      cursor.dataset.visible = "false";
    };

    const handleScroll = () => {
      if (customCursorEnabled) {
        cursor.dataset.visible = "true";
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
    <div
      ref={cursorRef}
      className="group/cursor pointer-events-none fixed top-0 left-0 z-60 hidden opacity-0 transition-opacity duration-150 will-change-transform data-[visible=true]:opacity-100 pointer-fine:block motion-reduce:hidden"
      aria-hidden="true"
    >
      <span className="absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/75 transition duration-200 group-data-[active=true]/cursor:scale-150 group-data-[active=true]/cursor:border-primary group-data-[active=true]/cursor:bg-primary/15" />
      <span className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
    </div>
  );
}
