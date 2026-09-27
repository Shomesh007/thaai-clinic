import React, { useMemo } from 'react';
import { motion } from 'motion/react';

/**
 * Kolam — the dot-and-line drawing made at the doorstep of Karaikal homes each
 * morning. Used as Thaai Clinic's one decorative motif instead of stock icons.
 *
 * Geometry: dots sit on a checkerboard lattice inside a rhombus (|i|+|j| ≤ n,
 * i+j even). Each dot is enclosed by a softly-cornered diamond; neighbouring
 * diamonds share edges, so together they read as one continuous kolam. The
 * outermost tips get small loops, like the finishing flourishes of a pulli kolam.
 */

interface KolamProps {
  /** Rhombus radius in lattice steps (2 → 5 dots, 4 → 13 dots). */
  n?: number;
  /** Lattice step in SVG units. */
  step?: number;
  stroke?: string;
  dot?: string;
  strokeWidth?: number;
  /** Draw the lines in on mount. */
  draw?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

function diamondPath(cx: number, cy: number, r: number): string {
  // Diamond with gently rounded corners (quadratic curves at each vertex).
  const k = r * 0.28;
  const top = [cx, cy - r];
  const right = [cx + r, cy];
  const bottom = [cx, cy + r];
  const left = [cx - r, cy];
  const lerp = (a: number[], b: number[], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const t = k / r;
  const pts = [top, right, bottom, left];
  let d = '';
  pts.forEach((p, i) => {
    const prev = pts[(i + 3) % 4];
    const next = pts[(i + 1) % 4];
    const a = lerp(p, prev, t);
    const b = lerp(p, next, t);
    d += `${i === 0 ? 'M' : 'L'}${a[0].toFixed(2)} ${a[1].toFixed(2)} Q${p[0]} ${p[1]} ${b[0].toFixed(2)} ${b[1].toFixed(2)} `;
  });
  return d + 'Z';
}

export const Kolam: React.FC<KolamProps> = ({
  n = 2,
  step = 20,
  stroke = 'currentColor',
  dot,
  strokeWidth = 1.6,
  draw = false,
  delay = 0,
  duration = 1.6,
  className,
}) => {
  const { dots, loops, size } = useMemo(() => {
    const d: { x: number; y: number; ring: number }[] = [];
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        if (Math.abs(i) + Math.abs(j) <= n && (i + j + n) % 2 === 0) {
          d.push({ x: i * step, y: j * step, ring: Math.abs(i) + Math.abs(j) });
        }
      }
    }
    const r = step * 0.62;
    const tips = [
      [0, -(n * step + step)],
      [n * step + step, 0],
      [0, n * step + step],
      [-(n * step + step), 0],
    ];
    return { dots: d, loops: tips.map(([x, y]) => ({ x, y, r })), size: (n + 2) * step };
  }, [n, step]);

  const r = step;
  const dotColor = dot ?? stroke;

  return (
    <svg
      viewBox={`${-size} ${-size} ${size * 2} ${size * 2}`}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {dots.map((p, idx) => (
        <motion.path
          key={`d-${idx}`}
          d={diamondPath(p.x, p.y, r)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={draw ? { pathLength: 0, opacity: 0 } : false}
          animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration, ease: [0.65, 0, 0.35, 1], delay: delay + p.ring * 0.18 }}
        />
      ))}
      {loops.map((l, idx) => (
        <motion.circle
          key={`l-${idx}`}
          cx={l.x}
          cy={l.y}
          r={l.r * 0.55}
          stroke={stroke}
          strokeWidth={strokeWidth}
          initial={draw ? { pathLength: 0, opacity: 0 } : false}
          animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: duration * 0.6, delay: delay + n * 0.18 + duration * 0.5 }}
        />
      ))}
      {dots.map((p, idx) => (
        <motion.circle
          key={`p-${idx}`}
          cx={p.x}
          cy={p.y}
          r={strokeWidth * 1.4}
          fill={dotColor}
          initial={draw ? { scale: 0 } : false}
          animate={draw ? { scale: 1 } : undefined}
          transition={{ delay: delay + p.ring * 0.05, type: 'spring', stiffness: 500, damping: 20 }}
        />
      ))}
    </svg>
  );
};

/** Tiny three-dot kolam mark used beside section headings. */
export const KolamMark: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-rose' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M12 3.5 Q15 6.5 17.5 9 Q15 11.5 12 14.5 Q9 11.5 6.5 9 Q9 6.5 12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 14.5 Q14 16.5 15.5 18 Q14 19.5 12 21.5 Q10 19.5 8.5 18 Q10 16.5 12 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.4" fill="currentColor" />
    <circle cx="12" cy="18" r="1.1" fill="currentColor" />
  </svg>
);

/** Scalloped certificate seal with the issuing institution's initials. */
export const Seal: React.FC<{ initials: string; className?: string; color?: string }> = ({
  initials,
  className = 'w-14 h-14',
  color = '#D81B60',
}) => {
  const points = useMemo(() => {
    const out: string[] = [];
    const spikes = 22;
    for (let i = 0; i < spikes * 2; i++) {
      const a = (Math.PI * i) / spikes - Math.PI / 2;
      const rad = i % 2 === 0 ? 30 : 27;
      out.push(`${(32 + rad * Math.cos(a)).toFixed(2)},${(32 + rad * Math.sin(a)).toFixed(2)}`);
    }
    return out.join(' ');
  }, []);
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points={points} fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="white" strokeWidth="1" strokeDasharray="1.5 2" opacity="0.8" />
      <text x="32" y="36.5" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="'Bricolage Grotesque Variable', sans-serif" letterSpacing="0.5">
        {initials}
      </text>
    </svg>
  );
};
