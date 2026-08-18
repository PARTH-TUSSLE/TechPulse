"use client";

import { useSyncExternalStore } from "react";
import PixelBlast from "./PixelBlast";
import LightPillar from "./LightPillar";
import PulseWatermark from "./PulseWatermark";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Backdrop() {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#120d1c]" aria-hidden="true">
      {/* Volumetric light pillar rising behind the hero */}
      <div className="absolute inset-0 opacity-70">
        <LightPillar
          topColor="#a8e08f"
          bottomColor="#120d1c"
          intensity={1}
          glowAmount={0.0024}
          pillarWidth={2.2}
          pillarHeight={0.5}
          noiseIntensity={0.4}
          mixBlendMode="screen"
          quality="medium"
        />
      </div>

      {/* Light green under-glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 35% at 50% 0%, rgba(168,224,143,0.14), transparent 70%)",
        }}
      />

      {/* Pixel dust field */}
      {reduceMotion ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(80% 50% at 50% 0%, rgba(180, 151, 207, 0.18), transparent 70%)",
          }}
        />
      ) : (
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <PixelBlast
            variant="square"
            pixelSize={3}
            color="#c9b0e3"
            patternScale={2}
            patternDensity={2.2}
            pixelSizeJitter={0.2}
            rippleSpeed={0.5}
            rippleThickness={0.14}
            rippleIntensityScale={1.4}
            speed={0.45}
            edgeFade={0.2}
            transparent
          />
        </div>
      )}

      {/* Slow scan band */}
      {!reduceMotion && (
        <div className="tp-scanband absolute left-0 right-0 h-24 opacity-[0.05] bg-gradient-to-b from-transparent via-[#f4f5f7] to-transparent" />
      )}

      {/* Subtle overlay scrim for text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#120d1c]/40 via-[#120d1c]/70 to-[#120d1c]" />

      {/* Giant brand watermark — floating pulse line, behind content */}
      <PulseWatermark />
    </div>
  );
}