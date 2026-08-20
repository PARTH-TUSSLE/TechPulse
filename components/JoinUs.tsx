import Reveal from "@/components/Reveal";
import { joinUrl } from "@/lib/club";
import { ArrowRightIcon } from "@/components/Icons";

export default function JoinUs() {
  return (
    <section
      id="join"
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 sm:px-6 border-t border-[#2c2345] overflow-x-clip"
    >
      <Reveal>
        <div className="tp-pulse-edge tp-pulse-edge-slow tp-card-glow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-[#2c2345] bg-[#1b1531] p-6 sm:p-8 hover:border-[#b497cf]/50">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#b497cf]">
              <span className="tp-heartbeat h-1.5 w-1.5 rounded-full bg-[#a8e08f]" />
              Membership Open
            </span>
            <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-black tracking-tight text-[#f4f5f7]">
              Ready to Build With Us?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#a79fbd]">
              CSE students across all semesters are welcome to join the club.
            </p>
          </div>

          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tp-pulse-edge w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#a8e08f] px-7 py-3 text-xs font-extrabold uppercase tracking-wider text-[#120d1c] transition-all hover:bg-[#b9ea9f] shadow-xl shadow-[#a8e08f]/20 active:scale-[0.98]"
          >
            <span>Open Join Form</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}