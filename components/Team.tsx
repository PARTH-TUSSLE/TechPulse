import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import ExpandableText from "@/components/ExpandableText";
import { team } from "@/lib/team";

function contact(phone?: string) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const href = `tel:+91${digits}`;
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted transition-colors hover:text-signal"
    >
      <span aria-hidden>↗</span>
      +91 {phone.replace(/^(\d{5})(\d+)$/, "$1 $2")}
    </a>
  );
}

export default function Team() {
  const leads = team.filter((m) => m.lead);
  const coordinators = team.filter((m) => !m.lead && m.name);

  return (
    <section
      id="team"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32"
      aria-labelledby="team-title"
    >
      <SectionHeader
        path="/roster"
        title="The people behind the pulse"
        lede="A student leadership team across the department — coordinators who plan, build and run everything you see here."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {leads.map((member, i) => (
          <Reveal key={member.id} delay={i * 120} as="article">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/50 p-7 transition-colors duration-300 hover:border-signal/40 sm:p-9">
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex items-start justify-between gap-4">
                <AvatarBlock name={member.name} role={member.role} />
                <span className="rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">
                  Lead
                </span>
              </div>
              <ExpandableText text={member.bio} className="mt-6 text-sm leading-relaxed text-muted" />
              <div className="mt-6">{contact(member.phone)}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-1 border-b border-line bg-panel/40 px-6 py-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)_auto] md:gap-6 md:text-[0.65rem]">
          <span>Position / Coordinator</span>
          <span>Focus</span>
          <span className="hidden text-right md:block">Contact</span>
        </div>

        {coordinators.map((member, i) => (
          <Reveal key={member.id} delay={(i % 3) * 90}>
            <div className="group grid grid-cols-1 border-b border-line px-6 py-6 transition-colors duration-200 last:border-b-0 hover:bg-panel/50 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)_auto] md:items-center md:gap-6">
              <div className="flex items-center gap-4">
                <AvatarBlock name={member.name} role={member.role} compact />
              </div>
              <ExpandableText text={member.bio} className="mt-2 text-sm leading-relaxed text-muted md:mt-0" lines={2} />
              <div className="mt-3 md:mt-0 md:justify-self-end">{contact(member.phone)}</div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="grid grid-cols-1 gap-2 border-t border-dashed border-signal/30 px-5 py-4 bg-panel/20 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] md:items-center md:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-dashed border-signal/40 font-mono text-sm text-signal">
                ?
              </div>
              <div>
                <p className="font-display text-base tracking-tight text-mist">
                  Logistics &amp; Hospitality Coordinator
                </p>
                <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  Seat awaiting a coordinator
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted md:mt-0">
              Venues, seating, guest logistics and refreshments. This seat is open — claim it.
            </p>
            <div className="mt-3 md:mt-0 md:text-right">
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-md border border-signal/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-signal transition-colors hover:bg-signal/10"
              >
                Claim it
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AvatarBlock({
  name,
  role,
  compact = false,
}: {
  name: string;
  role: string;
  compact?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg border border-line bg-panel font-display font-semibold text-signal ${
          compact ? "h-10 w-10 text-xs" : "h-12 w-12 text-sm"
        }`}
      >
        {initials}
      </div>
      <div>
        <h3 className="font-display text-base font-semibold tracking-tight text-mist sm:text-lg">
          {name}
        </h3>
        <p className="mt-0.5 font-mono text-[0.62rem] leading-snug uppercase tracking-[0.14em] text-muted">
          {role}
        </p>
      </div>
    </div>
  );
}