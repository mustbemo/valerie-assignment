"use client";

import ReactDOM from "react-dom";

const MODEL_PATH = "/robot.glb";

export function RobotPreload() {
  ReactDOM.preload(MODEL_PATH, {
    as: "fetch",
    crossOrigin: "anonymous",
    fetchPriority: "high",
    type: "model/gltf-binary",
  });

  return null;
}
