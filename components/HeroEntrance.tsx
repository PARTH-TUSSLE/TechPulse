"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function HeroEntrance({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const headline = el.querySelector("[data-hero-headline] h1");
    const tagline = el.querySelector("[data-hero-tagline]");
    const copy = el.querySelector("[data-hero-copy]");
    const ctas = el.querySelector("[data-hero-ctas]");
    const panel = el.querySelector("[data-hero-panel]");
    const stats = el.querySelector("[data-hero-stats]");

    const targets = [headline, tagline, copy, ctas, panel, stats].filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (targets.length === 0) return;

    // Safety net: whatever happens, the hero must never stay hidden.
    const safety = window.setTimeout(() => {
      gsap.set(targets, { opacity: 1, x: 0, y: 0 });
    }, 2500);

    let tl: gsap.core.Timeline | null = null;

    try {
      tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headline, { y: 40, opacity: 0, duration: 0.9 }, 0.05)
        .from(tagline, { y: 24, opacity: 0, duration: 0.7 }, 0.35)
        .from(copy, { y: 24, opacity: 0, duration: 0.7 }, 0.5)
        .from(ctas, { y: 20, opacity: 0, duration: 0.6 }, 0.65)
        .from(panel, { x: 32, opacity: 0, duration: 0.9 }, 0.35)
        .from(stats, { y: 20, opacity: 0, duration: 0.6 }, 0.85);
    } catch {
      gsap.set(targets, { opacity: 1, x: 0, y: 0 });
    }

    return () => {
      window.clearTimeout(safety);
      if (tl) {
        tl.revert();
      } else {
        gsap.set(targets, { opacity: 1, x: 0, y: 0 });
      }
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}