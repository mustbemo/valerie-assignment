import { Search, UserRound } from "lucide-react";

import styles from "@/components/landing/landing.module.css";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Feature", href: "#feature" },
  { label: "Service", href: "#service" },
  { label: "Blog", href: "#blog" },
] as const;

export function HeroHeader() {
  return (
    <header className={styles.heroHeader} data-story-element="hero-header">
      <a
        href="#home"
        className={styles.brand}
        aria-label="SkyAI home"
      >
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandName}>SkyAI</span>
      </a>

      <nav aria-label="Primary navigation">
        <ul className={styles.navList}>
          {navigationItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`${styles.navLink} ${index === 0 ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.headerActions}>
        <label className={styles.searchField}>
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search Your Item"
            className={styles.searchInput}
          />
          <Search size={20} aria-hidden="true" />
        </label>

        <button
          type="button"
          className={styles.profileButton}
          aria-label="Open profile"
        >
          <UserRound size={20} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
