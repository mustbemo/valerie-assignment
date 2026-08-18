"use client";

import { useLayoutEffect, useRef } from "react";
import { Bot, Cpu, Radar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    name: "AI Automation",
    description:
      "Automating workflows to improve efficiency and reduce operational complexity.",
    Icon: Bot,
    visualClass: "from-pink-800 via-brand-950 to-slate-950",
  },
  {
    name: "Data Intelligence & Analytics",
    description:
      "Transforming data into actionable insights for smarter decision making.",
    Icon: Cpu,
    visualClass: "from-cyan-400 via-cyan-800 to-slate-950",
  },
  {
    name: "Predictive AI Solutions",
    description:
      "Forecasting trends and outcomes using advanced machine learning models.",
    Icon: Radar,
    visualClass: "from-indigo-500 via-indigo-950 to-slate-950",
  },
] as const;

const serviceVisualLines = Array.from({ length: 9 });

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!section || reducedMotion.matches) return;

    const heading = section.querySelector('[data-service-element="heading"]');
    const cards = section.querySelectorAll('[data-service-element="card"]');
    const aura = section.querySelector('[data-service-element="aura"]');
    const aboutCopy = document.querySelector(
      '[data-story-element="about-copy"]',
    );
    const aboutCallouts = document.querySelector(
      '[data-story-element="about-callouts"]',
    );
    const featureSection = document.querySelector("#feature");

    if (!heading || !cards.length || !aura || !featureSection) return;

    const serviceContent = [heading, ...Array.from(cards)];

    const context = gsap.context(() => {
      gsap.set(heading, {
        autoAlpha: 0,
        filter: "blur(12px)",
        scale: 0.96,
        y: 48,
      });
      gsap.set(cards, {
        autoAlpha: 0,
        filter: "blur(12px)",
        rotateX: 8,
        scale: 0.92,
        transformPerspective: 1200,
        transformOrigin: "50% 100%",
        y: 72,
      });
      gsap.set(aura, { autoAlpha: 0, scale: 0.68 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 40%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      if (aboutCopy) {
        timeline.to(
          aboutCopy,
          {
            autoAlpha: 0,
            filter: "blur(12px)",
            scale: 1.025,
            x: -52,
            y: -24,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0,
        );
      }

      if (aboutCallouts) {
        timeline.to(
          aboutCallouts,
          {
            autoAlpha: 0,
            filter: "blur(8px)",
            x: 54,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0,
        );
      }

      timeline
        .to(
          aura,
          {
            autoAlpha: 0.72,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          heading,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          0,
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            rotateX: 0,
            scale: 1,
            stagger: 0.06,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          0.12,
        )
        .to(
          aura,
          {
            autoAlpha: 0.28,
            scale: 1.12,
            duration: 0.3,
            ease: "power2.out",
          },
          0.5,
        );

      const exitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: featureSection,
          start: "top bottom",
          end: "top 10%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      exitTimeline
        .to(
          serviceContent,
          {
            autoAlpha: 0,
            filter: "blur(12px)",
            scale: 0.88,
            y: -32,
            duration: 0.68,
            ease: "power2.inOut",
            transformOrigin: "50% 45%",
          },
          0,
        )
        .to(
          aura,
          {
            autoAlpha: 0,
            scale: 0.78,
            duration: 0.58,
            ease: "power2.inOut",
          },
          0.05,
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service"
      className="relative -mt-64 min-h-svh overflow-hidden bg-transparent px-8 py-16 xl:px-12"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 aspect-square w-2/3 max-w-208 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-primary/25 via-cyan-300/10 to-transparent blur-3xl will-change-[opacity,transform]"
        data-service-element="aura"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-330 flex-col justify-center">
        <header
          className="relative z-30 mr-auto w-3/4 max-w-4xl text-left max-xl:mx-auto max-xl:w-full max-xl:text-center"
          data-service-element="heading"
        >
          <p className="flex items-center gap-2 text-xs text-foreground/70 before:size-2 before:rounded-full before:bg-primary max-xl:justify-center">
            Service
          </p>
          <h2 className="mt-6 font-display text-6xl leading-tight tracking-wide">
            Intelligent AI Solutions for Modern Businesses
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground">
            We deliver advanced artificial intelligence services designed to
            automate processes, analyze data intelligently, and help
            organizations make faster, more accurate decisions.
          </p>
        </header>

        <div className="mt-20 grid grid-cols-3 gap-9 max-xl:gap-10">
          {services.map(({ name, description, Icon, visualClass }) => (
            <article
              key={name}
              className="relative z-30 flex min-h-110 flex-col overflow-hidden rounded-4xl border border-foreground/10 bg-card/90 shadow-2xl shadow-brand-950/20 will-change-[filter,opacity,transform]"
              data-service-element="card"
            >
              <div
                className={cn(
                  "relative z-10 grid flex-1 place-items-center overflow-hidden bg-radial before:absolute before:inset-0 before:bg-linear-to-br before:from-transparent before:via-primary/20 before:to-transparent",
                  visualClass,
                )}
              >
                <div
                  className="absolute inset-0 flex justify-evenly opacity-10"
                  aria-hidden="true"
                >
                  {serviceVisualLines.map((_, index) => (
                    <span
                      key={index}
                      className="h-full border-l border-white"
                    />
                  ))}
                </div>
                <Icon
                  className="relative z-10 size-24 text-foreground/90 drop-shadow-xl"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-30 min-h-32 border-t border-foreground/10 bg-brand-950/70 px-6 py-5 text-center backdrop-blur-xl">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
