import Reveal from "@/components/Reveal";
import { joinUrl } from "@/lib/club";

const perks = [
  {
    title: "Build",
    body: "Ship workshops, events and projects that actually happen on campus.",
  },
  {
    title: "Learn",
    body: "Get first access to expert talks, sessions and hands-on labs.",
  },
  {
    title: "Lead",
    body: "Pick a role you love — from technical to creative to logistics.",
  },
];

export default function JoinUs() {
  return (
    <section id="join" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-panel/40 px-6 py-12 text-center sm:px-12 sm:py-16">
          <span
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-signal/10 blur-3xl"
            aria-hidden
          />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal sm:text-sm">
            <span className="text-muted">~/techpulse</span>
            <span className="text-lavender">/join</span>
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-[1.05] tracking-tight text-mist sm:text-5xl">
            Ready to join the pulse?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            We're building the club team for the coming year — coordinators, members and
            volunteers across every team. Pick your lane and jump in.
          </p>

          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-signal px-8 py-3.5 font-mono text-sm tracking-wider text-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(39,255,158,0.45)]"
          >
            Fill the Join Us form
            <span aria-hidden>→</span>
          </a>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {perks.map((perk, i) => (
          <Reveal key={perk.title} delay={i * 120} className="bg-ink">
            <div className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-panel/60 sm:p-9">
              <span className="self-start rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-2xl tracking-tight text-mist">{perk.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{perk.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}