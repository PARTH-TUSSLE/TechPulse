import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { events, type Event } from "@/lib/events";

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <Reveal delay={index * 140} as="article">
      <div className="group relative overflow-hidden rounded-xl border border-line bg-panel/40 transition-colors duration-300 hover:border-signal/40">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
          <div className="flex flex-row items-center gap-4 border-b border-line p-6 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r md:p-8">
            <div className="flex items-end gap-2">
              <span className="font-display text-6xl font-semibold leading-none text-mist">
                {event.day}
              </span>
              <span className="mb-1 font-mono text-sm uppercase tracking-[0.2em] text-signal">
                {event.month}
              </span>
            </div>
            <div className="flex flex-col gap-1 md:mt-10">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                {event.type}
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                Aug 2026
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                {event.type}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                {event.audience}
              </span>
            </div>

            <h3 className="mt-5 max-w-2xl font-display text-2xl leading-snug tracking-tight text-mist sm:text-3xl">
              {event.title}
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {event.why}
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">Time</dt>
                <dd className="mt-1 font-mono text-xs tracking-wider text-mist">{event.time}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">Venue</dt>
                <dd className="mt-1 font-mono text-xs tracking-wider text-mist">{event.venue}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">Speaker</dt>
                <dd className="mt-1 font-mono text-xs leading-relaxed tracking-wider text-lavender">
                  {event.speaker}
                </dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${event.title} highlights`}>
              {event.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded border border-line px-3 py-1.5 font-mono text-[0.62rem] tracking-wide text-muted"
                >
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {event.register ? (
                <a
                  href={event.register}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-signal px-6 py-3 font-mono text-sm tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(39,255,158,0.45)]"
                >
                  Give Feedback
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  Feedback form coming soon
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Events() {
  return (
    <section
      id="events"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32"
      aria-labelledby="events-title"
    >
      <SectionHeader
        path="/roadmap"
        title="Upcoming events"
        lede="Two open sessions this August — both funded under the CSE department and led by external experts. Pick one, or come to both."
      />

      <div className="space-y-6">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}