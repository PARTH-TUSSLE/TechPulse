import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { mission } from "@/lib/data";

export default function Purpose() {
  return (
    <section
      id="purpose"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 sm:px-6 overflow-x-clip"
      aria-labelledby="purpose-title"
    >
      <SectionHeader
        index="01"
        category="Our Philosophy"
        title="Capability Over Vanity"
        lede="Designed for CSE students — real engineering capability, real guidance, zero noise."
      />

      {/* Manifesto Index Rows */}
      <div className="mt-8 sm:mt-12">
        {mission.map((item, index) => (
          <Reveal key={item.title} delay={index * 80} variant="slide-left">
            <div className="group grid grid-cols-12 gap-4 items-start py-7 sm:py-8 border-b border-[#2c2345] transition-colors duration-300 last:border-b-0 hover:bg-[#1b1531]/40">
              <div className="col-span-12 sm:col-span-2 flex sm:block items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-4xl font-black text-[#b497cf] tracking-tight">
                  0{index + 1}
                </span>
                <span className="sm:hidden text-[10px] font-mono uppercase tracking-widest text-[#7c7192]">
                  Pillar
                </span>
              </div>
              <div className="col-span-12 sm:col-span-7">
                <h3 className="text-xl sm:text-3xl font-black tracking-[-0.02em] text-[#f4f5f7] leading-tight transition-colors group-hover:text-[#b497cf]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#a79fbd] max-w-xl">
                  {item.body}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-3 hidden sm:flex justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c7192] self-center transition-colors group-hover:text-[#a79fbd]">
                  Pillar &mdash; {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Editorial Quote Banner */}
      <Reveal delay={240} variant="scale" className="mt-10 sm:mt-14">
        <div className="relative border border-[#2c2345] bg-[#1b1531]/60 p-7 sm:p-10 overflow-hidden">
          <blockquote className="font-serif text-2xl sm:text-4xl text-[#f4f5f7] italic leading-snug max-w-3xl tracking-tight">
            &ldquo;Engineering education reaches its full potential when students are given the freedom, structure, and
            guidance to build real things together.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#b497cf]" aria-hidden />
            <p className="text-xs font-mono tracking-wider text-[#b497cf] uppercase font-bold">
              &mdash; TechPulse Leadership
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}