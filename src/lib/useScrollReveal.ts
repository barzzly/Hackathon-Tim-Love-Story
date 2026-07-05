import { useEffect } from "react";

/**
 * Custom hook to initialize scroll reveal animations using Intersection Observer.
 * It queries all elements with a [data-reveal] attribute and adds the `.reveal-visible`
 * class when they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => {
        try {
          observer.unobserve(el);
        } catch {
          /* ignore */
        }
      });
    };
  }, []);
}
