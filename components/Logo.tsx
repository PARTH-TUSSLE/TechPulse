"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SVG_URL = "/logo/logo%20main-final.svg";

interface LogoProps {
  className?: string;
  animated?: boolean;
}

export default function Logo({ className = "", animated = true }: LogoProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    fetch(SVG_URL)
      .then((r) => r.text())
      .then((svg) => {
        if (cancelled || !el) return;
        el.innerHTML = svg;
        if (!animated || reduce) return;

        const main = el.querySelector('[class*="f98ef9c6"]');
        const polyL = el.querySelector('[class*="6e5a3de3"]');
        const polyR = el.querySelector('[class*="4aa3e4e3"]');
        const imageGroup = el.querySelector('[class*="dc6af368"]');
        const drawTargets = [main, polyL, polyR].filter((n): n is SVGPathElement => Boolean(n));

        drawTargets.forEach((node) => {
          const len = node.getTotalLength?.() ?? 1000;
          gsap.set(node, {
            fillOpacity: 0,
            stroke: "#b497cf",
            strokeWidth: 1.6,
            strokeLinejoin: "round",
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        });
        if (imageGroup) gsap.set(imageGroup, { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
        tl.to(drawTargets, {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.inOut",
        })
          .to(drawTargets, { fillOpacity: 1, duration: 0.5 }, "-=0.4")
          .to(imageGroup, { opacity: 1, duration: 0.4 }, "<");
      })
      .catch(() => {
        if (cancelled || !el) return;
      });

    return () => {
      cancelled = true;
      if (el) el.innerHTML = "";
    };
  }, [animated]);

  return (
    <span
      ref={ref}
      className={`inline-flex items-center justify-center ${className}`}
      aria-label="TechPulse logo"
      role="img"
    />
  );
}
