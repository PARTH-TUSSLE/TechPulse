import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { events } from "@/lib/events";
import { ArrowRightIcon } from "@/components/Icons";

export default function Events() {
  return (
    <section
      id="events"
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 sm:px-6 border-t border-[#2c2345] overflow-x-clip"
      aria-labelledby="events-title"
    >
      <SectionHeader
        index="03"
        category="Sessions"
        title="Upcoming Workshops"
        lede="Expert sessions and hands-on labs hosted in CSE Block 3."
      />

      <div className="mt-8 space-y-4">
        {events.map((event, index) => (
          <Reveal key={event.id} delay={index * 80}>
            <article className="tp-pulse-edge tp-pulse-edge-slow tp-card-glow border border-[#2c2345] bg-[#1b1531] p-6 sm:p-7 hover:border-[#b497cf]/60">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#b497cf] font-bold">
                    {event.type}
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-[#f4f5f7] leading-snug">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a79fbd] max-w-2xl">{event.why}</p>

                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono">
                    <span className="text-[#a79fbd] uppercase tracking-wider">
                      Speaker: <span className="font-bold text-[#f4f5f7] normal-case">{event.speaker}</span>
                    </span>
                    <span className="text-[#a79fbd] uppercase tracking-wider">
                      Time: <span className="font-bold text-[#b497cf] normal-case">{event.time}</span>
                    </span>
                    <span className="text-[#a79fbd] uppercase tracking-wider">
                      Venue: <span className="font-bold text-[#b497cf] normal-case">{event.venue}</span>
                    </span>
                  </div>
                </div>

                {event.register ? (
                  <a
                    href={event.register}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tp-pulse-edge w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#f4f5f7] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#120d1c] transition-all hover:bg-[#ffffff] shadow-lg active:scale-[0.98]"
                  >
                    <span>Register</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#a79fbd] uppercase font-bold shrink-0">
                    Form Opening Soon
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}