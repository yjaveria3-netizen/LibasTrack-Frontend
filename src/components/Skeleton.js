import React from 'react';

/**
 * Skeleton loading placeholder.
 * Uses the `.skeleton` CSS class which applies a shimmer animation via ::after pseudo-element.
 *
 * @param {string|number} [width]        - CSS width (e.g. '100%', 200). Defaults to '100%'.
 * @param {string|number} [height]       - CSS height (e.g. '20px', 48). Required for block use.
 * @param {string|number} [borderRadius] - CSS border-radius. Defaults to 8px (from CSS).
 * @param {string}        [className]    - Additional CSS class names.
 * @param {React.CSSProperties} [style]  - Additional inline styles.
 */
export default function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  style = {},
}) {
  const computedStyle = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    borderRadius: borderRadius !== undefined
      ? (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius)
      : undefined,
    ...style,
  };

  return (
    <div
      className={`skeleton${className ? ` ${className}` : ''}`}
      style={computedStyle}
      aria-hidden="true"
      role="presentation"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Convenience composite skeletons for common page patterns
   ───────────────────────────────────────────────────────────── */

/** A single line of skeleton text */
export function SkeletonText({ width = '100%', lines = 1, gap = 8, className }) {
  if (lines === 1) {
    return <Skeleton width={width} height={14} borderRadius={4} className={className} />;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '65%' : '100%'}
          height={14}
          borderRadius={4}
        />
      ))}
    </div>
  );
}

/** Skeleton for a stat card */
export function SkeletonStatCard() {
  return (
    <div
      className="card glass"
      style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}
      aria-hidden="true"
    >
      <Skeleton width="55%" height={11} borderRadius={4} />
      <Skeleton width="70%" height={36} borderRadius={8} />
      <Skeleton width="100%" height={3} borderRadius={99} />
    </div>
  );
}

/** Skeleton for a table row */
export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr aria-hidden="true">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: '16px 20px' }}>
          <Skeleton height={13} borderRadius={4} width={i === 0 ? '70%' : '55%'} />
        </td>
      ))}
    </tr>
  );
}