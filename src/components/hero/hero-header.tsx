import { Search, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Feature", href: "#feature" },
  { label: "Service", href: "#service" },
  { label: "Blog", href: "#blog" },
] as const;

export function HeroHeader() {
  return (
    <header
      className="relative z-50 mx-auto flex w-full max-w-330 items-center justify-between px-8 pt-10 will-change-[filter,opacity,transform] xl:px-12"
      data-story-element="hero-header"
    >
      <a
        href="#home"
        className="flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="SkyAI home"
      >
        <span
          className="relative block size-11 before:absolute before:bottom-0 before:left-0 before:size-9 before:rounded-full before:bg-primary after:absolute after:top-0 after:right-0 after:size-7 after:rounded-full after:bg-brand-glow"
          aria-hidden="true"
        />
        <span className="text-3xl font-bold tracking-tight">SkyAI</span>
      </a>

      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-2 text-base text-foreground/85">
          {navigationItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={cn(
                  "block rounded-full border border-transparent px-5 py-2.5 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                  index === 0 && "border-primary/90 text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <label className="flex h-11 w-62.5 items-center gap-3 rounded-full bg-primary px-5 text-primary-foreground shadow-lg shadow-primary/20 max-xl:hidden">
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search Your Item"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-primary-foreground/80"
          />
          <Search size={20} aria-hidden="true" />
        </label>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          aria-label="Open profile"
        >
          <UserRound size={20} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
