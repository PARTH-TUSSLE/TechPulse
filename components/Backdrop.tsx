"use client";

import { useSyncExternalStore } from "react";
import PixelBlast from "./PixelBlast";

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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#090a0c]" aria-hidden>
      {reduceMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 50% at 50% 0%, rgba(180, 151, 207, 0.15), transparent 70%)",
          }}
        />
      ) : (
        <div className="absolute inset-0 opacity-80 pointer-events-auto">
          <PixelBlast
            variant="square"
            pixelSize={2}
            color="#ab5ff3"
            patternScale={2}
            patternDensity={2}
            pixelSizeJitter={0}
            // enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.4}
            edgeFade={0.11}
            transparent
          />
        </div>
      )}

      {/* Subtle overlay scrim for text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#090a0c]/40 via-[#090a0c]/70 to-[#090a0c]" />
    </div>
  );
}