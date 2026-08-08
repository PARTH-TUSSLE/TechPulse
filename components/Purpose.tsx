import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    label: "betterment",
    title: "Betterment",
    body: "Workshops, expert talks and hands-on sessions that raise the bar of what you can build.",
  },
  {
    label: "exposure",
    title: "Exposure",
    body: "Meet industry speakers, work on real problems, and see where the discipline is actually headed.",
  },
  {
    label: "guidance",
    title: "Guidance",
    body: "A coordinated team that helps you pick the path — courses, placements, projects and beyond.",
  },
];

export default function Purpose() {
  return (
    <section
      id="purpose"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32"
      aria-labelledby="purpose-title"
    >
      <SectionHeader
        path="/purpose"
        title="Why this club exists"
        lede="TechPulse was founded for one reason — the students of the CSE department. Everything we run is in service of three ideas."
      />

      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.label} delay={i * 120} className="bg-ink">
            <div className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-panel/60 sm:p-9">
              <span className="self-start rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-signal">
                {pillar.label}
              </span>
              <h3 className="mt-8 font-display text-2xl tracking-tight text-mist">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{pillar.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}