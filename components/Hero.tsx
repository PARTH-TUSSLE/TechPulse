import Reveal from "@/components/Reveal";
import { club } from "@/lib/club";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-36 pb-12 sm:pb-24 min-h-[85vh] flex flex-col justify-center w-full max-w-full overflow-x-clip"
    >
      {/* Top Meta Line */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f2228] pb-4 text-[11px] font-mono tracking-widest text-[#8e95a2] uppercase max-w-full">
          <div className="inline-flex items-center gap-2 bg-[#111317] px-3 py-1.5 border border-[#1f2228] max-w-full overflow-hidden self-start sm:self-auto">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#b497cf] animate-pulse" />
            <span className="text-[#f4f5f7] font-semibold truncate">{club.school}</span>
            <span className="text-[#8e95a2] shrink-0">&middot; {club.college}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8e95a2] shrink-0">
            <span>EST. {club.est}</span>
            <span>&middot;</span>
            <span>{club.location}</span>
          </div>
        </div>
      </Reveal>

      {/* Main Grid Hero Layout */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column - Headline & Copy */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={80}>
            <div>
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-[#b497cf] mb-2 font-semibold">
                Student Activity Community & Activity Hub
              </span>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f4f5f7] leading-[1.1]">
                Tech<span className="text-[#b497cf] drop-shadow-[0_0_25px_rgba(180,151,207,0.3)]">Pulse</span>
              </h1>
              <p className="mt-2 font-serif text-xl sm:text-2xl text-[#8e95a2] italic font-normal">
                Department of Computer Science & Engineering
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-sm sm:text-base leading-relaxed text-[#8e95a2] max-w-xl">
              The flagship student activity club of Block 3 — hands-on engineering workshops, expert talks, and project teams built for betterment, industry exposure, and career guidance.
            </p>
          </Reveal>

          {/* Action Buttons & Quick Badges */}
          <Reveal delay={240}>
            <div className="pt-2 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#events"
                  className="inline-flex items-center justify-center gap-2 bg-[#f4f5f7] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#090a0c] transition-all hover:bg-[#ffffff] shadow-lg shadow-white/5 active:scale-[0.98]"
                >
                  <span>Schedule & Events</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#team"
                  className="inline-flex items-center justify-center gap-2 border border-[#2b2f38] bg-[#111317] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#f4f5f7] transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
                >
                  <span>Team Roster</span>
                  <ChevronDownIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Quick Metrics Line */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] font-mono text-[#8e95a2] uppercase pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#b497cf]" /> 3 Core Pillars
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#b497cf]" /> 9 Departmental Teams
                </span>
                <span className="hidden sm:inline">&middot;</span>
                <span className="hidden sm:inline">CSE Block 3</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column - Premium Highlights Panel */}
        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="border border-[#1f2228] bg-[#111317]/95 p-5 sm:p-7 shadow-2xl shadow-black/60 transition-all hover:border-[#2b2f38]">
              <div className="flex items-center justify-between border-b border-[#1f2228] pb-4">
                <span className="text-[11px] font-mono tracking-widest text-[#8e95a2] uppercase font-semibold">
                  Pillars & Scope
                </span>
                <span className="text-[10px] font-mono text-[#b497cf] uppercase bg-[#090a0c] px-2.5 py-1 border border-[#1f2228]">
                  CSE Block 3
                </span>
              </div>

              <div className="mt-5 space-y-5 text-xs">
                <div className="border-b border-[#16181d] pb-4 space-y-1">
                  <div className="flex items-center justify-between font-mono text-[#b497cf] uppercase text-[10px]">
                    <span className="font-bold">01 / Skill Elevation</span>
                    <span className="text-[#8e95a2]">Betterment</span>
                  </div>
                  <p className="text-[#8e95a2] leading-relaxed text-xs">
                    Hands-on workshops, engineering bootcamps, and interactive labs raising student technical baselines.
                  </p>
                </div>

                <div className="border-b border-[#16181d] pb-4 space-y-1">
                  <div className="flex items-center justify-between font-mono text-[#b497cf] uppercase text-[10px]">
                    <span className="font-bold">02 / Industry & Academia</span>
                    <span className="text-[#8e95a2]">Exposure</span>
                  </div>
                  <p className="text-[#8e95a2] leading-relaxed text-xs">
                    Expert guest speakers, real-world case studies, and cross-department technical sessions.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[#b497cf] uppercase text-[10px]">
                    <span className="font-bold">03 / Student Governance</span>
                    <span className="text-[#8e95a2]">Guidance</span>
                  </div>
                  <p className="text-[#8e95a2] leading-relaxed text-xs">
                    Structured student leadership teams alongside dedicated faculty mentorship and career support.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}