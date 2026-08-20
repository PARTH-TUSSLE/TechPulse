import HeroEntrance from "@/components/HeroEntrance";
import { joinUrl } from "@/lib/club";
import { ArrowRightIcon } from "@/components/Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28 pb-6 sm:pb-8 overflow-x-clip"
    >
      <HeroEntrance>
        <div>
          <div data-hero-headline>
            <div className="relative">
              <span aria-hidden className="tp-sheen absolute inset-0" />
              <h1 className="relative z-10 font-sans text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[#f4f5f7] leading-[0.9]">
                Tech
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="tp-pulse-glow absolute -inset-x-3 -inset-y-1 rounded-full bg-[#b497cf]/50 blur-2xl"
                  />
                  <span className="relative text-[#b497cf] drop-shadow-[0_0_45px_rgba(180,151,207,0.5)]">
                    Pulse
                  </span>
                </span>
              </h1>
              <p data-hero-tagline className="relative z-10 mt-3 font-serif text-lg sm:text-xl text-[#f4f5f7] italic font-normal tracking-tight">
                Curiosity &rarr; Engineering Excellence
              </p>
            </div>
          </div>

          <div data-hero-copy>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a79fbd]">
              The student activity club of the CSE Department at CCE, CGC University, Mohali. Hands-on workshops,
              industry mentorship, and project teams.
            </p>
          </div>

          <div data-hero-ctas>
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-pulse-edge group inline-flex items-center justify-center gap-2.5 bg-[#a8e08f] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#120d1c] transition-all hover:bg-[#b9ea9f] shadow-xl shadow-[#a8e08f]/20 active:scale-[0.98]"
              >
                <span>Apply for Slot</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#events"
                className="tp-pulse-edge tp-pulse-edge-slow inline-flex items-center justify-center gap-2.5 border border-[#3a3155] bg-[#1b1531] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#f4f5f7] transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
              >
                <span>Upcoming Workshops</span>
              </a>
            </div>
          </div>
        </div>
      </HeroEntrance>
    </section>
  );
}