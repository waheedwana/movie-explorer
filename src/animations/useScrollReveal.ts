import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { REVEAL, prefersReducedMotion } from "./config";

export interface ScrollRevealOptions {
  delay?: number;
  stagger?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
}

const REVEAL_CLASS = "reveal";
const VISIBLE_CLASS = "is-visible";

function supportsObserver(): boolean {
  return typeof IntersectionObserver !== "undefined";
}

function getColumnIndex(node: HTMLElement): number {
  const parent = node.parentElement;

  if (!parent) {
    return 0;
  }

  const rowTop = node.offsetTop;
  let column = 0;

  for (const sibling of Array.from(parent.children)) {
    if (sibling === node) {
      break;
    }
    if (sibling instanceof HTMLElement && sibling.offsetTop === rowTop) {
      column += 1;
    }
  }

  return column;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {},
): RefObject<T | null> {
  const {
    delay = 0,
    stagger = 0,
    threshold = REVEAL.threshold,
    rootMargin = REVEAL.rootMargin,
    once = true,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const node = ref.current;

    if (!node || disabled || prefersReducedMotion() || !supportsObserver()) {
      return;
    }

    node.classList.add(REVEAL_CLASS);

    let settleTimer = 0;
    let settled = false;

    const settle = () => {
      if (settled) {
        return;
      }
      settled = true;
      node.classList.remove(REVEAL_CLASS, VISIBLE_CLASS);
      node.style.removeProperty("--reveal-delay");
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === node && event.propertyName === "opacity") {
        settle();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const column = stagger > 0 ? getColumnIndex(node) : 0;
            const itemDelay = delay + column * stagger;
            node.style.setProperty("--reveal-delay", `${itemDelay}ms`);
            node.classList.add(VISIBLE_CLASS);
            if (once) {
              node.addEventListener("transitionend", handleTransitionEnd);
              settleTimer = window.setTimeout(
                settle,
                REVEAL.duration + itemDelay + 200,
              );
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            node.classList.remove(VISIBLE_CLASS);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      node.removeEventListener("transitionend", handleTransitionEnd);
      window.clearTimeout(settleTimer);
    };
  }, [delay, stagger, disabled, once, threshold, rootMargin]);

  return ref;
}
