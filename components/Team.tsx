"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { leadership, teams, type Team, type TeamMember } from "@/lib/team";
import { joinUrl } from "@/lib/club";

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
    <div className="flex items-center justify-between py-2 border-b border-[#16181d] text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-semibold font-mono ${
            isPlaceholder
              ? "border border-dashed border-[#2b2f38] text-[#8e95a2]"
              : "bg-[#111317] border border-[#2b2f38] text-[#b497cf]"
          }`}
        >
          {initials(member.name)}
        </div>
        <span className={`truncate font-medium ${isPlaceholder ? "text-[#8e95a2] italic" : "text-[#f4f5f7]"}`}>
          {member.name}
        </span>
      </div>
      <span className="text-[10px] font-mono text-[#8e95a2] uppercase tracking-wider shrink-0 ml-3">
        {member.role}
      </span>
    </div>
  );
}

function CarouselTeamCard({
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
      className={`snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] border bg-[#111317]/95 p-5 transition-all duration-300 flex flex-col justify-between ${
        isActive
          ? "border-[#b497cf] shadow-xl shadow-[#b497cf]/10 ring-1 ring-[#b497cf]/30"
          : "border-[#1f2228] opacity-85 hover:opacity-100 hover:border-[#2b2f38]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-[#16181d] pb-2.5">
          <span className="text-[10px] font-mono text-[#b497cf] uppercase font-semibold tracking-wider truncate">
            {team.label}
          </span>
          <span className="text-[10px] font-mono text-[#8e95a2] bg-[#090a0c] px-2 py-0.5 border border-[#1f2228] shrink-0">
            {team.members.length + 1} Members
          </span>
        </div>

        <h3 className="mt-3 text-base sm:text-lg font-bold tracking-tight text-[#f4f5f7] truncate">
          {team.title}
        </h3>
        <p className="mt-1 text-xs text-[#8e95a2] leading-relaxed line-clamp-3">
          {team.blurb}
        </p>

        {/* Lead Coordinator Highlight */}
        <div className="mt-4 pt-3 border-t border-[#16181d]">
          <span className="text-[9px] font-mono text-[#8e95a2] uppercase tracking-widest block mb-1.5">
            Lead Coordinator
          </span>
          <div className="flex items-center gap-2.5 bg-[#090a0c]/60 p-2 border border-[#1a1d24]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#b497cf]/50 bg-[#111317] text-[10px] font-mono font-bold text-[#b497cf]">
              {initials(team.coordinator.name)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#f4f5f7] truncate">
                {team.coordinator.name}
              </p>
              <p className="text-[10px] text-[#8e95a2] truncate">
                {team.coordinator.role}
              </p>
            </div>
          </div>
        </div>

        {/* Expanded Roster Breakdown */}
        {isOpen && (
          <div className="mt-4 pt-3 border-t border-[#16181d] space-y-0.5 max-h-56 overflow-y-auto pr-1 no-scrollbar">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#b497cf] mb-2">
              Team Roster Breakdown
            </p>
            {team.members.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#16181d]">
        <button
          type="button"
          onClick={onToggle}
          className="w-full inline-flex items-center justify-center gap-1.5 border border-[#2b2f38] bg-[#090a0c] px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#f4f5f7] transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
        >
          <span>{isOpen ? "Hide Members" : "View Roster"}</span>
          <span>{isOpen ? "↑" : "↓"}</span>
        </button>
      </div>
    </div>
  );
}

function AutomaticTeamCarousel({ teams }: { teams: Team[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isUserInteractingRef = useRef(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smoothly scroll container to active card index
  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      const left = card.offsetLeft - container.offsetLeft;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, []);

  // When currentIndex updates, scroll to that card
  useEffect(() => {
    scrollToCard(currentIndex);
  }, [currentIndex, scrollToCard]);

  // Automatic slide advancement timer (every 2400 ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teams.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [isPaused, teams.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teams.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teams.length) % teams.length);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Sync scroll position ONLY during manual touch swiping
  const handleScroll = () => {
    if (!isUserInteractingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const firstCard = container.children[0] as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.clientWidth || 300;
    const gap = 16;
    const calculatedIndex = Math.round(scrollLeft / (cardWidth + gap));
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
    <div className="space-y-4">
      {/* Carousel Control Bar - Counter + Title + Centered Controls on clean line */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 bg-[#111317] border border-[#1f2228] px-4 py-3 text-xs font-mono">
        {/* Team Counter & Active Title inline on single line */}
        <div className="flex items-center justify-center gap-2.5 shrink-0">
          <span className="shrink-0 whitespace-nowrap text-[#b497cf] font-bold text-xs bg-[#090a0c] px-2.5 py-1 border border-[#1f2228]">
            {String(currentIndex + 1).padStart(2, "0")} / {String(teams.length).padStart(2, "0")}
          </span>
          <span className="shrink-0 whitespace-nowrap text-[#f4f5f7] font-semibold text-xs sm:text-sm">
            {teams[currentIndex]?.title}
          </span>
        </div>

        {/* Centered Controls Group: Resume/Pause, Prev, Next */}
        <div className="flex items-center justify-center gap-2 shrink-0">
          {/* Pause / Play toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 text-[10px] font-bold uppercase font-mono border transition-all active:scale-95 ${
              isPaused
                ? "bg-[#b497cf] border-[#b497cf] text-[#090a0c] shadow-md shadow-[#b497cf]/20"
                : "bg-[#090a0c] border-[#2b2f38] text-[#b497cf] hover:border-[#b497cf]"
            }`}
            title={isPaused ? "Resume Auto-Carousel" : "Pause Auto-Carousel"}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>

          {/* Left / Right arrows */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Team Card"
              className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#2b2f38] bg-[#090a0c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf] active:scale-95 transition-all"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Team Card"
              className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#2b2f38] bg-[#090a0c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf] active:scale-95 transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-0.5 w-full bg-[#16181d] overflow-hidden">
        <div
          className={`h-full bg-[#b497cf] transition-all duration-300 ease-linear ${
            isPaused ? "opacity-30" : "opacity-100"
          }`}
          style={{ width: `${((currentIndex + 1) / teams.length) * 100}%` }}
        />
      </div>

      {/* Horizontal Carousel Track - items-start ensures expanding one card does not stretch adjacent cards */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-touch py-2 px-0.5"
      >
        {teams.map((team, idx) => (
          <CarouselTeamCard
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

      {/* Pagination Indicator Dots */}
      <div className="flex justify-center items-center gap-1.5 pt-1">
        {teams.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to ${t.title}`}
            className={`h-1.5 transition-all ${
              idx === currentIndex
                ? "w-6 bg-[#b497cf]"
                : "w-1.5 bg-[#2b2f38] hover:bg-[#8e95a2]"
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
    <div className="border border-[#1f2228] bg-[#111317]/90 p-4 sm:p-5 transition-colors hover:border-[#2b2f38]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#b497cf] uppercase font-semibold">
              {team.label}
            </span>
            <span className="text-[10px] text-[#8e95a2]">
              &middot; {team.members.length + 1} Members & Lead
            </span>
          </div>
          <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-[#f4f5f7]">
            {team.title}
          </h3>
          <p className="mt-0.5 text-xs text-[#8e95a2]">
            {team.blurb}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="self-start sm:self-center inline-flex items-center gap-1.5 border border-[#2b2f38] bg-[#090a0c] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#f4f5f7] transition-colors hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
        >
          <span>{open ? "Hide Members" : "View Roster"}</span>
          <span>{open ? "↑" : "↓"}</span>
        </button>
      </div>

      {/* Coordinator Highlight */}
      <div className="mt-3 pt-3 border-t border-[#16181d] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8e95a2] uppercase">Lead Coordinator:</span>
          <span className="font-semibold text-[#f4f5f7]">{team.coordinator.name}</span>
          <span className="text-[10px] text-[#8e95a2]">({team.coordinator.role})</span>
        </div>
      </div>

      {/* Expanded Roster */}
      {open && (
        <div className="mt-3 pt-3 border-t border-[#16181d] space-y-0.5">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#b497cf] mb-2">
            Team Roster Breakdown
          </p>
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
      className="relative max-w-5xl mx-auto px-4 py-10 sm:py-14 sm:px-6 border-t border-[#1f2228]"
      aria-labelledby="team-title"
    >
      <SectionHeader
        category="Governance & Roster"
        title="Student Leadership & Teams"
        lede="Coordinators across engineering, design, media, and event operations."
      />

      {/* Executive Leadership */}
      <div className="mt-6">
        <Reveal>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#b497cf] mb-3">
            <span>Executive Leadership</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leadership.map((lead, i) => (
            <Reveal key={lead.id} delay={i * 80}>
              <div className="border border-[#1f2228] bg-[#111317] p-4 flex items-start gap-4 transition-colors hover:border-[#2b2f38]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#b497cf]/40 bg-[#090a0c] font-mono text-xs font-bold text-[#b497cf]">
                  {initials(lead.name)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e95a2]">
                    {lead.role}
                  </span>
                  <h3 className="mt-0.5 text-base sm:text-lg font-bold tracking-tight text-[#f4f5f7]">
                    {lead.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#8e95a2] leading-snug">
                    Overall club coordination, faculty alignment, and team supervision.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Core Teams Roster Section */}
      <div className="mt-12">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-[#1f2228] pb-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b497cf]">
                  Departmental Teams
                </span>
                <h3 className="mt-0.5 text-xl font-bold text-[#f4f5f7]">
                  Core Operations
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#8e95a2]">
                {filter === "all" ? "Horizontal Auto-Carousel View" : `Category: ${filteredTeams[0]?.label}`}
              </span>
            </div>

            {/* Category Filter Pills - Scrollable horizontal bar on mobile */}
            <div className="flex overflow-x-auto no-scrollbar scroll-touch gap-1.5 pb-1 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`shrink-0 px-3 py-1.5 text-[10px] font-mono uppercase transition-all border ${
                  filter === "all"
                    ? "bg-[#b497cf] border-[#b497cf] text-[#090a0c] font-bold shadow-md shadow-[#b497cf]/20"
                    : "bg-[#111317] border-[#2b2f38] text-[#8e95a2] hover:text-[#f4f5f7] hover:border-[#8e95a2]"
                }`}
              >
                All ({teams.length})
              </button>
              {teams.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  className={`shrink-0 px-3 py-1.5 text-[10px] font-mono uppercase transition-all border ${
                    filter === t.id
                      ? "bg-[#b497cf] border-[#b497cf] text-[#090a0c] font-bold shadow-md shadow-[#b497cf]/20"
                      : "bg-[#111317] border-[#2b2f38] text-[#8e95a2] hover:text-[#f4f5f7] hover:border-[#8e95a2]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Display Content: Horizontal Carousel when "All", or Filtered Team List when tab selected */}
        {filter === "all" ? (
          <AutomaticTeamCarousel teams={teams} />
        ) : (
          <div className="space-y-4">
            {filteredTeams.map((team) => (
              <TeamAccordionItem key={team.id} team={team} />
            ))}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="inline-flex items-center gap-1.5 border border-[#2b2f38] bg-[#111317] px-4 py-2 text-[10px] font-mono text-[#b497cf] uppercase hover:border-[#b497cf] transition-all active:scale-95"
              >
                ← Back to All Teams Carousel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recruitment Callout */}
      <Reveal delay={160} className="mt-10">
        <div className="border border-dashed border-[#2b2f38] bg-[#111317]/50 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#f4f5f7]">Open Member Positions</h4>
            <p className="mt-0.5 text-xs text-[#8e95a2]">
              Applications open for technical, creative, and event operations roles.
            </p>
          </div>
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center shrink-0 bg-[#b497cf] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090a0c] transition-all hover:bg-[#c4a5e6] active:scale-[0.98]"
          >
            Apply for Slot &rarr;
          </a>
        </div>
      </Reveal>
    </section>
  );
}