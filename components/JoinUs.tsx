import Reveal from "@/components/Reveal";
import { joinUrl } from "@/lib/club";

const advantages = [
  {
    step: "01",
    title: "Engineering & Labs",
    body: "Build real tools, manage lab gear, and run bootcamps alongside senior leads.",
  },
  {
    step: "02",
    title: "Leadership & Ops",
    body: "Plan event timelines, oversee logistics, and coordinate with department faculty.",
  },
  {
    step: "03",
    title: "Mentorship & Network",
    body: "Priority access to expert sessions, career guidance, and project collaboration.",
  },
];

export default function JoinUs() {
  return (
    <section
      id="join"
      className="relative max-w-5xl mx-auto px-5 py-12 lg:px-6 border-t border-[#1f2228]"
    >
      <Reveal>
        <div className="border border-[#1f2228] bg-[#111317] p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#b497cf] block mb-1.5">
              Membership & Applications
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#f4f5f7] leading-tight">
              Ready to take part in TechPulse?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#8e95a2] leading-relaxed">
              We welcome CSE students across all semesters. Join our technical, design, media, or event operations teams.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#16181d]">
            {advantages.map((adv) => (
              <div key={adv.step} className="space-y-1">
                <span className="text-[10px] font-mono text-[#b497cf] uppercase">
                  {adv.step}
                </span>
                <h3 className="text-sm font-bold text-[#f4f5f7]">
                  {adv.title}
                </h3>
                <p className="text-xs text-[#8e95a2] leading-relaxed">
                  {adv.body}
                </p>
              </div>
            ))}
          </div>

          {/* Direct CTA Bar */}
          <div className="mt-8 pt-6 border-t border-[#16181d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8e95a2] tracking-wider block">
                Application Status: OPEN
              </span>
              <p className="text-xs font-semibold text-[#f4f5f7] mt-0.5">
                Fill out the official student join form
              </p>
            </div>

            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#b497cf] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090a0c] transition-all hover:bg-[#c4a5e6]"
            >
              Open Application Form &rarr;
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}