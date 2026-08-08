"use client";

import { useRef, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { leadership, teams, type Team, type TeamMember } from "@/lib/team";
import { joinUrl } from "@/lib/club";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ member }: { member: TeamMember }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border font-display text-xs font-semibold h-9 w-9 ${
        member.placeholder
          ? "border-dashed border-lavender/40 bg-transparent text-lavender"
          : "border-line bg-panel text-signal"
      }`}
    >
      {member.placeholder ? "+" : initials(member.name)}
    </div>
  );
}

function Person({ member }: { member: TeamMember }) {
  return (
    <li className="flex items-center gap-3">
      <Avatar member={member} />
      <div className="min-w-0">
        <p
          className={`truncate font-display text-sm font-semibold tracking-tight ${
            member.placeholder ? "text-mist/70" : "text-mist"
          }`}
        >
          {member.name}
        </p>
        <p className="truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
          {member.role}
        </p>
      </div>
    </li>
  );
}

function LeadCard({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-full min-w-0 overflow-hidden rounded-xl border border-signal/30 bg-panel/60 p-5 sm:p-6">
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-signal"
        aria-hidden
      />
      <span className="self-start rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">
        Leadership
      </span>
      <div className="mt-4 flex items-center gap-3">
        <Avatar member={member} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-semibold tracking-tight text-mist">
            {member.name}
          </h3>
          <p className="truncate font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamCard({
  team,
  expanded,
  onToggle,
}: {
  team: Team;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-panel/40 p-5 transition-colors duration-300 hover:border-signal/40 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">
          {team.label}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
          {expanded ? `${team.members.length} members` : `${team.members.length} slots`}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-mist">
        {team.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{team.blurb}</p>

      <div className="mt-5 border-t border-line pt-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-lavender">
          Coordinator
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Avatar member={team.coordinator} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold tracking-tight text-mist">
              {team.coordinator.name}
            </p>
            <p className="truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              {team.coordinator.role}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted transition-colors hover:border-signal/50 hover:text-signal"
        >
          {expanded ? "Hide members" : "See all members"}
          <span aria-hidden>{expanded ? "↑" : "↓"}</span>
        </button>
        {!expanded ? (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-lavender/70">
            Joining soon
          </span>
        ) : null}
      </div>

      {expanded ? (
        <ul className="mt-4 space-y-3">
          {team.members.map((member) => (
            <Person key={member.id} member={member} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function TeamCarousel({
  expandedId,
  onToggle,
}: {
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * Math.min(trackRef.current.clientWidth * 0.8, 320),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative md:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {teams.map((team) => (
          <div key={team.id} className="w-[80vw] max-w-[320px] shrink-0 snap-center">
            <TeamCard
              team={team}
              expanded={expandedId === team.id}
              onToggle={() => onToggle(team.id)}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          aria-label="Previous team"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel/60 text-muted transition-colors hover:border-signal/50 hover:text-signal"
        >
          ←
        </button>
        <span className="h-px w-8 bg-line" aria-hidden />
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          aria-label="Next team"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel/60 text-muted transition-colors hover:border-signal/50 hover:text-signal"
        >
          →
        </button>
      </div>

      <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
        Swipe to explore the teams
      </p>
    </div>
  );
}

function LeadershipBlock() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {leadership.map((member, i) => (
        <Reveal key={member.id} delay={i * 120} className="min-w-0">
          <LeadCard member={member} />
        </Reveal>
      ))}
    </div>
  );
}

function DesktopTeams({
  expandedId,
  onToggle,
}: {
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        {teams.map((team, i) => (
          <Reveal key={team.id} delay={(i % 3) * 100} className="min-w-0">
            <TeamCard
              team={team}
              expanded={expandedId === team.id}
              onToggle={() => onToggle(team.id)}
            />
          </Reveal>
        ))}

        <Reveal delay={200}>
          <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-signal/40 bg-panel/20 p-5 sm:p-6">
            <div>
              <span className="rounded border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal">
                Growth
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-mist">
                Your team awaits
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                We're expanding fast — new leads, new members, new ideas. Got a role in mind?
              </p>
            </div>
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-signal px-5 py-2.5 font-mono text-sm tracking-wider text-ink transition-transform hover:-translate-y-0.5"
            >
              Join Us
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function Team() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) =>
    setExpandedId((current) => (current === id ? null : id));

  return (
    <section
      id="team"
      className="relative mx-auto max-w-6xl px-0 py-20 sm:px-8 sm:py-32"
      aria-labelledby="team-title"
    >
      <div className="px-5 sm:px-0">
        <SectionHeader
          path="/teams"
          title="The people behind the pulse"
          lede="A student leadership team across the department — coordinators who plan, build and run everything you see here."
        />
      </div>

      <div className="mb-8 px-5 sm:px-0">
        <Reveal>
          <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-lavender/80">
            Leadership
          </h3>
        </Reveal>
        <div className="mt-4">
          <LeadershipBlock />
        </div>
      </div>

      <div className="mb-8 px-5 sm:px-0">
        <Reveal>
          <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-lavender/80">
            Core teams
          </h3>
        </Reveal>
      </div>

      <TeamCarousel expandedId={expandedId} onToggle={handleToggle} />
      <DesktopTeams expandedId={expandedId} onToggle={handleToggle} />
    </section>
  );
}