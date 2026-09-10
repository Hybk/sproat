import { rocketStroke } from "@/animations/rocketStroke";

// Pen order: body sides, then nose tip and its bands top-down, base, fins, ticks.
const DRAW_ORDER = [
  1, 0, 2, 19, 18, 17, 16, 15, 14, 13, 12, 11, 7, 8, 9, 10, 3, 4, 5, 6,
];
const FLAME = [20, 21];

export function Rocket({
  className,
  flame = false,
}: {
  className?: string;
  flame?: boolean;
}) {
  const order = flame ? [...DRAW_ORDER, ...FLAME] : DRAW_ORDER;
  const byIndex = new Map<number, (typeof rocketStroke.paths)[number]>(
    rocketStroke.paths.map((p) => [p.i, p]),
  );

  return (
    <svg
      viewBox={rocketStroke.viewBox}
      fill="none"
      aria-hidden
      focusable="false"
      data-rocket
      className={className}
    >
      {order.map((i, step) => {
        const path = byIndex.get(i);
        if (!path) return null;
        return (
          <path
            key={i}
            data-rocket-part={step}
            d={path.d}
            fill="none"
            stroke={path.c}
            strokeWidth={path.w}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}
