"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const hudOuterRef = useRef<SVGCircleElement>(null);
  const hudMiddleRef = useRef<SVGCircleElement>(null);

  const sparkGreenRef = useRef<SVGCircleElement>(null);
  const sparkPurpleRef = useRef<SVGCircleElement>(null);

  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // Fetch official SVG logo
    fetch("/logo/logo%20main-final.svg")
      .then((res) => res.text())
      .then((data) => setSvgContent(data))
      .catch(() => {});

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Animate once SVG content is mounted
  useEffect(() => {
    if (!isVisible || !svgContent || !logoWrapperRef.current) return;

    const wrapper = logoWrapperRef.current;
    const svgEl = wrapper.querySelector("svg");
    if (!svgEl) return;

    // Standardize SVG properties
    svgEl.setAttribute("width", "100%");
    svgEl.setAttribute("height", "100%");
    svgEl.setAttribute("viewBox", "0 0 1000 1000");

    const mainPath = svgEl.querySelector('[class*="f98ef9c6"]');
    const polyL = svgEl.querySelector('[class*="6e5a3de3"]');
    const polyR = svgEl.querySelector('[class*="4aa3e4e3"]');
    const imageGroup = svgEl.querySelector('[class*="dc6af368"]');

    const drawTargets = [mainPath, polyL, polyR].filter(
      (n): n is SVGElement => Boolean(n)
    );

    // Initial setup
    drawTargets.forEach((node) => {
      if (node instanceof SVGPathElement || node instanceof SVGPolygonElement) {
        const len = (node as any).getTotalLength?.() ?? 1200;
        gsap.set(node, {
          fillOpacity: 0,
          stroke: "#a8e08f",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: len,
          strokeDashoffset: len,
          filter: "drop-shadow(0 0 8px rgba(168, 224, 143, 0.6))",
        });
      }
    });

    if (imageGroup) {
      gsap.set(imageGroup, { opacity: 0 });
    }

    // HUD Rotation Tweens
    if (hudOuterRef.current) {
      gsap.to(hudOuterRef.current, {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    }

    if (hudMiddleRef.current) {
      gsap.to(hudMiddleRef.current, {
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }

    // Primary Entrance Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Hold briefly at peak beauty then exit
        gsap.delayedCall(1.4, handleExit);
      },
    });

    // 1. Reveal HUD & Logo outline
    tl.fromTo(
      logoWrapperRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" }
    )
      .to(
        drawTargets,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=0.6"
      )
      .to(
        drawTargets,
        {
          fillOpacity: 0.85,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    if (imageGroup) {
      tl.to(imageGroup, { opacity: 1, duration: 0.6 }, "<");
    }

    // 2. Text Reveal
    tl.fromTo(
      textRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    ).fromTo(
      subtitleRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // 3. Electric Traveling Pulse Sparks
    if (sparkGreenRef.current) {
      gsap.to(sparkGreenRef.current, {
        cx: 870,
        cy: 337,
        duration: 2.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (sparkPurpleRef.current) {
      gsap.to(sparkPurpleRef.current, {
        cx: 500,
        cy: 780,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      tl.kill();
      if (hudOuterRef.current) gsap.killTweensOf(hudOuterRef.current);
      if (hudMiddleRef.current) gsap.killTweensOf(hudMiddleRef.current);
      if (sparkGreenRef.current) gsap.killTweensOf(sparkGreenRef.current);
      if (sparkPurpleRef.current) gsap.killTweensOf(sparkPurpleRef.current);
    };
  }, [isVisible, svgContent]);

  const handleExit = () => {
    if (isExiting) return;
    setIsExiting(true);

    setTimeout(() => {
      if (hudOuterRef.current) gsap.killTweensOf(hudOuterRef.current);
      if (hudMiddleRef.current) gsap.killTweensOf(hudMiddleRef.current);
      if (sparkGreenRef.current) gsap.killTweensOf(sparkGreenRef.current);
      if (sparkPurpleRef.current) gsap.killTweensOf(sparkPurpleRef.current);
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 700);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExiting]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#05030a] text-[#f4f5f7] p-6 sm:p-10 select-none overflow-hidden transition-all duration-700 ease-in-out ${
        isExiting ? "opacity-0 scale-[1.04] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Radial Spotlight Ambient Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,151,207,0.12)_0%,rgba(5,3,10,0.95)_70%)] pointer-events-none z-0" />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#a79fbd]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8e08f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a8e08f]"></span>
          </span>
          <span className="text-[#f4f5f7] font-bold">TECHPULSE</span>
        </div>

        {/* Skip Action */}
        <button
          onClick={handleExit}
          type="button"
          className="tp-pulse-edge inline-flex items-center gap-2 border border-[#3a3155] bg-[#1b1531]/80 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#f4f5f7] transition-all hover:bg-[#241c40] hover:text-[#b497cf] active:scale-95 shadow-lg shadow-black/50"
        >
          <span>Skip</span>
          <span className="hidden sm:inline text-[9px] text-[#a79fbd]">[ESC]</span>
        </button>
      </div>

      {/* Main Authentic TechPulse Logo Animation Area */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Futuristic Circular HUD & Tech Tick Rings with Exactly 6 Pulsing Nodes (3 Green, 3 Purple) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 1000"
          >
            {/* Outer Segmented HUD Ring */}
            <circle
              ref={hudOuterRef}
              cx="500"
              cy="500"
              r="440"
              fill="none"
              stroke="rgba(180, 151, 207, 0.18)"
              strokeWidth="2"
              strokeDasharray="6 14 2 14"
            />

            {/* Middle Fine-Tick Radar Ring */}
            <circle
              ref={hudMiddleRef}
              cx="500"
              cy="500"
              r="370"
              fill="none"
              stroke="rgba(168, 224, 143, 0.22)"
              strokeWidth="1.5"
              strokeDasharray="2 6"
            />

            {/* Inner Concentric Aura Ring */}
            <circle
              cx="500"
              cy="500"
              r="290"
              fill="none"
              stroke="rgba(180, 151, 207, 0.08)"
              strokeWidth="1"
            />

            {/* EXACTLY 3 GREEN DOTS */}
            {/* Green Dot 1: Left ECG Vertex */}
            <circle
              cx="100"
              cy="337"
              r="10"
              fill="#a8e08f"
              className="drop-shadow-[0_0_14px_rgba(168,224,143,0.95)] animate-pulse"
            />
            {/* Green Dot 2: Center ECG Peak Traveling Pulse */}
            <circle
              ref={sparkGreenRef}
              cx="130"
              cy="337"
              r="13"
              fill="#a8e08f"
              className="drop-shadow-[0_0_20px_rgba(168,224,143,1)]"
            />
            {/* Green Dot 3: Right ECG Vertex */}
            <circle
              cx="900"
              cy="337"
              r="10"
              fill="#a8e08f"
              className="drop-shadow-[0_0_14px_rgba(168,224,143,0.95)] animate-pulse"
            />

            {/* EXACTLY 3 PURPLE DOTS */}
            {/* Purple Dot 1: Left V Constellation Node */}
            <circle
              cx="380"
              cy="520"
              r="10"
              fill="#b497cf"
              className="drop-shadow-[0_0_14px_rgba(180,151,207,0.95)] animate-pulse"
            />
            {/* Purple Dot 2: Bottom V Tip Traveling Pulse */}
            <circle
              ref={sparkPurpleRef}
              cx="260"
              cy="470"
              r="12"
              fill="#b497cf"
              className="drop-shadow-[0_0_20px_rgba(180,151,207,1)]"
            />
            {/* Purple Dot 3: Right V Constellation Node */}
            <circle
              cx="620"
              cy="520"
              r="10"
              fill="#b497cf"
              className="drop-shadow-[0_0_14px_rgba(180,151,207,0.95)] animate-pulse"
            />
          </svg>

          {/* Official TechPulse SVG Logo Container */}
          <div
            ref={logoWrapperRef}
            className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent || "" }}
          />
        </div>

        {/* Brand Title */}
        <div ref={textRef} className="mt-4 relative">
          <span aria-hidden className="tp-sheen absolute inset-0" />
          <h1 className="relative font-sans text-4xl sm:text-6xl font-black tracking-[-0.03em] text-[#f4f5f7] leading-none">
            Tech<span className="text-[#b497cf] drop-shadow-[0_0_30px_rgba(180,151,207,0.55)]">Pulse</span>
          </h1>
        </div>

        {/* Tagline */}
        <div ref={subtitleRef} className="mt-3">
          <p className="font-serif italic text-base sm:text-lg text-[#a79fbd] tracking-tight">
            Curiosity <span className="text-[#a8e08f] font-sans font-bold">→</span> Engineering Excellence
          </p>
        </div>
      </div>

      {/* Bottom Minimal Footer Spec */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#7c7192]">
        <span>EST. 2026 // CSE DEPARTMENT</span>
        <span>CGC UNIVERSITY // CCE</span>
      </div>
    </div>
  );
}
