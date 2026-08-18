"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

import { CircuitConvergence } from "./circuit-convergence";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    name: "Real-Time AI Processing",
    description:
      "Process and analyze data instantly to deliver fast, accurate insights that support timely and informed decision-making.",
    image: "/light-trails.svg",
    alt: "Fast streams of light representing real-time AI processing",
  },
  {
    name: "Scalable AI Architecture",
    description:
      "Expand from focused workflows to organization-wide intelligence without rebuilding your foundation.",
    image: "/earth-network.svg",
    alt: "A connected Earth representing AI systems operating at global scale",
  },
  {
    name: "Advanced Data Security",
    description:
      "Protect sensitive information through responsible access controls and secure processing practices.",
    image: "/secure-core.svg",
    alt: "A protected digital core surrounded by secure data layers",
  },
  {
    name: "Customizable AI Models",
    description:
      "Adapt models to your data, business language, and operational goals for results that stay relevant.",
    image: "/neural-stream.svg",
    alt: "Neural data paths representing a customizable AI model",
  },
] as const;

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let updateActiveFeature: (() => void) | undefined;

    const context = gsap.context(() => {
      const heading = section.querySelector('[data-feature-element="heading"]');
      const showcase = section.querySelector(
        '[data-feature-element="showcase"]',
      );
      const track = section.querySelector<HTMLElement>(
        '[data-feature-element="track"]',
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-feature-card]"),
      );
      const cardBackgrounds = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-feature-card-background]"),
      );
      const images = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-feature-image]"),
      );
      const indicators = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-feature-indicator]"),
      );

      if (
        !heading ||
        !showcase ||
        !track ||
        cards.length !== features.length ||
        cardBackgrounds.length !== features.length ||
        images.length !== features.length ||
        indicators.length !== features.length
      ) {
        return;
      }

      gsap.set(heading, {
        autoAlpha: 0,
        filter: "blur(18px)",
        scale: 0.86,
        y: 56,
        transformOrigin: "50% 50%",
      });
      gsap.set(showcase, {
        autoAlpha: 0,
        filter: "blur(20px)",
        scale: 0.9,
        y: 72,
        transformOrigin: "50% 20%",
      });

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 10%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      revealTimeline
        .to(
          heading,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
          },
          0.42,
        )
        .to(
          showcase,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            duration: 0.46,
            ease: "power2.out",
          },
          0.52,
        );

      gsap.set(cards, { autoAlpha: 0.55, scale: 0.96 });
      gsap.set(cardBackgrounds, { autoAlpha: 0 });
      gsap.set(images, { autoAlpha: 0, scale: 1.04 });
      gsap.set(indicators, {
        opacity: 0.35,
        scaleX: 0.3,
        transformOrigin: "50% 50%",
      });
      gsap.set(cards[0], { autoAlpha: 1, scale: 1.04 });
      gsap.set(cardBackgrounds[0], { autoAlpha: 1 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      gsap.set(indicators[0], { opacity: 1, scaleX: 1 });

      const timelineProgress = { value: 0 };
      const featureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      featureTimeline.to(
        timelineProgress,
        { value: 1, duration: features.length, ease: "none" },
        0,
      );

      for (let index = 1; index < features.length; index += 1) {
        const previous = index - 1;
        const transitionStart = index - 0.36;

        featureTimeline
          .to(
            cards[previous],
            {
              autoAlpha: 0.55,
              scale: 0.96,
              duration: 0.72,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            cards[index],
            {
              autoAlpha: 1,
              scale: 1.04,
              duration: 0.72,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            cardBackgrounds[previous],
            { autoAlpha: 0, duration: 0.72, ease: "power2.inOut" },
            transitionStart,
          )
          .to(
            cardBackgrounds[index],
            { autoAlpha: 1, duration: 0.72, ease: "power2.inOut" },
            transitionStart,
          )
          .to(
            images[previous],
            {
              autoAlpha: 0,
              scale: 1.04,
              duration: 0.72,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            images[index],
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.72,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            indicators[previous],
            {
              opacity: 0.35,
              scaleX: 0.3,
              duration: 0.72,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            indicators[index],
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.72,
              ease: "power2.inOut",
            },
            transitionStart,
          );
      }

      updateActiveFeature = () => {
        const scrollDistance = track.offsetHeight - window.innerHeight;
        const progress = Math.min(
          1,
          Math.max(0, -track.getBoundingClientRect().top / scrollDistance),
        );
        const nextFeature = Math.min(
          features.length - 1,
          Math.floor(progress * features.length),
        );

        setActiveFeature((current) =>
          current === nextFeature ? current : nextFeature,
        );
      };

      window.addEventListener("scroll", updateActiveFeature, {
        passive: true,
      });
      updateActiveFeature();

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => {
      if (updateActiveFeature) {
        window.removeEventListener("scroll", updateActiveFeature);
      }
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feature"
      className="relative overflow-x-clip bg-brand-900"
    >
      <div data-feature-element="track" className="relative">
        <div className="sticky top-0 z-30 h-svh overflow-hidden px-8 xl:px-12">
          <div className="relative mx-auto flex h-full w-full max-w-330 flex-col justify-center py-8">
            <header
              data-feature-element="heading"
              className="relative z-30 grid grid-cols-5 items-end gap-12 will-change-[filter,opacity,transform]"
            >
              <div className="col-span-3">
                <p className="flex items-center gap-2 text-xs text-foreground/70 before:size-2 before:rounded-full before:bg-primary">
                  Feature
                </p>
                <h2 className="mt-6 max-w-3xl font-display text-6xl leading-tight tracking-wide">
                  Built with Powerful AI Capabilities
                </h2>
              </div>
              <p className="col-span-2 pb-2 text-base leading-relaxed text-muted-foreground">
                Our AI platform is designed with advanced features that help
                businesses operate smarter, faster, and more efficiently
                through intelligent technology.
              </p>
            </header>

            <div
              data-feature-element="showcase"
              className="relative z-30 mt-14 grid grid-cols-2 items-center gap-14 will-change-[filter,opacity,transform] max-xl:gap-10"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden rounded-4xl border border-foreground/10 bg-brand-950 shadow-2xl shadow-brand-950/30">
                  {features.map((feature, index) => (
                    <Image
                      key={feature.image}
                      data-feature-image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 1184px) 45vw, 540px"
                      aria-hidden={index !== activeFeature}
                      className={cn(
                        "object-cover will-change-[opacity,transform]",
                        index === 0
                          ? "scale-100 opacity-100"
                          : "scale-105 opacity-0",
                      )}
                    />
                  ))}
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-tr from-brand-950/25 via-transparent to-primary/10"
                    aria-hidden="true"
                  />
                  <span className="absolute top-5 left-5 rounded-full border border-white/15 bg-brand-950/40 px-3 py-1 font-mono text-xs tracking-widest text-white/75 backdrop-blur-md">
                    0{activeFeature + 1} / 04
                  </span>
                </div>

                <div
                  className="mt-5 flex justify-center gap-3"
                  aria-label={`Feature image ${activeFeature + 1} of 4`}
                >
                  {features.map((feature, index) => (
                    <span
                      key={feature.name}
                      data-feature-indicator
                      className={cn(
                        "h-1.5 w-10 rounded-full bg-primary will-change-[opacity,transform]",
                        index === 0
                          ? "scale-x-100 opacity-100"
                          : "scale-x-50 opacity-35",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => {
                  const isActive = index === activeFeature;

                  return (
                    <article
                      key={feature.name}
                      data-feature-card
                      className={cn(
                        "relative origin-right overflow-hidden rounded-2xl border border-primary/55 bg-brand-950/35 px-6 py-4 text-primary-foreground will-change-[opacity,transform]",
                        index === 0
                          ? "scale-105 opacity-100"
                          : "scale-95 opacity-60",
                      )}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span
                        data-feature-card-background
                        className={cn(
                          "absolute inset-0 bg-primary",
                          index === 0 ? "opacity-100" : "opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="mt-1 font-mono text-xs tracking-widest text-primary-foreground/70">
                          0{index + 1}
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {feature.name}
                          </h3>
                          <p className="mt-2 text-sm leading-snug text-primary-foreground/75">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {features.map((feature) => (
          <div
            key={feature.name}
            className="h-svh min-h-200"
            aria-hidden="true"
          />
        ))}
      </div>

      <div
        id="feature-landing"
        className="relative z-10 h-96 overflow-hidden bg-linear-to-b from-brand-950 via-brand-900 to-brand-600"
        aria-hidden="true"
      >
        <CircuitConvergence />
      </div>
    </section>
  );
}
