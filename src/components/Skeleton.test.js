// Feature: ui-redesign-animations
import React from 'react';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import Skeleton from './Skeleton';

// ---------------------------------------------------------------------------
// Property 6: Skeleton accepts and applies arbitrary dimension props
// Feature: ui-redesign-animations, Property 6
// Validates: Requirements 4.5
// ---------------------------------------------------------------------------
describe('Property 6: Skeleton accepts and applies arbitrary dimension props', () => {
  test('numeric width/height/borderRadius are applied as px inline styles', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 2000 }),
        fc.integer({ min: 1, max: 2000 }),
        fc.integer({ min: 0, max: 100 }),
        (width, height, borderRadius) => {
          const { container } = render(
            <Skeleton width={width} height={height} borderRadius={borderRadius} />
          );
          const el = container.firstChild;
          expect(el.style.width).toBe(`${width}px`);
          expect(el.style.height).toBe(`${height}px`);
          expect(el.style.borderRadius).toBe(`${borderRadius}px`);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('string width/height/borderRadius are applied as-is', () => {
    // Use a constrained set of valid CSS string values to avoid empty strings
    const cssValues = fc.oneof(
      fc.integer({ min: 1, max: 500 }).map((n) => `${n}px`),
      fc.integer({ min: 1, max: 100 }).map((n) => `${n}%`),
      fc.integer({ min: 1, max: 50 }).map((n) => `${n}rem`)
    );

    fc.assert(
      fc.property(cssValues, cssValues, cssValues, (width, height, borderRadius) => {
        const { container } = render(
          <Skeleton width={width} height={height} borderRadius={borderRadius} />
        );
        const el = container.firstChild;
        expect(el.style.width).toBe(width);
        expect(el.style.height).toBe(height);
        expect(el.style.borderRadius).toBe(borderRadius);
      }),
      { numRuns: 100 }
    );
  });

  test('skeleton class is always present regardless of props', () => {
    fc.assert(
      fc.property(
        fc.option(fc.integer({ min: 1, max: 500 }), { nil: undefined }),
        fc.option(fc.integer({ min: 1, max: 500 }), { nil: undefined }),
        (width, height) => {
          const { container } = render(<Skeleton width={width} height={height} />);
          const el = container.firstChild;
          expect(el.classList.contains('skeleton')).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('className prop is appended to skeleton class', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-z][a-z0-9-]{0,19}$/),
        (extraClass) => {
          const { container } = render(<Skeleton className={extraClass} />);
          const el = container.firstChild;
          expect(el.classList.contains('skeleton')).toBe(true);
          expect(el.classList.contains(extraClass)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('undefined props do not produce inline styles', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild;
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');
    expect(el.style.borderRadius).toBe('');
  });
});
