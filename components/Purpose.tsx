import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { mission } from "@/lib/data";

export default function Purpose() {
  return (
    <section
      id="purpose"
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 sm:px-6 border-t border-[#1f2228] overflow-x-clip"
      aria-labelledby="purpose-title"
    >
      <SectionHeader
        category="Our Philosophy"
        title="Capability Over Vanity"
        lede="Designed for CSE students — real engineering capability, real guidance, zero noise."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        {mission.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <div className="border border-[#1f2228] bg-[#111317] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:border-[#b497cf]/50 hover:shadow-xl hover:shadow-[#b497cf]/5 group">
              <div>
                <div className="flex items-center justify-between border-b border-[#1f2228] pb-3 mb-4">
                  <span className="font-mono text-xl font-black text-[#b497cf]">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a2] font-semibold bg-[#090a0c] px-2.5 py-1 border border-[#1f2228]">
                    Pillar
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-[#f4f5f7] group-hover:text-[#b497cf] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#8e95a2]">
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Editorial Quote Banner */}
      <Reveal delay={240} className="mt-8">
        <div className="border-l-4 border-[#b497cf] bg-[#111317]/60 p-5 sm:p-6 border-y border-r border-[#1f2228]">
          <blockquote className="font-serif text-xl sm:text-2xl text-[#f4f5f7] italic leading-snug">
            &ldquo;Engineering education reaches its full potential when students are given the freedom, structure, and guidance to build real things together.&rdquo;
          </blockquote>
          <p className="mt-3 text-xs font-mono tracking-wider text-[#b497cf] uppercase font-bold">
            &mdash; TechPulse Leadership
          </p>
        </div>
      </Reveal>
    </section>
  );
}