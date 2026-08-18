import Image from "next/image";

import styles from "./landing.module.css";

const features = [
  {
    name: "Real-Time AI Processing",
    description:
      "Process and analyze data instantly to deliver fast, accurate insights that support timely and informed decision-making.",
  },
  {
    name: "Scalable AI Architecture",
    description:
      "Expand from focused workflows to organization-wide intelligence without rebuilding your foundation.",
  },
  {
    name: "Advanced Data Security",
    description:
      "Protect sensitive information through responsible access controls and secure processing practices.",
  },
  {
    name: "Customizable AI Models",
    description:
      "Adapt models to your data, business language, and operational goals for results that stay relevant.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="feature" className={styles.section}>
      <div className={`${styles.sectionInner} ${styles.feature}`}>
        <header className={styles.featureHeading}>
          <div>
            <p className={styles.eyebrow}>Feature</p>
            <h2 className={styles.sectionTitle}>
              Built with Powerful AI Capabilities
            </h2>
          </div>
          <p className={styles.sectionIntro}>
            Our AI platform is designed with advanced features that help
            businesses operate smarter, faster, and more efficiently through
            intelligent technology.
          </p>
        </header>

        <div className={styles.featureGrid}>
          <div>
            <div className={styles.featureVisual}>
              <Image
                src="/neural-stream.svg"
                alt="Glowing neural data paths flowing through a digital network"
                fill
                sizes="(max-width: 1184px) 45vw, 540px"
                className={styles.coverImage}
              />
            </div>
            <div className={styles.carouselDots} aria-label="Feature image 1 of 5">
              {[0, 1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={`${styles.carouselDot} ${dot === 0 ? styles.carouselDotActive : ""}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className={styles.featureList}>
            {features.map((feature, index) => (
              <article
                key={feature.name}
                className={`${styles.featureItem} ${index === 0 ? styles.featureItemActive : ""}`}
              >
                <h3 className={styles.featureName}>{feature.name}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
