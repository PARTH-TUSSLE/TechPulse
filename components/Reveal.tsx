"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  variant?: "fade" | "rise" | "slide-left" | "slide-right" | "scale";
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { opacity: 1, transform: "none" });
      return;
    }

    const from: gsap.TweenVars = { opacity: 0, ease: "power3.out", duration: 0.8 };
    switch (variant) {
      case "rise":
        from.y = 28;
        break;
      case "fade":
        break;
      case "slide-left":
        from.x = 40;
        break;
      case "slide-right":
        from.x = -40;
        break;
      case "scale":
        from.scale = 0.96;
        break;
    }

    const tween = gsap.fromTo(
      el,
      from,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        delay: delay / 1000,
        ease: "power3.out",
        duration: 0.8,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, variant]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
