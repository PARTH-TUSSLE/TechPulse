import Reveal from "@/components/Reveal";
import { joinUrl } from "@/lib/club";
import { ArrowRightIcon } from "@/components/Icons";

const advantages = [
  {
    step: "01",
    title: "Engineering & Labs",
    body: "Build real projects, direct lab workshops, and ship code.",
  },
  {
    step: "02",
    title: "Leadership & Ops",
    body: "Lead event timelines, handle logistics, and coordinate with faculty.",
  },
  {
    step: "03",
    title: "Mentorship & Network",
    body: "Priority access to expert talks, career guidance, and senior network.",
  },
];

export default function JoinUs() {
  return (
    <section
      id="join"
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 sm:px-6 border-t border-[#2c2345] overflow-x-clip"
    >
      <Reveal>
        <div className="border border-[#2c2345] bg-[#1b1531] p-6 sm:p-10 transition-all hover:border-[#b497cf]/50 hover:shadow-2xl hover:shadow-[#b497cf]/5">
          <div className="max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b497cf]/10 border border-[#b497cf]/30 mb-3">
                <span className="tp-heartbeat h-1.5 w-1.5 rounded-full bg-[#a8e08f]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#b497cf]">
                Membership Open
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-[#f4f5f7] leading-tight">
              Ready to Build With Us?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a79fbd] leading-relaxed">
              We welcome CSE students across all semesters. Select your core domain and join the team.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#26203f]">
            {advantages.map((adv) => (
              <div key={adv.step} className="space-y-1.5">
                <span className="text-xs font-mono text-[#b497cf] font-extrabold uppercase block">
                  {adv.step}
                </span>
                <h3 className="text-base font-bold text-[#f4f5f7]">
                  {adv.title}
                </h3>
                <p className="text-xs text-[#a79fbd] leading-relaxed">
                  {adv.body}
                </p>
              </div>
            ))}
          </div>

          {/* Direct CTA Bar */}
          <div className="mt-8 pt-6 border-t border-[#26203f] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#b497cf] tracking-wider block">
                Official Student Join Form
              </span>
              <p className="text-xs text-[#a79fbd] mt-0.5 font-medium">
                Applications reviewed on a rolling basis.
              </p>
            </div>

            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#a8e08f] px-7 py-3 text-xs font-extrabold uppercase tracking-wider text-[#120d1c] transition-all hover:bg-[#b9ea9f] shadow-xl shadow-[#a8e08f]/20 active:scale-[0.98]"
            >
              <span>Open Join Form</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}