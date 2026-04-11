import { useState, useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/motion';

/**
 * Animates a number from 0 to `target` over `duration` ms using requestAnimationFrame.
 * Returns the current animated value.
 *
 * @param {number} target   - The final value to count up to
 * @param {number} duration - Animation duration in milliseconds (default: 1000)
 * @returns {number} Current animated value
 */
function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Respect reduced-motion preference — return target immediately
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    // Reset to 0 when target changes
    setValue(0);

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: t => 1 - (1-t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  return value;
}

export default useCountUp;
