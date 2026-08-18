import Image from "next/image";

import styles from "@/components/landing/landing.module.css";

import { HeroHeader } from "./hero-header";

const capabilityMetrics = [
  { label: "Efficiency", value: 86 },
  { label: "Security", value: 82 },
  { label: "Reliability", value: 72 },
] as const;

const impactStats = [
  { value: "98%", label: "Accuracy Increase" },
  { value: "150+", label: "Processed Client" },
] as const;

function CapabilityBars() {
  return (
    <dl className={styles.metrics}>
      {capabilityMetrics.map((metric) => (
        <div key={metric.label}>
          <dt className={styles.metricLabel}>{metric.label}</dt>
          <dd className={styles.metricTrack}>
            <span
              className={styles.metricValue}
              style={{ width: `${metric.value}%` }}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function TransformationLabel() {
  return (
    <div className={styles.transformLabel}>
      <p className={styles.transformCopy}>
        Accelerating Digital
        <br />
        Transformation
      </p>
      <svg
        viewBox="0 0 285 50"
        className={styles.transformLine}
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
    <section id="home" className={styles.hero} data-story-panel="hero">
      <HeroHeader />

      <div className={styles.heroInner} data-story-element="hero-content">
        <div>
          <p className={styles.eyebrow}>Artificial intelligence</p>
          <h1 className={styles.wordmark}>
            TECHNOLOGY
          </h1>
        </div>

        <div className={styles.heroDetails}>
          <div className={styles.heroCopy}>
            <p className={styles.bodyCopy}>
              Advanced technology designed to power intelligent automation,
              data driven insights, and smarter digital experiences across
              modern industries.
            </p>

            <a
              href="#about"
              className={styles.cta}
            >
              Get Started Now
            </a>

            <CapabilityBars />
          </div>

          <div className={styles.heroAside}>
            <TransformationLabel />

            <div className={styles.heroImage}>
              <Image
                src="/light-trails.svg"
                alt="Red and white long-exposure light trails on a dark road"
                fill
                priority
                sizes="330px"
                className={styles.coverImage}
              />
            </div>

            <dl className={styles.stats}>
              {impactStats.map((stat) => (
                <div key={stat.label}>
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
