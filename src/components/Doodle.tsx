import { doodleArt, type DoodleName } from "@/animations/doodleArt";

type Props = {
  name: DoodleName;
  reveal: "sweep" | "radial";
  angle?: number;
  className?: string;
};

export function Doodle({ name, reveal, angle = 0, className }: Props) {
  const art = doodleArt[name];
  const maskId = `doodle-mask-${name}`;
  const cx = art.width / 2;
  const cy = art.height / 2;
  const span = Math.hypot(art.width, art.height);

  return (
    <svg
      viewBox={art.viewBox}
      width={art.width}
      height={art.height}
      aria-hidden
      focusable="false"
      data-doodle={name}
      data-anim="doodle"
      className={className}
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={cx - span}
          y={cy - span}
          width={span * 2}
          height={span * 2}
        >
          {reveal === "sweep" ? (
            <g transform={`rotate(${angle} ${cx} ${cy})`}>
              <rect
                data-doodle-reveal
                x={cx - span}
                y={cy - span}
                width={span * 2}
                height={span * 2}
                fill="white"
              />
            </g>
          ) : (
            <circle
              data-doodle-reveal
              cx={cx}
              cy={cy}
              r={span / 2}
              fill="none"
              stroke="white"
              strokeWidth={span}
              strokeDasharray={Math.PI * span}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          )}
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        {art.paths.map((path, i) => (
          <path key={i} d={path.d} fill={path.fill} />
        ))}
      </g>
    </svg>
  );
}
