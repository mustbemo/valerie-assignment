import Image from "next/image";
import { ArrowRight } from "lucide-react";

import styles from "./landing.module.css";

const robotCallouts = [
  {
    className: styles.calloutVision,
    index: "01",
    name: "Vision core",
    description: "Adaptive perception and scene awareness",
  },
  {
    className: styles.calloutNeural,
    index: "02",
    name: "Neural array",
    description: "Real-time reasoning across every signal",
  },
  {
    className: styles.calloutMotion,
    index: "03",
    name: "Motion system",
    description: "Precision response with continuous feedback",
  },
] as const;

function RobotCallouts() {
  return (
    <aside
      className={styles.aboutCallouts}
      data-story-element="about-callouts"
      aria-label="Robot capability annotations"
    >
      <svg
        className={styles.calloutLines}
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
        </defs>

        <path
          data-callout-line
          className={styles.calloutPath}
          pathLength={1}
          d="M71.5 25.5 L82 17.5 H95"
        />
        <path
          data-callout-line
          className={styles.calloutPath}
          pathLength={1}
          d="M70.5 45 L84 45 L89 40.5 H96"
        />
        <path
          data-callout-line
          className={styles.calloutPath}
          pathLength={1}
          d="M70 67 L82 67 L87 72 H95"
        />

        <circle
          data-callout-node
          className={styles.calloutNode}
          cx="71.5"
          cy="25.5"
          r="0.6"
        />
        <circle
          data-callout-node
          className={styles.calloutNode}
          cx="70.5"
          cy="45"
          r="0.6"
        />
        <circle
          data-callout-node
          className={styles.calloutNode}
          cx="70"
          cy="67"
          r="0.6"
        />
      </svg>

      {robotCallouts.map((callout) => (
        <div
          key={callout.name}
          className={`${styles.calloutItem} ${callout.className}`}
          data-callout-item
        >
          <span className={styles.calloutIndex}>{callout.index}</span>
          <strong className={styles.calloutName}>{callout.name}</strong>
          <span className={styles.calloutDescription}>
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
      className={`${styles.section} ${styles.aboutPanel}`}
      data-story-panel="about"
    >
      <div className={`${styles.sectionInner} ${styles.about}`}>
        <div className={styles.aboutCopy} data-story-element="about-copy">
          <p className={styles.eyebrow}>About Us</p>
          <h2 className={styles.sectionTitle}>
            Advancing Intelligence Through AI Technology
          </h2>
          <p className={styles.sectionIntro}>
            We develop intelligent AI solutions that help businesses automate
            workflows, analyze complex data, and make faster, smarter
            decisions. Our technology is accurate, scalable, and ready for
            real-world challenges.
          </p>
          <a href="#service" className={styles.cta}>
            Explore Demo
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.aboutVisual} data-story-element="about-visual">
          <Image
            src="/earth-network.svg"
            alt="The illuminated Earth viewed from space"
            fill
            sizes="(max-width: 1184px) 50vw, 580px"
            className={styles.coverImage}
          />
        </div>
      </div>

      <RobotCallouts />
    </section>
  );
}
