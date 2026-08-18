const circuitPaths = [
  {
    id: "upper-left",
    d: "M0 54H188L236 102H416L474 160H614L704 250",
    delayClass: "circuit-signal-delay-1",
  },
  {
    id: "lower-left",
    d: "M0 286H244L294 236H474L526 288H642L704 250",
    delayClass: "circuit-signal-delay-2",
  },
  {
    id: "upper-right",
    d: "M1440 74H1252L1204 122H1028L972 178H826L736 250",
    delayClass: "circuit-signal-delay-3",
  },
  {
    id: "lower-right",
    d: "M1440 306H1198L1148 256H978L924 304H804L736 250",
    delayClass: "circuit-signal-delay-4",
  },
  {
    id: "bottom",
    d: "M720 384V274",
    delayClass: "circuit-signal-delay-5",
  },
  {
    id: "bottom-left-wide",
    d: "M176 384V354H346L394 306H548L590 348H654L704 298",
    delayClass: "circuit-signal-delay-6",
  },
  {
    id: "bottom-left-inner",
    d: "M438 384V338H548L586 300H646L704 242",
    delayClass: "circuit-signal-delay-7",
  },
  {
    id: "bottom-right-inner",
    d: "M1002 384V338H892L854 300H794L736 242",
    delayClass: "circuit-signal-delay-8",
  },
  {
    id: "bottom-right-wide",
    d: "M1264 384V354H1094L1046 306H892L850 348H786L736 298",
    delayClass: "circuit-signal-delay-9",
  },
] as const;

export function CircuitConvergence() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-x-1/4 bottom-0 h-4/5 rounded-full bg-primary/10 blur-3xl" />

      <svg
        viewBox="0 0 1440 384"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="circuit-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d14bff" stopOpacity="0.08" />
            <stop offset="0.52" stopColor="#e37cff" stopOpacity="0.48" />
            <stop offset="1" stopColor="#fff8ff" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id="circuit-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#d14bff" stopOpacity="0" />
            <stop offset="0.46" stopColor="#e37cff" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <filter id="circuit-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="opacity-80">
          {circuitPaths.map((path) => (
            <path
              key={`${path.id}-halo`}
              d={path.d}
              pathLength="1"
              stroke="#d14bff"
              strokeOpacity="0.12"
              strokeWidth="8"
              vectorEffect="non-scaling-stroke"
              className="blur-md"
            />
          ))}
        </g>

        <g>
          {circuitPaths.map((path) => (
            <path
              key={`${path.id}-line`}
              d={path.d}
              pathLength="1"
              stroke="url(#circuit-line)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g filter="url(#circuit-glow)">
          {circuitPaths.map((path) => (
            <path
              key={`${path.id}-signal`}
              d={path.d}
              pathLength="1"
              stroke="url(#circuit-pulse)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className={`circuit-signal ${path.delayClass}`}
            />
          ))}
        </g>

        <g stroke="#f9eaff" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <path d="M690 236L704 250L690 264" />
          <path d="M750 236L736 250L750 264" />
          <path d="M706 290L720 276L734 290" />
        </g>

        <g fill="#fff8ff" filter="url(#circuit-glow)">
          <circle cx="704" cy="250" r="2.5" />
          <circle cx="736" cy="250" r="2.5" />
          <circle cx="720" cy="274" r="2.5" />
          <circle cx="590" cy="348" r="2" />
          <circle cx="850" cy="348" r="2" />
          <circle cx="586" cy="300" r="2" />
          <circle cx="854" cy="300" r="2" />
        </g>
      </svg>

      <div className="absolute inset-x-[42%] bottom-10 h-28 rounded-full bg-white/8 blur-3xl" />
    </div>
  );
}
