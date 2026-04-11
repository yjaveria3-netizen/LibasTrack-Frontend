import React from 'react';

export default function Skeleton({ width, height, borderRadius, className = '' }) {
  const style = {};
  if (width !== undefined) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height;
  if (borderRadius !== undefined) style.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return <div className={`skeleton ${className}`.trim()} style={style} />;
}
