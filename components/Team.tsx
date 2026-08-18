"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { leadership, teams, type Team, type TeamMember } from "@/lib/team";
import { joinUrl } from "@/lib/club";
import {
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/Icons";

function initials(name: string) {
  if (name.toLowerCase().includes("open")) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberRow({ member }: { member: TeamMember }) {
  const isPlaceholder = member.placeholder || member.name.toLowerCase().includes("open");
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#26203f] text-xs last:border-b-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold font-mono ${
            isPlaceholder
              ? "border border-dashed border-[#3a3155] text-[#a79fbd]"
              : "bg-[#120d1c] border border-[#b497cf]/40 text-[#b497cf]"
          }`}
        >
          {initials(member.name)}
        </div>
        <span className={`truncate font-semibold ${isPlaceholder ? "text-[#a79fbd] italic" : "text-[#f4f5f7]"}`}>
          {member.name}
        </span>
      </div>
      <span className="text-[10px] font-mono text-[#a79fbd] uppercase tracking-wider shrink-0 ml-3 font-semibold">
        {member.role}
      </span>
    </div>
  );
}

function TeamSummaryCard({
  team,
  isActive,
  isOpen,
  onToggle,
}: {
  team: Team;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`snap-start shrink-0 w-[calc(100vw-2.5rem)] max-w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] border bg-[#1b1531]/90 p-6 transition-all duration-300 flex flex-col ${
        isActive
          ? "border-[#b497cf] shadow-2xl shadow-[#b497cf]/10"
          : "border-[#2c2345] hover:border-[#3a3155]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-[#b497cf] uppercase font-bold tracking-wider truncate">
          {team.label}
        </span>
        <span className="text-[10px] font-mono font-bold text-[#f4f5f7] bg-[#120d1c] px-2.5 py-1 border border-[#2c2345] shrink-0">
          {team.members.length + 1}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[#f4f5f7]">
        {team.title}
      </h3>
      <p className="mt-1.5 text-xs text-[#a79fbd] leading-relaxed">
        {team.blurb}
      </p>

      <div className="mt-5 pt-4 border-t border-[#26203f] flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#b497cf]/50 bg-[#120d1c] text-[10px] font-mono font-bold text-[#b497cf]">
          {initials(team.coordinator.name)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#f4f5f7] truncate">
            {team.coordinator.name}
          </p>
          <p className="text-[10px] font-mono text-[#a79fbd] truncate font-semibold uppercase tracking-wider">
            {team.coordinator.role}
          </p>
        </div>
      </div>

      {/* Expanded Roster Breakdown */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-[#26203f] space-y-0.5 max-h-56 overflow-y-auto pr-1 no-scrollbar">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#b497cf] font-bold mb-2">
            Team Roster Breakdown
          </p>
          {team.members.map((m) => (
            <MemberRow key={m.id} member={m} />
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#26203f]">
        <button
          type="button"
          onClick={onToggle}
          className="w-full inline-flex items-center justify-center gap-2 border border-[#3a3155] bg-[#120d1c] px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#f4f5f7] font-bold transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
        >
          <span>{isOpen ? "Hide Roster" : "View Full Roster"}</span>
          {isOpen ? <ChevronUpIcon className="w-3.5 h-3.5" /> : <ChevronDownIcon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

function TeamCarousel({ teams }: { teams: Team[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isUserInteractingRef = useRef(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      const left = card.offsetLeft - container.offsetLeft;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToCard(currentIndex);
  }, [currentIndex, scrollToCard]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teams.length);
    }, 1700);
    return () => clearInterval(timer);
  }, [isPaused, teams.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % teams.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + teams.length) % teams.length);

  const handleScroll = () => {
    if (!isUserInteractingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstCard = container.children[0] as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.clientWidth || 300;
    const gap = 16;
    const calculatedIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    if (calculatedIndex >= 0 && calculatedIndex < teams.length && calculatedIndex !== currentIndex) {
      setCurrentIndex(calculatedIndex);
    }
  };

  const handleTouchStart = () => {
    isUserInteractingRef.current = true;
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 800);
  };

  return (
    <div className="space-y-3">
      {/* Minimal Header Row */}
      <div className="flex items-center justify-between border-b border-[#2c2345] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs font-extrabold text-[#b497cf]">
            {String(currentIndex + 1).padStart(2, "0")}
            <span className="text-[#3a3155] mx-1">/</span>
            {String(teams.length).padStart(2, "0")}
          </span>
          <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-[#f4f5f7] truncate">
            {teams[currentIndex]?.title}
          </h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
            title={isPaused ? "Resume Carousel" : "Pause Carousel"}
            className={`flex h-9 w-9 items-center justify-center border transition-all active:scale-95 ${
              isPaused
                ? "border-[#b497cf] bg-[#b497cf] text-[#120d1c]"
                : "border-[#3a3155] bg-[#120d1c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf]"
            }`}
          >
            {isPaused ? <PlayIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Team Card"
            className="flex h-9 w-9 items-center justify-center border border-[#3a3155] bg-[#120d1c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf] active:scale-95 transition-all"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Team Card"
            className="flex h-9 w-9 items-center justify-center border border-[#3a3155] bg-[#120d1c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf] active:scale-95 transition-all"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-0.5 w-full bg-[#26203f] overflow-hidden">
        <div
          className={`h-full bg-[#b497cf] transition-all duration-300 ease-linear ${
            isPaused ? "opacity-30" : "opacity-100"
          }`}
          style={{ width: `${((currentIndex + 1) / teams.length) * 100}%` }}
        />
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-touch py-1 px-0.5 w-full max-w-full"
      >
        {teams.map((team, idx) => (
          <TeamSummaryCard
            key={team.id}
            team={team}
            isActive={idx === currentIndex}
            isOpen={expandedTeamId === team.id}
            onToggle={() => {
              const nextState = expandedTeamId === team.id ? null : team.id;
              setExpandedTeamId(nextState);
              if (nextState !== null) setIsPaused(true);
            }}
          />
        ))}
      </div>

      {/* Tick Pagination - single indicator */}
      <div className="flex items-center gap-1 pt-1">
        {teams.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to ${t.title}`}
            className={`h-1 transition-all ${
              idx === currentIndex ? "w-8 bg-[#b497cf]" : "w-2 bg-[#3a3155] hover:bg-[#a79fbd]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TeamAccordionItem({ team }: { team: Team }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#2c2345] bg-[#1b1531]/90 p-4 sm:p-5 transition-colors hover:border-[#3a3155]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#b497cf] uppercase font-bold">
              {team.label}
            </span>
            <span className="text-[10px] text-[#a79fbd] font-semibold">
              &middot; {team.members.length + 1} Members
            </span>
          </div>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-[#f4f5f7]">
            {team.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="self-start sm:self-center inline-flex items-center gap-1.5 border border-[#3a3155] bg-[#120d1c] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#f4f5f7] font-bold transition-colors hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
        >
          <span>{open ? "Hide Roster" : "View Roster"}</span>
          {open ? <ChevronUpIcon className="w-3.5 h-3.5" /> : <ChevronDownIcon className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-[#26203f] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#a79fbd] uppercase font-bold">Lead:</span>
          <span className="font-bold text-[#f4f5f7]">{team.coordinator.name}</span>
          <span className="text-[10px] font-mono text-[#b497cf] font-semibold">({team.coordinator.role})</span>
        </div>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-[#26203f]">
          {team.members.map((m) => (
            <MemberRow key={m.id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const [filter, setFilter] = useState<string>("all");

  const filteredTeams = filter === "all" ? teams : teams.filter((t) => t.id === filter);

  return (
    <section
      id="team"
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 sm:px-6 border-t border-[#2c2345] overflow-x-clip"
      aria-labelledby="team-title"
    >
      <SectionHeader
        index="02"
        category="Governance & Roster"
        title="Student Leadership & Teams"
        lede="9 specialized departmental teams driving tech, creative, media, and logistics."
      />

      {/* Executive Leadership */}
      <div className="mt-8">
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b497cf] font-bold mb-4">
            <span>Executive Leadership</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leadership.map((lead, i) => (
            <Reveal key={lead.id} delay={i * 80}>
              <div className="border border-[#2c2345] bg-[#1b1531] p-5 flex items-center gap-4 transition-all hover:border-[#b497cf]/60 hover:shadow-xl hover:shadow-[#b497cf]/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#b497cf]/60 bg-[#120d1c] font-mono text-sm font-extrabold text-[#b497cf]">
                  {initials(lead.name)}
                </div>
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#b497cf] bg-[#120d1c] px-2 py-0.5 border border-[#2c2345] mb-1">
                    {lead.role}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#f4f5f7]">
                    {lead.name}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Core Teams Roster Section */}
      <div className="mt-12">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-[#2c2345] pb-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b497cf] font-bold">
                  Departmental Teams
                </span>
                <h3 className="mt-1 text-2xl font-extrabold text-[#f4f5f7] tracking-tight">
                  Core Operations
                </h3>
              </div>
              <span className="text-xs font-mono text-[#a79fbd]">
                {filter === "all" ? "Carousel" : `Category: ${filteredTeams[0]?.label}`}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex overflow-x-auto no-scrollbar scroll-touch gap-1.5 pb-1 pt-1 w-full max-w-full">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`shrink-0 px-3.5 py-1.5 text-[10px] font-mono uppercase font-bold transition-all border ${
                  filter === "all"
                    ? "bg-[#b497cf] border-[#b497cf] text-[#120d1c]"
                    : "bg-[#1b1531] border-[#3a3155] text-[#a79fbd] hover:text-[#f4f5f7] hover:border-[#a79fbd]"
                }`}
              >
                All ({teams.length})
              </button>
              {teams.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  className={`shrink-0 px-3.5 py-1.5 text-[10px] font-mono uppercase font-bold transition-all border ${
                    filter === t.id
                      ? "bg-[#b497cf] border-[#b497cf] text-[#120d1c]"
                      : "bg-[#1b1531] border-[#3a3155] text-[#a79fbd] hover:text-[#f4f5f7] hover:border-[#a79fbd]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {filter === "all" ? (
          <TeamCarousel teams={teams} />
        ) : (
          <div className="space-y-4">
            {filteredTeams.map((team) => (
              <TeamAccordionItem key={team.id} team={team} />
            ))}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="inline-flex items-center gap-2 border border-[#3a3155] bg-[#1b1531] px-5 py-2.5 text-xs font-mono font-bold text-[#b497cf] uppercase hover:border-[#b497cf] transition-all active:scale-95"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to All Teams</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recruitment Callout */}
      <Reveal delay={160} className="mt-10">
        <div className="border border-dashed border-[#3a3155] bg-[#1b1531]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-extrabold text-[#f4f5f7]">Open Member Positions</h4>
            <p className="mt-1 text-xs text-[#a79fbd]">
              Applications open for technical, creative, and event operations roles.
            </p>
          </div>
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 shrink-0 bg-[#a8e08f] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#120d1c] transition-all hover:bg-[#b9ea9f] active:scale-[0.98]"
          >
            <span>Apply for Slot</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}