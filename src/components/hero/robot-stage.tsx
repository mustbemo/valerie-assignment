"use client";

import { useCallback, useState } from "react";

import styles from "@/components/landing/landing.module.css";

import { RobotScene } from "./robot-scene";

function RobotLoadingState() {
  return (
    <div className={styles.robotLoader} aria-hidden="true">
      <div className={styles.robotLoaderGlow} />
    </div>
  );
}

export function RobotStage() {
  const [isLoading, setIsLoading] = useState(true);
  const handleReady = useCallback(() => setIsLoading(false), []);

  return (
    <div
      className={styles.robotStage}
      role="img"
      aria-label="A futuristic humanoid robot illuminated with purple light"
    >
      {isLoading && <RobotLoadingState />}
      <RobotScene onReady={handleReady} />
    </div>
  );
}
