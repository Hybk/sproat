import { rocketArt } from "@/animations/rocketArt";

// Pen order: body sides, nose tip, bands top-down, base, fins, ticks.
const DRAW_ORDER = [
  1, 0, 2, 19, 18, 17, 16, 15, 14, 13, 12, 11, 7, 8, 9, 10, 3, 4, 5, 6,
];
const FLAME = [20, 21];

// The flame sits below the body; without it the artwork ends at y=858.
const NO_FLAME_VIEWBOX = "0 0 580.593 858";

export function Rocket({
  className,
  flame = false,
}: {
  className?: string;
  flame?: boolean;
}) {
  const order = flame ? [...DRAW_ORDER, ...FLAME] : DRAW_ORDER;
  const byIndex = new Map<number, (typeof rocketArt.paths)[number]>(
    rocketArt.paths.map((p) => [p.i, p]),
  );
  const viewBox = flame ? rocketArt.viewBox : NO_FLAME_VIEWBOX;
  const [, , vw, vh] = viewBox.split(" ").map(Number);

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden
      focusable="false"
      data-rocket
      className={className}
    >
      {order.map((i, step) => {
        const path = byIndex.get(i);
        if (!path) return null;

        const maskId = `rocket-pen-${i}`;
        const stroked = "sw" in path;

        // Every path is Figma's own artwork, revealed through a pen travelling
        // along it. Only the pen carries the dash — and it lives inside a mask,
        // so it can never paint a cap or an endpoint onto the page.
        return (
          <g key={i}>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x={-vw}
              y={-vh}
              width={vw * 3}
              height={vh * 3}
            >
              <path
                data-rocket-pen={step}
                d={path.pen}
                fill="none"
                stroke="white"
                strokeWidth={path.pw}
                strokeLinecap="butt"
                strokeLinejoin="round"
              />
            </mask>
            <path
              data-rocket-fill
              d={path.d}
              fill={stroked ? "none" : path.c}
              stroke={stroked ? path.c : undefined}
              strokeWidth={stroked ? path.sw : undefined}
              strokeLinecap={stroked ? "round" : undefined}
              strokeLinejoin={stroked ? "round" : undefined}
              mask={`url(#${maskId})`}
            />
          </g>
        );
      })}
    </svg>
  );
}
