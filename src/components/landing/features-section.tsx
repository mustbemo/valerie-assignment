import Image from "next/image";

import { cn } from "@/lib/utils";

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
    <section
      id="feature"
      className="relative min-h-svh overflow-hidden bg-brand-900 px-8 py-12 xl:px-12"
    >
      <div className="relative mx-auto flex w-full max-w-330 flex-col justify-center">
        <header className="relative z-30 grid grid-cols-2 items-end gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs text-foreground/70 before:size-2 before:rounded-full before:bg-primary">
              Feature
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-tight tracking-wide">
              Built with Powerful AI Capabilities
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Our AI platform is designed with advanced features that help
            businesses operate smarter, faster, and more efficiently through
            intelligent technology.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 items-center gap-16 max-xl:gap-10">
          <div>
            <div className="relative z-10 aspect-3/2 overflow-hidden rounded-4xl border border-foreground/10 bg-brand-950 shadow-2xl shadow-brand-950/30">
              <Image
                src="/neural-stream.svg"
                alt="Glowing neural data paths flowing through a digital network"
                fill
                sizes="(max-width: 1184px) 45vw, 540px"
                className="object-cover"
              />
            </div>
            <div
              className="mt-4 flex justify-center gap-3"
              aria-label="Feature image 1 of 5"
            >
              {[0, 1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={cn(
                    "size-3 rounded-full bg-foreground/70",
                    dot === 0 && "bg-primary",
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="relative z-30 space-y-3">
            {features.map((feature, index) => (
              <article
                key={feature.name}
                className={cn(
                  "rounded-3xl border border-primary px-6 py-4",
                  index === 0 &&
                    "border-transparent bg-primary text-primary-foreground",
                )}
              >
                <h3 className="text-xl font-semibold">{feature.name}</h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-snug text-muted-foreground",
                    index === 0 && "text-primary-foreground/70",
                  )}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
