# SkyAI Landing Page

An interactive desktop landing page built for the Valerie Group frontend assessment. It covers the first four sections of the supplied design and uses a scroll-driven 3D robot throughout the page.

- [GitHub repository](https://github.com/mustbemo/valerie-assignment)
- [Live demo](https://valerie-assignment-danish.vercel.app/)

## Run locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Built with

Next.js, TypeScript, React Three Fiber, Three.js, GSAP ScrollTrigger and Tailwind CSS.

## Submission notes

- Final GLB size: **8.8 MB** (9,251,208 bytes)
- The animation follows scroll progress and reverses naturally.
- No features from the four-section desktop brief were omitted.

The page is desktop-only, as requested in the assignment.

### Model optimization

I resized the textures to 2K, removed duplicate and unused data, and applied Meshopt compression. This brought the model down from roughly 250 MB to under 12 MB without a noticeable loss in quality. The final GLB in this repository is 8.8 MB.

```bash
gltf-transform resize robot.glb robot-2k.glb --width 2048 --height 2048
gltf-transform dedup robot-2k.glb robot-step1.glb
gltf-transform prune robot-step1.glb robot-step2.glb
gltf-transform meshopt robot-step2.glb robot-smaller.glb
```

### Code optimization

- The robot loads inside a Suspense boundary, so the rest of the page can render first.
- The GLB is preloaded and cached for faster loading and repeat visits.
- Canvas DPR is capped at 1.5 and requests the high-performance GPU mode.
- ScrollTrigger scrub and Three.js damping keep movement tied smoothly to scroll progress.
- Reduced-motion preferences are respected.
