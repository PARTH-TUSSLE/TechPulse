"use client";

import { useSyncExternalStore } from "react";
import LightPillar from "./LightPillar";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fixed, full-viewport visual environment.
 * Renders the signature light pillar on capable devices, and a static
 * equivalent when the user prefers reduced motion.
 */
export default function Backdrop() {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {reduceMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 70% at 50% 30%, rgba(45,255,157,0.16), transparent 60%), radial-gradient(90% 60% at 50% 100%, rgba(165,159,255,0.14), transparent 55%)",
          }}
        />
      ) : (
        <LightPillar
          topColor="#27ff9e"
          bottomColor="#a59fff"
          intensity={1.1}
          rotationSpeed={1.7}
          glowAmount={0.002}
          pillarWidth={4.5}
          pillarHeight={0.5}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="normal"
          quality="high"
        />
      )}

      {/* Readability scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/90" />
      <div className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_0%,transparent_40%,rgba(7,7,12,0.55)_100%)]" />
    </div>
  );
}