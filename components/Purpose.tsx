import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { mission } from "@/lib/data";

export default function Purpose() {
  return (
    <section
      id="purpose"
      className="relative max-w-5xl mx-auto px-4 py-10 sm:py-14 sm:px-6 border-t border-[#1f2228] w-full max-w-full overflow-x-clip"
      aria-labelledby="purpose-title"
    >
      <SectionHeader
        category="Our Philosophy"
        title="Why TechPulse Exists"
        lede="Designed for the student body of Computer Science & Engineering — real capability over vanity metrics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mt-6">
        {/* Left Column: Editorial Quote */}
        <div className="lg:col-span-5 border-l-2 border-[#b497cf] pl-4 py-1">
          <Reveal>
            <blockquote className="font-serif text-lg sm:text-2xl text-[#f4f5f7] italic leading-snug">
              &ldquo;Engineering education reaches its full potential when students are given the freedom, structure, and guidance to build real things together.&rdquo;
            </blockquote>
            <p className="mt-3 text-[10px] font-mono tracking-wider text-[#8e95a2] uppercase">
              &mdash; TechPulse Student Leadership
            </p>
          </Reveal>
        </div>

        {/* Right Column: Structured Breakdown */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {mission.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="border-b border-[#1f2228] pb-4 sm:pb-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[11px] font-mono text-[#b497cf] uppercase font-bold shrink-0">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-[#f4f5f7]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#8e95a2] pl-6">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}