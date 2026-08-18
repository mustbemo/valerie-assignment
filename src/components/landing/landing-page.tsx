import { HeroSection } from "@/components/hero/hero-section";
import { RobotPreload } from "@/components/hero/robot-preload";
import { RobotStage } from "@/components/hero/robot-stage";

import { AboutSection } from "./about-section";
import { CustomCursor } from "./custom-cursor";
import { FeaturesSection } from "./features-section";
import { IntroStory } from "./intro-story";
import { ServicesSection } from "./services-section";
import { ViewportLock } from "./viewport-lock";

export function LandingPage() {
  return (
    <>
      <ViewportLock />
      <div
        id="landing-page"
        className="relative overflow-x-clip bg-background text-foreground [@media(max-height:719px)]:hidden max-[1279px]:hidden"
      >
        <RobotPreload />
        <CustomCursor />
        <RobotStage />
        <IntroStory>
          <HeroSection />
          <AboutSection />
        </IntroStory>
        <ServicesSection />
        <FeaturesSection />
      </div>
    </>
  );
}
