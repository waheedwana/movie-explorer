import { useCallback, useEffect, useRef } from "react";
import { SCROLL, easeInOutCubic, prefersReducedMotion } from "./config";

export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  onComplete?: () => void;
}

function resolveDuration(distance: number, duration?: number): number {
  if (typeof duration === "number") {
    return duration;
  }
  return Math.min(
    SCROLL.maxDuration,
    Math.max(SCROLL.minDuration, Math.abs(distance) * SCROLL.durationPerPixel),
  );
}

export function smoothScrollToY(
  targetY: number,
  options: SmoothScrollOptions = {},
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  let restored = false;
  const restoreBehavior = () => {
    if (!restored) {
      restored = true;
      root.style.scrollBehavior = previousBehavior;
    }
  };

  const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
  const destination = Math.max(0, Math.min(targetY, maxScroll));
  const startY = window.scrollY;
  const distance = destination - startY;

  root.style.scrollBehavior = "auto";

  if (prefersReducedMotion() || distance === 0) {
    window.scrollTo(0, destination);
    restoreBehavior();
    options.onComplete?.();
    return () => {};
  }

  const duration = resolveDuration(distance, options.duration);
  const startTime = performance.now();
  let frameId = 0;
  let cancelled = false;

  const step = (now: number) => {
    if (cancelled) {
      return;
    }
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      frameId = window.requestAnimationFrame(step);
    } else {
      restoreBehavior();
      options.onComplete?.();
    }
  };

  frameId = window.requestAnimationFrame(step);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
    restoreBehavior();
  };
}

export function smoothScrollToElement(
  target: Element | string,
  options: SmoothScrollOptions = {},
): () => void {
  const element =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!element) {
    return () => {};
  }

  const offset = options.offset ?? 0;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  return smoothScrollToY(top, options);
}

export function useSmoothScroll() {
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      cancelRef.current?.();
      cancelRef.current = null;
    };
  }, []);

  const scrollToTop = useCallback((options: SmoothScrollOptions = {}) => {
    cancelRef.current?.();
    cancelRef.current = smoothScrollToY(0, options);
  }, []);

  const scrollToElement = useCallback(
    (target: Element | string, options: SmoothScrollOptions = {}) => {
      cancelRef.current?.();
      cancelRef.current = smoothScrollToElement(target, options);
    },
    [],
  );

  return { scrollToTop, scrollToElement };
}

export function useScrollToTopOnChange(key: unknown): void {
  const previousKey = useRef(key);

  useEffect(() => {
    if (previousKey.current === key) {
      return;
    }
    previousKey.current = key;
    return smoothScrollToY(0, { duration: SCROLL.routeDuration });
  }, [key]);
}
