"use client";

import { useCallback, useState } from "react";

import { RobotScene } from "./robot-scene";

function RobotLoadingState() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="h-7/10 w-1/3 animate-pulse rounded-full bg-primary/15 blur-3xl" />
    </div>
  );
}

export function RobotStage() {
  const [isLoading, setIsLoading] = useState(true);
  const handleReady = useCallback(() => setIsLoading(false), []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      role="img"
      aria-label="A futuristic humanoid robot illuminated with purple light"
    >
      {isLoading && <RobotLoadingState />}
      <RobotScene onReady={handleReady} />
    </div>
  );
}
