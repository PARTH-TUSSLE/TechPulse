"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SVG_URL = "/logo/logo%20main-final.svg";

export default function PulseWatermark() {
  const ref = useRef<HTMLDivElement>(null);

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

        const svgEl = el.querySelector("svg");
        if (!svgEl) return;
        svgEl.setAttribute("width", "100%");
        svgEl.setAttribute("height", "100%");
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");

        const pulse = svgEl.querySelector('[class*="f98ef9c6"]');
        const imgGroup = svgEl.querySelector('[class*="dc6af368"]');
        const polyL = svgEl.querySelector('[class*="6e5a3de3"]');
        const polyR = svgEl.querySelector('[class*="4aa3e4e3"]');

        if (imgGroup) gsap.set(imgGroup, { opacity: 0.35 });
        if (polyL) gsap.set(polyL, { opacity: 0.4 });
        if (polyR) gsap.set(polyR, { opacity: 0.4 });

        if (reduce) return;

        if (pulse instanceof SVGPathElement) {
          const len = pulse.getTotalLength();
          const bright = len * 0.32;
          gsap.set(pulse, {
            fillOpacity: 0.16,
            stroke: "#d9ffbe",
            strokeWidth: 2.4,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeDasharray: `${bright} ${len - bright}`,
            strokeDashoffset: 0,
            filter: "drop-shadow(0 0 6px rgba(168,224,143,0.9))",
          });
          gsap.to(pulse, {
            strokeDashoffset: -len,
            duration: 3.2,
            ease: "none",
            repeat: -1,
          });
        }
      })
      .catch(() => {
        if (cancelled || !el) return;
      });

    return () => {
      cancelled = true;
      if (el) el.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none aspect-square w-[min(92vw,30rem)] max-h-[85vh] lg:w-[min(70vw,40rem)] m-auto overflow-hidden translate-y-[4vh]"
      aria-hidden="true"
    />
  );
}