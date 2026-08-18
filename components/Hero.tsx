import Reveal from "@/components/Reveal";
import { joinUrl } from "@/lib/club";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/Icons";

const pillars = [
  {
    no: "01",
    name: "Betterment",
    sub: "Skills & Labs",
    body: "Hands-on engineering bootcamps and practical lab sessions.",
  },
  {
    no: "02",
    name: "Exposure",
    sub: "Industry",
    body: "Expert guest talks, real case studies, and campus tech sessions.",
  },
  {
    no: "03",
    name: "Guidance",
    sub: "Mentorship",
    body: "Student leadership backed by faculty mentorship and career advice.",
  },
];

const stats = [
  { value: "03", label: "Core Pillars" },
  { value: "09", label: "Teams" },
  { value: "100%", label: "Student-Led" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 sm:pt-36 pb-12 sm:pb-20 min-h-screen flex flex-col justify-center overflow-x-clip"
    >
      {/* Main Grid */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left - Editorial Display */}
        <div className="lg:col-span-7 space-y-8">
          <Reveal delay={80}>
            <h1 className="font-sans text-6xl sm:text-8xl lg:text-[6.5rem] font-black tracking-[-0.04em] text-[#f4f5f7] leading-[0.85]">
              Tech<span className="text-[#b497cf] drop-shadow-[0_0_45px_rgba(180,151,207,0.5)]">Pulse</span>
            </h1>
            <p className="mt-5 font-serif text-2xl sm:text-3xl text-[#f4f5f7] italic font-normal tracking-tight">
              Curiosity &rarr; Engineering Excellence
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-base sm:text-lg leading-relaxed text-[#a79fbd] max-w-xl">
              The premier student activity community of Computer Science &amp; Engineering — hands-on technical
              workshops, industry mentorship, and high-impact project teams.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#e8a05c] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#120d1c] transition-all hover:bg-[#f0b878] shadow-xl shadow-[#e8a05c]/20 active:scale-[0.98]"
              >
                <span>Apply for Slot</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#events"
                className="inline-flex items-center justify-center gap-2.5 border border-[#3a3155] bg-[#1b1531] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#f4f5f7] transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
              >
                <span>Upcoming Workshops</span>
                <ChevronDownIcon className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right - Core Mandate Panel */}
        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative border border-[#2c2345] bg-[#1b1531]/90 p-7 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#2c2345] pb-5">
                <span className="text-xs font-mono tracking-widest text-[#f4f5f7] uppercase font-bold">
                  Core Mandate
                </span>
                <span className="text-[10px] font-mono text-[#b497cf] font-bold uppercase bg-[#120d1c] px-3 py-1 border border-[#b497cf]/30">
                  CSE Block 3
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {pillars.map((p) => (
                  <div key={p.no}>
                    <div className="flex items-baseline justify-between font-mono uppercase text-xs mb-1.5">
                      <span className="font-extrabold text-[#b497cf]">{p.no} / {p.name}</span>
                      <span className="text-[10px] text-[#a79fbd] font-semibold">{p.sub}</span>
                    </div>
                    <p className="text-[#a79fbd] text-xs leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      {/* Telemetry Strip */}
      <Reveal delay={320}>
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-px bg-[#2c2345] border border-[#2c2345]">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#120d1c] px-4 sm:px-6 py-4 sm:py-5">
              <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-[#b497cf]">{s.value}</span>
              <span className="block text-[10px] font-mono uppercase text-[#a79fbd] font-semibold mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}