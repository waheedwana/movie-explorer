export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const REVEAL = {
  duration: 800,
  distance: 30,
  easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  threshold: 0.12,
  rootMargin: "0px",
  stagger: 140,
} as const;

export const SCROLL = {
  minDuration: 350,
  maxDuration: 900,
  durationPerPixel: 0.45,
  routeDuration: 520,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
