import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { events, type Event } from "@/lib/events";

function EventItem({ event, index }: { event: Event; index: number }) {
  return (
    <Reveal delay={index * 80}>
      <article className="border border-[#1f2228] bg-[#111317] p-5 sm:p-6 transition-colors hover:border-[#2b2f38]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Date Column */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#16181d] pb-4 lg:pb-0 lg:pr-6 flex flex-row lg:flex-col justify-between items-start">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#b497cf] block mb-1 font-semibold">
                {event.type}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#b497cf]">
                  {event.day}
                </span>
                <div className="flex flex-col text-[10px] font-mono uppercase text-[#8e95a2]">
                  <span className="font-semibold text-[#f4f5f7]">{event.month}</span>
                  <span className="text-[#b497cf] font-bold text-[9px]">DATE TBD</span>
                </div>
              </div>
            </div>

            <div className="mt-3 hidden lg:block text-[10px]">
              <span className="font-mono text-[#8e95a2] uppercase tracking-wider block">
                Audience:
              </span>
              <span className="text-[#8e95a2] block mt-0.5 leading-snug">
                {event.audience}
              </span>
            </div>
          </div>

          {/* Right Detail Column */}
          <div className="lg:col-span-9 space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#f4f5f7] tracking-tight leading-snug">
                {event.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#8e95a2]">
                {event.why}
              </p>
            </div>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-b border-[#16181d] py-3 text-[11px] font-mono">
              <div>
                <span className="text-[#8e95a2] uppercase tracking-wider block text-[9px]">Speaker:</span>
                <span className="text-[#f4f5f7] font-semibold mt-0.5 block leading-tight">{event.speaker}</span>
              </div>
              <div>
                <span className="text-[#8e95a2] uppercase tracking-wider block text-[9px]">Time:</span>
                <span className="text-[#b497cf] font-semibold mt-0.5 block leading-tight">{event.time}</span>
              </div>
              <div>
                <span className="text-[#8e95a2] uppercase tracking-wider block text-[9px]">Venue:</span>
                <span className="text-[#b497cf] font-semibold mt-0.5 block leading-tight">{event.venue}</span>
              </div>
            </div>

            {/* Highlights Tags & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {event.highlights.map((h) => (
                  <span
                    key={h}
                    className="border border-[#1f2228] bg-[#090a0c] px-2.5 py-0.5 text-[10px] font-mono text-[#8e95a2]"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {event.register ? (
                <a
                  href={event.register}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#f4f5f7] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#090a0c] transition-colors hover:bg-[#ffffff] active:scale-[0.98]"
                >
                  Feedback Form &rarr;
                </a>
              ) : (
                <span className="text-[10px] font-mono text-[#8e95a2] uppercase self-end sm:self-auto">
                  Form opening soon
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Events() {
  return (
    <section
      id="events"
      className="relative max-w-5xl mx-auto px-5 py-12 lg:px-6 border-t border-[#1f2228]"
      aria-labelledby="events-title"
    >
      <SectionHeader
        category="Sessions & Agenda"
        title="Upcoming Workshops"
        lede="Expert sessions and hands-on labs hosted in Block 3."
      />

      <div className="mt-8 space-y-5">
        {events.map((event, i) => (
          <EventItem key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}