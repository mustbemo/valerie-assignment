import { Bot, Cpu, Radar } from "lucide-react";

import styles from "./landing.module.css";

const services = [
  {
    name: "AI Automation",
    description:
      "Automating workflows to improve efficiency and reduce operational complexity.",
    Icon: Bot,
    visualClass: styles.serviceVisualCode,
  },
  {
    name: "Data Intelligence & Analytics",
    description:
      "Transforming data into actionable insights for smarter decision making.",
    Icon: Cpu,
    visualClass: styles.serviceVisualData,
  },
  {
    name: "Predictive AI Solutions",
    description:
      "Forecasting trends and outcomes using advanced machine learning models.",
    Icon: Radar,
    visualClass: styles.serviceVisualPredictive,
  },
] as const;

export function ServicesSection() {
  return (
    <section id="service" className={styles.section}>
      <div className={`${styles.sectionInner} ${styles.services}`}>
        <header className={styles.servicesHeading}>
          <p className={styles.eyebrow}>Service</p>
          <h2 className={styles.sectionTitle}>
            Intelligent AI Solutions for Modern Businesses
          </h2>
          <p className={styles.sectionIntro}>
            We deliver advanced artificial intelligence services designed to
            automate processes, analyze data intelligently, and help
            organizations make faster, more accurate decisions.
          </p>
        </header>

        <div className={styles.servicesGrid}>
          {services.map(({ name, description, Icon, visualClass }) => (
            <article key={name} className={styles.serviceCard}>
              <div className={`${styles.serviceVisual} ${visualClass}`}>
                <Icon className={styles.serviceIcon} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceName}>{name}</h3>
                <p className={styles.serviceDescription}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
