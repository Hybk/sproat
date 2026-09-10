import { rocketArt } from "@/animations/rocketArt";

const NO_FLAME_VIEWBOX = "0 0 580.593 858";
const NO_FLAME_HEIGHT = 858;
const FLAME_FROM = 20;

export function Rocket({
  className,
  flame = false,
}: {
  className?: string;
  flame?: boolean;
}) {
  const paths = flame ? rocketArt.paths : rocketArt.paths.slice(0, FLAME_FROM);
  const viewBox = flame ? rocketArt.viewBox : NO_FLAME_VIEWBOX;
  const height = flame ? rocketArt.height : NO_FLAME_HEIGHT;
  const width = rocketArt.width;

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      aria-hidden
      focusable="false"
      data-rocket
      className={className}
    >
      <defs>
        <mask
          id="rocket-reveal"
          maskUnits="userSpaceOnUse"
          x={-width}
          y={-height}
          width={width * 3}
          height={height * 3}
        >
          <rect
            data-rocket-reveal
            x={-width}
            y={0}
            width={width * 3}
            height={height}
            fill="white"
          />
        </mask>
      </defs>
      <g mask="url(#rocket-reveal)">
        {paths.map((path, i) => (
          <path
            key={i}
            data-rocket-part={i}
            d={path.d}
            fill={path.fill}
            stroke={"stroke" in path ? path.stroke : undefined}
            strokeWidth={"strokeWidth" in path ? path.strokeWidth : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
