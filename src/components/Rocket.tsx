import { rocketArt } from "@/animations/rocketArt";

export function Rocket({ className }: { className?: string }) {
  return (
    <svg
      viewBox={rocketArt.viewBox}
      width={rocketArt.width}
      height={rocketArt.height}
      fill="none"
      aria-hidden
      focusable="false"
      data-rocket
      className={className}
    >
      {rocketArt.paths.map((path, i) => (
        <path
          key={i}
          data-rocket-part={i}
          d={path.d}
          fill={path.fill}
          stroke={"stroke" in path ? path.stroke : undefined}
          strokeWidth={"strokeWidth" in path ? path.strokeWidth : undefined}
        />
      ))}
    </svg>
  );
}
