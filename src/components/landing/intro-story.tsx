"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type IntroStoryProps = {
  children: ReactNode;
};

export function IntroStory({ children }: IntroStoryProps) {
  const storyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const story = storyRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!story || reducedMotion.matches) return;

    const context = gsap.context(() => {
      const about = story.querySelector('[data-story-panel="about"]');
      const heroHeader = story.querySelector('[data-story-element="hero-header"]');
      const heroContent = story.querySelector('[data-story-element="hero-content"]');
      const aboutCopy = story.querySelector('[data-story-element="about-copy"]');
      const aboutVisual = story.querySelector('[data-story-element="about-visual"]');
      const aboutCallouts = story.querySelector(
        '[data-story-element="about-callouts"]',
      );
      const aboutBackdrop = story.querySelector(
        '[data-story-element="about-backdrop"]',
      );
      const calloutLines = Array.from(
        aboutCallouts?.querySelectorAll<SVGPathElement>(
          '[data-callout-line]',
        ) ?? [],
      );

      if (
        !about ||
        !heroHeader ||
        !heroContent ||
        !aboutCopy ||
        !aboutVisual ||
        !aboutCallouts ||
        !aboutBackdrop
      ) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .set(about, { autoAlpha: 1, pointerEvents: "none" })
        .set(aboutBackdrop, { autoAlpha: 0 })
        .set([heroHeader, heroContent], {
          filter: "blur(0px) brightness(1)",
        })
        .set(aboutCopy.children, {
          autoAlpha: 0,
          filter: "blur(10px)",
          x: -56,
        })
        .set(aboutVisual, { autoAlpha: 0 })
        .set(aboutCallouts, { autoAlpha: 0 })
        .set(calloutLines, {
          autoAlpha: 0,
          scaleX: 0.18,
          transformOrigin: "82% 50%",
        })
        .set(aboutCallouts.querySelectorAll('[data-callout-item]'), {
          autoAlpha: 0,
          filter: "blur(6px)",
          x: 16,
        })
        .to(
          heroContent,
          {
            scale: 1.05,
            y: -8,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "50% 42%",
          },
          0,
        )
        .to(
          heroHeader,
          {
            scale: 1.015,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "50% 0%",
          },
          0,
        )
        .to(
          heroContent,
          {
            autoAlpha: 0,
            filter: "blur(14px) brightness(1.18)",
            scale: 1.13,
            y: -44,
            duration: 1.15,
            ease: "power2.inOut",
          },
          0.2,
        )
        .to(
          heroHeader,
          {
            autoAlpha: 0,
            filter: "blur(10px) brightness(1.12)",
            scale: 1.04,
            y: -18,
            duration: 1.04,
            ease: "power2.inOut",
          },
          0.24,
        )
        .to(
          aboutBackdrop,
          {
            autoAlpha: 1,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.4,
        )
        .set(about, { pointerEvents: "auto" }, 2)
        .to(
          aboutCopy.children,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            x: 0,
            duration: 1.15,
            stagger: 0.12,
            ease: "power2.out",
          },
          2.05,
        )
        .to(aboutCallouts, { autoAlpha: 1, duration: 0.01 }, 2.08)
        .to(
          calloutLines,
          {
            autoAlpha: 1,
            duration: 0.48,
            scaleX: 1,
            stagger: 0.1,
            ease: "power2.out",
          },
          2.1,
        )
        .to(
          aboutCallouts.querySelectorAll('[data-callout-item]'),
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            x: 0,
            duration: 0.62,
            stagger: 0.1,
            ease: "power2.out",
          },
          2.22,
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, story);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={storyRef}
      id="intro-story"
      className="relative"
    >
      <span
        id="about"
        className="pointer-events-none absolute top-3/4 left-0 motion-reduce:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-10 overflow-hidden bg-linear-to-b from-brand-900 via-brand-600 to-brand-600 motion-reduce:hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-1/10 top-1/5 bottom-1/10 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 bg-brand-950 opacity-0 will-change-[opacity]"
          data-story-element="about-backdrop"
        />
      </div>
      <div className="sticky top-0 z-30 h-svh overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:overflow-visible">
        {children}
      </div>
      <div className="h-svh motion-reduce:hidden" aria-hidden="true" />
      <div className="h-svh motion-reduce:hidden" aria-hidden="true" />
      <div className="h-svh motion-reduce:hidden" aria-hidden="true" />
    </div>
  );
}
