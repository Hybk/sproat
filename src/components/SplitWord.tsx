export function SplitWord({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((char, i) => (
        <span key={i} aria-hidden data-char className="inline-block">
          {char}
        </span>
      ))}
    </span>
  );
}
