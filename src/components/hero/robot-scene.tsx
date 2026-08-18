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
const SERVICE_ROTATION = MathUtils.degToRad(330);
const FORWARD_ROTATION = MathUtils.degToRad(360);

type MotionState = {
  x: number;
  y: number;
  scale: number;
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
  scale: 0.98,
  cameraY: 0.04,
  cameraZ: 7.65,
  cameraTargetY: -0.18,
  keyLight: 42,
  fillLight: 26,
  cursorInfluence: 0.35,
};

const aboutRestMotion: MotionState = {
  ...heroFocusedMotion,
  x: 0.85,
  y: -0.28,
  scale: 0.66,
  cameraY: -0.06,
  cameraZ: 7.75,
  cameraTargetY: -0.02,
  keyLight: 41,
  fillLight: 27,
  cursorInfluence: 0,
};

const serviceMotion: MotionState = {
  x: 2.2,
  y: -0.45,
  scale: 0.66,
  cameraY: -0.04,
  cameraZ: 7.75,
  cameraTargetY: -0.01,
  keyLight: 38,
  fillLight: 32,
  cursorInfluence: 0,
};

const serviceFollowMotion: MotionState = {
  ...serviceMotion,
  y: 0.55,
  cameraTargetY: 0.04,
};

const featureFocusMotion: MotionState = {
  x: 0,
  y: -1.6,
  scale: 1.02,
  cameraY: -0.04,
  cameraZ: 7.1,
  cameraTargetY: 0.04,
  keyLight: 42,
  fillLight: 34,
  cursorInfluence: 0,
};

const featureMotion: MotionState = {
  x: 0,
  y: -3.05,
  scale: 1.02,
  cameraY: -0.04,
  cameraZ: 7.25,
  cameraTargetY: 0,
  keyLight: 34,
  fillLight: 25,
  cursorInfluence: 0,
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
  const orientation = useRef({ y: 0 });
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
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      introTimeline
        .to(
          motion.current,
          {
            ...heroFocusedMotion,
            duration: 0.35,
            ease: "power2.out",
          },
          0,
        )
        .to(
          motion.current,
          {
            ...aboutRestMotion,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0.35,
        )
        .to(
          motion.current,
          {
            ...aboutRestMotion,
            duration: 0.4,
            ease: "none",
          },
          1.45,
        );

      const serviceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#service",
          start: "top bottom",
          endTrigger: "#feature",
          end: "top bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      serviceTimeline
        .to(
          motion.current,
          {
            ...serviceMotion,
            duration: 0.47,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          motion.current,
          {
            ...serviceFollowMotion,
            duration: 0.53,
            ease: "none",
          },
          0.47,
        )
        .to(
          orientation.current,
          {
            y: SERVICE_ROTATION,
            duration: 0.47,
            ease: "power2.inOut",
          },
          0,
        );

      const featureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#feature",
          start: "top bottom",
          end: "top -90%",
          scrub: 0.95,
          invalidateOnRefresh: true,
        },
      });

      featureTimeline
        .to(
          orientation.current,
          {
            y: FORWARD_ROTATION,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          motion.current,
          {
            ...featureFocusMotion,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          motion.current,
          {
            ...featureMotion,
            duration: 0.95,
            ease: "power2.inOut",
          },
          0.7,
        );

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
      orientation.current.y + cursorYaw,
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
