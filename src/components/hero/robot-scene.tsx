"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Box3,
  Group,
  MathUtils,
  PerspectiveCamera as PerspectiveCameraObject,
  PointLight,
  Vector3,
} from "three";

const MODEL_PATH = "/robot.glb";
const NORMALIZED_MODEL_HEIGHT = 5.35;
const FULL_ROTATION = Math.PI * 2;

type MotionState = {
  x: number;
  y: number;
  scale: number;
  rotationY: number;
  cameraY: number;
  cameraZ: number;
  cameraTargetY: number;
  keyLight: number;
  fillLight: number;
  cursorInfluence: number;
};

const initialMotion: MotionState = {
  x: 0.12,
  y: -2.34,
  scale: 0.98,
  rotationY: -0.36,
  cameraY: 0.08,
  cameraZ: 8.15,
  cameraTargetY: -0.24,
  keyLight: 38,
  fillLight: 23,
  cursorInfluence: 0.45,
};

const heroFocusedMotion: MotionState = {
  x: 0,
  y: -1.34,
  scale: 1.02,
  rotationY: 0,
  cameraY: 0.08,
  cameraZ: 8.15,
  cameraTargetY: -0.24,
  keyLight: 42,
  fillLight: 26,
  cursorInfluence: 0.35,
};

const aboutHandoffMotion: MotionState = {
  ...heroFocusedMotion,
  x: 0,
  y: -0.34,
  scale: 0.9,
  rotationY: 0,
  cameraY: 0,
  cameraZ: 8.5,
  cameraTargetY: -0.08,
  keyLight: 48,
  fillLight: 30,
  cursorInfluence: 0.04,
};

const aboutRestMotion: MotionState = {
  ...heroFocusedMotion,
  x: 1.82,
  y: -0.3,
  scale: 0.7,
  rotationY: -0.08,
  cameraY: 0,
  cameraZ: 8.75,
  cameraTargetY: -0.06,
  keyLight: 41,
  fillLight: 27,
  cursorInfluence: 0.04,
};

const serviceMotion: MotionState = {
  x: 2.25,
  y: -0.08,
  scale: 0.72,
  rotationY: FULL_ROTATION * 0.58,
  cameraY: -0.24,
  cameraZ: 8.35,
  cameraTargetY: 0.02,
  keyLight: 32,
  fillLight: 36,
  cursorInfluence: 0.18,
};

const featureMotion: MotionState = {
  x: 1.72,
  y: -0.18,
  scale: 0.76,
  rotationY: FULL_ROTATION,
  cameraY: 0.04,
  cameraZ: 8.55,
  cameraTargetY: -0.14,
  keyLight: 38,
  fillLight: 24,
  cursorInfluence: 0.22,
};

gsap.registerPlugin(ScrollTrigger);

type RobotModelProps = {
  onReady: () => void;
};

function RobotModel({ onReady }: RobotModelProps) {
  const robotGroup = useRef<Group>(null);
  const camera = useRef<PerspectiveCameraObject>(null);
  const keyLight = useRef<PointLight>(null);
  const fillLight = useRef<PointLight>(null);
  const motion = useRef<MotionState>({ ...initialMotion });
  const cursor = useRef({ x: 0, y: 0 });
  const { scene } = useGLTF(MODEL_PATH, false, true);

  const normalizedModel = useMemo(() => {
    const model = scene.clone(true);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());

    return {
      model,
      center,
      scale: NORMALIZED_MODEL_HEIGHT / size.y,
    };
  }, [scene]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      Object.assign(motion.current, heroFocusedMotion);
      return;
    }

    const context = gsap.context(() => {
      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#intro-story",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      introTimeline
        .to(
          motion.current,
          {
            ...heroFocusedMotion,
            duration: 0.6,
            ease: "power2.out",
          },
          0,
        )
        .to(
          motion.current,
          {
            ...aboutHandoffMotion,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.35,
        )
        .to(
          motion.current,
          {
            ...aboutHandoffMotion,
            duration: 0.22,
            ease: "none",
          },
          1.15,
        )
        .to(
          motion.current,
          {
            ...aboutRestMotion,
            duration: 0.62,
            ease: "power3.inOut",
          },
          1.37,
        )
        .to(
          motion.current,
          {
            ...aboutRestMotion,
            duration: 1.57,
            ease: "none",
          },
          1.99,
        );

      gsap.to(motion.current, {
        ...serviceMotion,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: "#service",
          start: "top 82%",
          end: "top 38%",
          scrub: 0.38,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(motion.current, {
        ...featureMotion,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: "#feature",
          start: "top 82%",
          end: "top 38%",
          scrub: 0.38,
          invalidateOnRefresh: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => context.revert();
  }, []);

  useFrame((_state, delta) => {
    const group = robotGroup.current;
    const sceneCamera = camera.current;
    if (!group || !sceneCamera) return;

    const state = motion.current;
    const cursorYaw = cursor.current.x * 0.13 * state.cursorInfluence;
    const cursorPitch = cursor.current.y * 0.045 * state.cursorInfluence;

    group.position.x = MathUtils.damp(group.position.x, state.x, 9, delta);
    group.position.y = MathUtils.damp(group.position.y, state.y, 9, delta);
    group.scale.setScalar(
      MathUtils.damp(group.scale.x, state.scale, 10, delta),
    );
    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      state.rotationY + cursorYaw,
      10,
      delta,
    );
    group.rotation.x = MathUtils.damp(group.rotation.x, cursorPitch, 7, delta);

    sceneCamera.position.y = MathUtils.damp(
      sceneCamera.position.y,
      state.cameraY,
      9,
      delta,
    );
    sceneCamera.position.z = MathUtils.damp(
      sceneCamera.position.z,
      state.cameraZ,
      9,
      delta,
    );
    sceneCamera.lookAt(0, state.cameraTargetY, 0);

    if (keyLight.current) {
      keyLight.current.intensity = MathUtils.damp(
        keyLight.current.intensity,
        state.keyLight,
        8,
        delta,
      );
    }
    if (fillLight.current) {
      fillLight.current.intensity = MathUtils.damp(
        fillLight.current.intensity,
        state.fillLight,
        8,
        delta,
      );
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        fov={32}
        position={[0, initialMotion.cameraY, initialMotion.cameraZ]}
      />
      <ambientLight intensity={1.3} />
      <hemisphereLight args={["#f8e9ff", "#17031e", 2.2]} />
      <directionalLight position={[-4, 6, 5]} color="#fff8ff" intensity={3.8} />
      <pointLight
        ref={keyLight}
        position={[3, 2, 4]}
        color="#d14bff"
        intensity={initialMotion.keyLight}
        distance={10}
      />
      <pointLight
        ref={fillLight}
        position={[-3, -1, 3]}
        color="#7d22a1"
        intensity={initialMotion.fillLight}
        distance={9}
      />

      <group
        ref={robotGroup}
        position={[initialMotion.x, initialMotion.y, 0]}
        scale={initialMotion.scale}
      >
        <group scale={normalizedModel.scale}>
          <primitive
            object={normalizedModel.model}
            position={[
              -normalizedModel.center.x,
              -normalizedModel.center.y,
              -normalizedModel.center.z,
            ]}
          />
        </group>
      </group>
    </>
  );
}

type RobotSceneProps = {
  onReady: () => void;
};

export function RobotScene({ onReady }: RobotSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <RobotModel onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH, false, true);
