"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Fraction of element visible before revealing. */
  threshold?: number;
  /** Reveal only once (default true). */
  once?: boolean;
  /** rootMargin passed to IntersectionObserver. */
  rootMargin?: string;
};

/**
 * Attach to any element to toggle the `.is-visible` class when scrolled into view.
 * Pairs with the `.reveal` utility in globals.css. SSR-safe; respects
 * reduced-motion (elements start visible via CSS when motion is reduced).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
  rootMargin = "0px 0px -10% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, just show it.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return ref;
}
