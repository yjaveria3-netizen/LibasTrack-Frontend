// Feature: ui-redesign-animations
import * as fc from 'fast-check';

// ---------------------------------------------------------------------------
// Helpers to (re)load motion.js with a mocked matchMedia
// ---------------------------------------------------------------------------

const VARIANT_NAMES = [
  'fadeIn',
  'fadeInUp',
  'fadeInDown',
  'scaleIn',
  'slideInLeft',
  'slideInRight',
  'staggerContainer',
  'staggerItem',
];

// Properties that must NEVER appear in animated values (layout-triggering)
const FORBIDDEN_PROPS = ['width', 'height', 'top', 'left', 'margin'];

// GPU-composited properties that ARE allowed
const ALLOWED_ANIMATED_PROPS = new Set([
  'opacity',
  'x',
  'y',
  'scale',
  'rotate',
  // transition sub-object is fine
  'transition',
]);

function mockMatchMedia(matches) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

function loadMotion() {
  // Clear module cache so the module re-evaluates with the current matchMedia mock
  jest.resetModules();
  return require('./motion');
}

// ---------------------------------------------------------------------------
// Property 1: All required motion variants are exported
// Feature: ui-redesign-animations, Property 1
// Validates: Requirements 1.1
// ---------------------------------------------------------------------------
describe('Property 1: All required motion variants are exported', () => {
  test('every required variant name is exported as a non-null object', () => {
    mockMatchMedia(false);
    const motion = loadMotion();

    fc.assert(
      fc.property(fc.constantFrom(...VARIANT_NAMES), (name) => {
        const variant = motion[name];
        expect(variant).toBeDefined();
        expect(variant).not.toBeNull();
        expect(typeof variant).toBe('object');
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: Reduced-motion collapses all animation durations
// Feature: ui-redesign-animations, Property 2
// Validates: Requirements 1.4, 15.1
// ---------------------------------------------------------------------------
describe('Property 2: Reduced-motion collapses all animation durations', () => {
  test('when prefers-reduced-motion is active, all durations ≤ 0.01 and translate/scale values are 0', () => {
    mockMatchMedia(true);
    const motion = loadMotion();

    fc.assert(
      fc.property(fc.constantFrom(...VARIANT_NAMES), (name) => {
        const variant = motion[name];

        // Check each state (hidden, visible, exit) that exists
        ['hidden', 'visible', 'exit'].forEach((state) => {
          if (!variant[state]) return;
          const s = variant[state];

          // y and x values must be 0
          if ('y' in s) expect(s.y).toBe(0);
          if ('x' in s) expect(s.x).toBe(0);

          // scale values must be 0 or 1 (not a fractional offset like 0.95)
          // When reduced motion is on, scale should not animate away from 1
          if ('scale' in s && s.scale !== 1) {
            expect(s.scale).toBe(0);
          }

          // transition duration must be ≤ 0.01
          if (s.transition && 'duration' in s.transition) {
            expect(s.transition.duration).toBeLessThanOrEqual(0.01);
          }
        });

        // Also check the shared transition export
        expect(motion.transition.duration).toBeLessThanOrEqual(0.01);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: Motion variants use only GPU-composited properties
// Feature: ui-redesign-animations, Property 3
// Validates: Requirements 15.2
// ---------------------------------------------------------------------------
describe('Property 3: Motion variants use only GPU-composited properties', () => {
  test('no variant state contains layout-triggering CSS properties', () => {
    mockMatchMedia(false);
    const motion = loadMotion();

    fc.assert(
      fc.property(fc.constantFrom(...VARIANT_NAMES), (name) => {
        const variant = motion[name];

        ['hidden', 'visible', 'exit'].forEach((state) => {
          if (!variant[state]) return;
          const keys = Object.keys(variant[state]);

          FORBIDDEN_PROPS.forEach((forbidden) => {
            expect(keys).not.toContain(forbidden);
          });
        });
      }),
      { numRuns: 100 }
    );
  });
});
