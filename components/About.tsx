import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { mission } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 sm:px-6 border-t border-[#2c2345] overflow-x-clip"
      aria-labelledby="about-title"
    >
      <SectionHeader
        compact
        index="01"
        category="About the Club"
        title="Who We Are"
        lede="TechPulse is the student activity club of the CSE Department at CCE, CGC University, Mohali — a community built for betterment, exposure and guidance."
      />

      <div className="mt-5 grid grid-cols-1 gap-px sm:grid-cols-3 border border-[#2c2345] bg-[#2c2345]">
        {mission.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <div className="tp-pulse-edge tp-pulse-edge-slow tp-card-glow h-full bg-[#1b1531] p-4 sm:p-5">
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#b497cf]">
                0{index + 1} / {item.title}
              </span>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#a79fbd]">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}