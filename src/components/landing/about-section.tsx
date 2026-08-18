import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const robotCallouts = [
  {
    positionClass: "top-1/6",
    index: "01",
    name: "Vision core",
    description: "Adaptive perception and scene awareness",
  },
  {
    positionClass: "top-5/12",
    index: "02",
    name: "Neural array",
    description: "Real-time reasoning across every signal",
  },
  {
    positionClass: "top-7/10",
    index: "03",
    name: "Motion system",
    description: "Precision response with continuous feedback",
  },
] as const;

function RobotCallouts() {
  return (
    <aside
      className="pointer-events-none invisible absolute inset-0 z-40 font-mono uppercase opacity-0 motion-reduce:visible motion-reduce:opacity-100 max-xl:hidden"
      data-story-element="about-callouts"
      aria-label="Robot capability annotations"
    >
      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="robot-callout-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0" stopColor="#d14bff" />
            <stop offset="0.52" stopColor="#fcf8fd" />
            <stop offset="1" stopColor="#77e8ff" />
          </linearGradient>
          <marker
            id="robot-callout-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M0 0L8 4L0 8Z" fill="#d14bff" />
          </marker>
        </defs>

        <path
          data-callout-line
          markerEnd="url(#robot-callout-arrow)"
          d="M80 21.7H78.5L62 23"
          fill="none"
          stroke='url("#robot-callout-gradient")'
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          opacity="0.78"
        />
        <path
          data-callout-line
          markerEnd="url(#robot-callout-arrow)"
          d="M82 46.6H77.5L65 40"
          fill="none"
          stroke='url("#robot-callout-gradient")'
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          opacity="0.78"
        />
        <path
          data-callout-line
          markerEnd="url(#robot-callout-arrow)"
          d="M80 75H77.5L66 73"
          fill="none"
          stroke='url("#robot-callout-gradient")'
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          opacity="0.78"
        />
      </svg>

      {robotCallouts.map((callout) => (
        <div
          key={callout.name}
          className={cn(
            "absolute left-4/5 w-60 border border-foreground/20 bg-linear-to-r from-primary/10 to-brand-900/70 px-3 py-2.5 text-left backdrop-blur-lg will-change-[filter,opacity,transform] after:absolute after:top-1/2 after:-left-1 after:size-2 after:-translate-y-1/2 after:rotate-45 after:border-b after:border-l after:border-primary after:bg-brand-900",
            callout.positionClass,
          )}
          data-callout-item
        >
          <span className="mr-2 text-xs tracking-widest text-primary">
            {callout.index}
          </span>
          <strong className="text-xs font-medium tracking-widest text-foreground">
            {callout.name}
          </strong>
          <span className="mt-1 block text-xs leading-relaxed tracking-wider text-foreground/50">
            {callout.description}
          </span>
        </div>
      ))}
    </aside>
  );
}

export function AboutSection() {
  return (
    <section
      id="about-panel"
      className="invisible absolute inset-0 h-svh min-h-0 max-h-none overflow-hidden bg-transparent px-8 py-24 opacity-0 motion-reduce:visible motion-reduce:relative motion-reduce:min-h-225 motion-reduce:bg-brand-950 motion-reduce:opacity-100 xl:px-12"
      data-story-panel="about"
    >
      <div className="relative mx-auto grid min-h-svh w-full max-w-330 grid-cols-5 items-center gap-20">
        <div
          className="relative z-30 col-span-2 max-w-lg -translate-y-16 *:will-change-[filter,opacity,transform] motion-reduce:translate-y-0"
          data-story-element="about-copy"
        >
          <p className="flex items-center gap-2 text-xs text-foreground/70 before:size-2 before:rounded-full before:bg-primary">
            About Us
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-6xl leading-none tracking-wide xl:text-7xl">
            Advancing Intelligence Through AI Technology
          </h2>
          <p className="mt-7 max-w-120 text-lg leading-relaxed text-muted-foreground xl:text-xl">
            We develop intelligent AI solutions that help businesses automate
            workflows, analyze complex data, and make faster, smarter decisions.
            Our technology is accurate, scalable, and ready for real-world
            challenges.
          </p>
          <a
            href="#service"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-xl shadow-brand-950/20 outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none"
          >
            Explore Demo
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div
          className="relative z-30 col-span-3 aspect-square w-full max-w-145 justify-self-end overflow-hidden rounded-4xl border border-foreground/10 bg-brand-950 shadow-2xl shadow-brand-950/40 after:absolute after:inset-0 after:bg-linear-to-br after:from-transparent after:from-50% after:to-primary/10"
          data-story-element="about-visual"
        >
          <Image
            src="/earth-network.svg"
            alt="The illuminated Earth viewed from space"
            fill
            sizes="(max-width: 1184px) 50vw, 580px"
            className="object-cover"
          />
        </div>
      </div>

      <RobotCallouts />
    </section>
  );
}
