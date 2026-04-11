// Reduced-motion detection
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

// Shared transition defaults
export const transition = {
  duration: prefersReducedMotion() ? 0.01 : 0.3,
  ease: [0.4, 0, 0.2, 1],
  type: 'tween',
};

const dur = (d) => (prefersReducedMotion() ? 0.01 : d);
const val = (v) => (prefersReducedMotion() ? 0 : v);

// fadeIn — opacity only
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: dur(0.3), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    transition: { duration: dur(0.2), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};

// fadeInUp — fades in while moving up
export const fadeInUp = {
  hidden: { opacity: 0, y: val(12) },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur(0.3), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    y: val(-8),
    transition: { duration: dur(0.2), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};

// fadeInDown — fades in while moving down
export const fadeInDown = {
  hidden: { opacity: 0, y: val(-12) },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur(0.25), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    y: val(8),
    transition: { duration: dur(0.2), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};

// scaleIn — scales up from slightly smaller
export const scaleIn = {
  hidden: { opacity: 0, scale: val(0.95) === 0 ? 1 : 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: dur(0.18), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    scale: val(0.95) === 0 ? 1 : 0.95,
    transition: { duration: dur(0.15), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};

// slideInLeft — slides in from the left
export const slideInLeft = {
  hidden: { opacity: 0, x: val(-24) },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: dur(0.28), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    x: val(-24),
    transition: { duration: dur(0.22), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};

// slideInRight — slides in from the right
export const slideInRight = {
  hidden: { opacity: 0, x: val(24) },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: dur(0.25), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    x: val(24),
    transition: { duration: dur(0.2), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};

// staggerContainer — parent that staggers its children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
  exit: { opacity: 0 },
};

// staggerItem — child used inside staggerContainer
export const staggerItem = {
  hidden: { opacity: 0, y: val(12) },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur(0.3), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
  exit: {
    opacity: 0,
    y: val(-8),
    transition: { duration: dur(0.2), ease: [0.4, 0, 0.2, 1], type: 'tween' },
  },
};
