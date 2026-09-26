import { PALETTE } from "../data/sprites";

// ─────────────────────────────────────────────────────────────
// Pixel — renders a character map as SVG rects with crisp edges.
// Runs of identical characters are merged into one rect, so a
// 16×16 sprite costs a handful of DOM nodes, not 256.
// ─────────────────────────────────────────────────────────────

export function Pixel({ rows, size = 4, className = "", title }) {
  const h = rows.length;
  const w = rows[0].length;

  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < w) {
      const ch = row[x];
      let x2 = x;
      while (x2 < w && row[x2] === ch) x2++;
      const fill = PALETTE[ch];
      if (fill) {
        rects.push(
          <rect key={`${y}-${x}`} x={x} y={y} width={x2 - x} height={1} fill={fill} />
        );
      }
      x = x2;
    }
  });

  return (
    <svg
      className={`pixel ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      width={w * size}
      height={h * size}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {rects}
    </svg>
  );
}
