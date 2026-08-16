import Reveal from "@/components/Reveal";
import { club } from "@/lib/club";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 sm:pt-36 pb-12 sm:pb-24 min-h-[85vh] flex flex-col justify-center overflow-x-clip"
    >
      {/* Top Meta Tag Line */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f2228] pb-4 text-xs font-mono tracking-widest text-[#8e95a2] uppercase max-w-full">
          <div className="inline-flex items-center gap-2.5 bg-[#111317] px-3.5 py-1.5 border border-[#1f2228] max-w-full overflow-hidden self-start sm:self-auto">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#b497cf] animate-pulse" />
            <span className="text-[#f4f5f7] font-bold truncate">{club.school}</span>
            <span className="text-[#8e95a2] shrink-0">&middot; {club.college}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8e95a2] shrink-0">
            <span className="font-semibold text-[#f4f5f7]">EST. {club.est}</span>
            <span>&middot;</span>
            <span>{club.location}</span>
          </div>
        </div>
      </Reveal>

      {/* Main Grid Hero Layout */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Left Column - Big Headline & Concise Copy */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={80}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b497cf]/10 border border-[#b497cf]/30 rounded-full mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b497cf]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#b497cf]">
                  CSE Block 3 Activity Hub
                </span>
              </div>
              <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#f4f5f7] leading-[0.95]">
                Tech<span className="text-[#b497cf] drop-shadow-[0_0_35px_rgba(180,151,207,0.4)]">Pulse</span>
              </h1>
              <p className="mt-3 font-serif text-2xl sm:text-3xl text-[#f4f5f7] italic font-normal tracking-tight">
                Curiosity &rarr; Engineering Excellence
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-base sm:text-lg leading-relaxed text-[#8e95a2] max-w-xl font-normal">
              The premier student activity community of Computer Science & Engineering — hands-on technical workshops, industry mentorship, and high-impact project teams.
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={240}>
            <div className="pt-2 space-y-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#events"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#f4f5f7] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#090a0c] transition-all hover:bg-[#ffffff] shadow-xl shadow-white/10 active:scale-[0.98]"
                >
                  <span>Upcoming Workshops</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                <a
                  href="#team"
                  className="inline-flex items-center justify-center gap-2.5 border border-[#2b2f38] bg-[#111317] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f4f5f7] transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
                >
                  <span>Team Roster</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Bold Stat Counter Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#1f2228]">
                <div className="bg-[#111317] border border-[#1f2228] p-2.5 text-center sm:text-left">
                  <span className="block font-mono text-xl sm:text-2xl font-extrabold text-[#b497cf]">03</span>
                  <span className="block text-[10px] font-mono uppercase text-[#8e95a2] font-semibold mt-0.5">Core Pillars</span>
                </div>
                <div className="bg-[#111317] border border-[#1f2228] p-2.5 text-center sm:text-left">
                  <span className="block font-mono text-xl sm:text-2xl font-extrabold text-[#b497cf]">09</span>
                  <span className="block text-[10px] font-mono uppercase text-[#8e95a2] font-semibold mt-0.5">Teams</span>
                </div>
                <div className="bg-[#111317] border border-[#1f2228] p-2.5 text-center sm:text-left">
                  <span className="block font-mono text-xl sm:text-2xl font-extrabold text-[#b497cf]">100%</span>
                  <span className="block text-[10px] font-mono uppercase text-[#8e95a2] font-semibold mt-0.5">Student-Led</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column - Premium High-Impact Highlights Card */}
        <div className="lg:col-span-5">
          <Reveal delay={200} className="h-full">
            <div className="flex h-full flex-col border border-[#1f2228] bg-[#111317]/95 p-6 sm:p-7 shadow-2xl shadow-black/70 transition-all hover:border-[#b497cf]/50">
              <div className="flex items-center justify-between border-b border-[#1f2228] pb-4">
                <span className="text-xs font-mono tracking-widest text-[#f4f5f7] uppercase font-bold">
                  Core Mandate
                </span>
                <span className="text-[10px] font-mono text-[#b497cf] font-bold uppercase bg-[#090a0c] px-3 py-1 border border-[#b497cf]/30">
                  CSE Block 3
                </span>
              </div>

              <div className="mt-5 flex flex-1 flex-col justify-between space-y-4">
                <div className="border-b border-[#16181d] pb-3.5">
                  <div className="flex items-center justify-between font-mono uppercase text-xs mb-1">
                    <span className="font-extrabold text-[#b497cf]">01 / Betterment</span>
                    <span className="text-[10px] text-[#8e95a2] font-semibold">Skills & Labs</span>
                  </div>
                  <p className="text-[#8e95a2] text-xs leading-snug">
                    Hands-on engineering bootcamps and practical lab sessions.
                  </p>
                </div>

                <div className="border-b border-[#16181d] pb-3.5">
                  <div className="flex items-center justify-between font-mono uppercase text-xs mb-1">
                    <span className="font-extrabold text-[#b497cf]">02 / Exposure</span>
                    <span className="text-[10px] text-[#8e95a2] font-semibold">Industry</span>
                  </div>
                  <p className="text-[#8e95a2] text-xs leading-snug">
                    Expert guest talks, real case studies, and campus tech sessions.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-mono uppercase text-xs mb-1">
                    <span className="font-extrabold text-[#b497cf]">03 / Guidance</span>
                    <span className="text-[10px] text-[#8e95a2] font-semibold">Mentorship</span>
                  </div>
                  <p className="text-[#8e95a2] text-xs leading-snug">
                    Student leadership backed by faculty mentorship and career advice.
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