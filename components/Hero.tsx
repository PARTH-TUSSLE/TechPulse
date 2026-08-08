import Reveal from "@/components/Reveal";

function Beam() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-5 hidden w-px bg-gradient-to-b from-transparent via-line to-transparent md:block">
      <span
        className="absolute left-1/2 h-16 w-[3px] -translate-x-1/2 rounded-full bg-signal shadow-[0_0_18px_4px_rgba(39,255,158,0.55)]"
        style={{ animation: "beamPulse 4.5s cubic-bezier(0.4,0,0.2,1) infinite" }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      <Beam />

      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted sm:text-xs">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            <span>
              CCE (CSE&nbsp;Block&nbsp;3) — Student&nbsp;Tech&nbsp;Club
            </span>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,13vw,7rem)] leading-[0.95] tracking-tight text-mist sm:text-7xl md:text-8xl lg:text-[7rem]">
            Tech
            <span className="text-pulse-gradient">Pulse</span>
            <span
              className="ml-2 inline-block text-signal"
              style={{ animation: "blink 1.2s step-end infinite" }}
              aria-hidden
            >
              _
            </span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            The student tech club of the CSE department — workshops, expert talks and a crew
            that helps you build beyond the syllabus. Betterment, exposure and guidance,
            engineered for your career.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#events"
              className="group inline-flex items-center gap-2 rounded-md bg-signal px-7 py-3.5 font-mono text-sm font-medium tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(39,255,158,0.45)]"
            >
              SEE EVENTS
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#team"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-panel/40 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-mist transition-colors hover:border-signal/50 hover:text-signal"
            >
              THE TEAM
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={520} className="mx-auto mt-20 w-full max-w-4xl sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:text-[0.7rem]">
          <span>Est. 2026</span>
          <span>CGC University · Mohali</span>
          <span>
            Dept. of CSE · CCE · Block 3
          </span>
        </div>
      </Reveal>

      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-8"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <span
              className="absolute left-0 top-0 h-3 w-full bg-signal"
              style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}