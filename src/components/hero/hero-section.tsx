import Image from "next/image";

import { HeroHeader } from "./hero-header";

const capabilityMetrics = [
  { label: "Efficiency", widthClass: "w-6/7" },
  { label: "Security", widthClass: "w-4/5" },
  { label: "Reliability", widthClass: "w-5/7" },
] as const;

const impactStats = [
  { value: "98%", label: "Accuracy Increase" },
  { value: "150+", label: "Processed Client" },
] as const;

function CapabilityBars() {
  return (
    <dl className="mt-5 w-84 space-y-2">
      {capabilityMetrics.map((metric) => (
        <div key={metric.label}>
          <dt className="mb-1 text-sm text-foreground/70">{metric.label}</dt>
          <dd className="h-2.5 overflow-hidden rounded-full bg-foreground/75">
            <span
              className={`block h-full rounded-full bg-primary shadow-lg shadow-primary/40 ${metric.widthClass}`}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function TransformationLabel() {
  return (
    <div className="w-72">
      <p className="max-w-52 text-base leading-tight text-foreground/85">
        Accelerating Digital
        <br />
        Transformation
      </p>
      <svg
        viewBox="0 0 285 50"
        className="-mt-1 w-full text-foreground/85"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 30H184L214 2H285"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="absolute inset-0 h-svh min-h-0 max-h-none overflow-hidden motion-reduce:relative motion-reduce:min-h-225 motion-reduce:bg-linear-to-b motion-reduce:from-brand-900 motion-reduce:via-brand-600 motion-reduce:to-brand-600"
      data-story-panel="hero"
    >
      <HeroHeader />

      <div
        className="relative z-30 mx-auto mt-28 w-full max-w-330 px-8 will-change-[filter,opacity,transform] xl:px-12"
        data-story-element="hero-content"
      >
        <div>
          <p className="flex items-center gap-2 text-xs text-foreground/70 before:size-2 before:rounded-full before:bg-primary">
            Artificial intelligence
          </p>
          <h1 className="mt-4 whitespace-nowrap font-display text-8xl leading-none tracking-wide text-foreground xl:text-9xl">
            TECHNOLOGY
          </h1>
        </div>

        <div className="relative z-30 mt-8 grid grid-cols-3">
          <div className="w-92">
            <p className="text-base leading-snug text-foreground/75">
              Advanced technology designed to power intelligent automation,
              data driven insights, and smarter digital experiences across
              modern industries.
            </p>

            <a
              href="#about"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-xl shadow-brand-950/20 outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none"
            >
              Get Started Now
            </a>

            <CapabilityBars />
          </div>

          <div className="col-start-3 w-82 justify-self-end">
            <TransformationLabel />

            <div className="relative mt-1 aspect-8/5 overflow-hidden rounded-3xl bg-brand-950 shadow-2xl shadow-brand-950/30">
              <Image
                src="/light-trails.svg"
                alt="Red and white long-exposure light trails on a dark road"
                fill
                priority
                sizes="330px"
                className="object-cover"
              />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-6">
              {impactStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl leading-none tracking-wide text-foreground">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-foreground/60">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
