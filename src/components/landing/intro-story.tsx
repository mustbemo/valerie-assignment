"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./landing.module.css";

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
        .set(aboutCallouts.querySelectorAll('[data-callout-item]'), {
          autoAlpha: 0,
          filter: "blur(6px)",
          x: 16,
        })
        .set(aboutCallouts.querySelectorAll('[data-callout-line]'), {
          strokeDasharray: 1,
          strokeDashoffset: 1,
        })
        .set(aboutCallouts.querySelectorAll('[data-callout-node]'), {
          autoAlpha: 0,
          scale: 0,
          transformOrigin: "center",
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
        .to(
          aboutCallouts.querySelectorAll('[data-callout-line]'),
          {
            strokeDashoffset: 0,
            duration: 0.58,
            stagger: 0.1,
            ease: "power2.out",
          },
          2.22,
        )
        .to(
          aboutCallouts.querySelectorAll('[data-callout-node]'),
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          2.34,
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
          2.42,
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, story);

    return () => context.revert();
  }, []);

  return (
    <div ref={storyRef} id="intro-story" className={styles.introStory}>
      <span id="about" className={styles.aboutAnchor} aria-hidden="true" />
      <div className={styles.storyBackdrop} aria-hidden="true">
        <div
          className={styles.aboutBackdrop}
          data-story-element="about-backdrop"
        />
      </div>
      <div className={styles.storySticky}>
        {children}
      </div>
    </div>
  );
}
