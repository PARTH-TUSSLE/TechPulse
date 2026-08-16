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
    <div className="flex items-center justify-between py-2 border-b border-[#16181d] text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold font-mono ${
            isPlaceholder
              ? "border border-dashed border-[#2b2f38] text-[#8e95a2]"
              : "bg-[#090a0c] border border-[#b497cf]/40 text-[#b497cf]"
          }`}
        >
          {initials(member.name)}
        </div>
        <span className={`truncate font-semibold ${isPlaceholder ? "text-[#8e95a2] italic" : "text-[#f4f5f7]"}`}>
          {member.name}
        </span>
      </div>
      <span className="text-[10px] font-mono text-[#8e95a2] uppercase tracking-wider shrink-0 ml-3 font-semibold">
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
      className={`snap-start shrink-0 w-[calc(100vw-2.5rem)] max-w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] border bg-[#111317]/95 p-5 transition-all duration-300 flex flex-col justify-between ${
        isActive
          ? "border-[#b497cf] shadow-2xl shadow-[#b497cf]/15 ring-1 ring-[#b497cf]/40"
          : "border-[#1f2228] opacity-90 hover:opacity-100 hover:border-[#2b2f38]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-[#16181d] pb-3">
          <span className="text-[11px] font-mono text-[#b497cf] uppercase font-bold tracking-wider truncate">
            {team.label}
          </span>
          <span className="text-[10px] font-mono font-bold text-[#f4f5f7] bg-[#090a0c] px-2.5 py-1 border border-[#1f2228] shrink-0">
            {team.members.length + 1} Roster
          </span>
        </div>

        <h3 className="mt-3.5 text-lg sm:text-xl font-extrabold tracking-tight text-[#f4f5f7] truncate">
          {team.title}
        </h3>
        <p className="mt-1.5 text-xs text-[#8e95a2] leading-relaxed line-clamp-2">
          {team.blurb}
        </p>

        {/* Lead Coordinator Highlight */}
        <div className="mt-4 pt-3 border-t border-[#16181d]">
          <span className="text-[9px] font-mono text-[#8e95a2] uppercase tracking-widest block mb-1.5 font-bold">
            Lead Coordinator
          </span>
          <div className="flex items-center gap-2.5 bg-[#090a0c] p-2.5 border border-[#1a1d24]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#b497cf]/50 bg-[#111317] text-[10px] font-mono font-bold text-[#b497cf]">
              {initials(team.coordinator.name)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#f4f5f7] truncate">
                {team.coordinator.name}
              </p>
              <p className="text-[10px] font-mono text-[#b497cf] truncate font-semibold">
                {team.coordinator.role}
              </p>
            </div>
          </div>
        </div>

        {/* Expanded Roster Breakdown */}
        {isOpen && (
          <div className="mt-4 pt-3 border-t border-[#16181d] space-y-0.5 max-h-56 overflow-y-auto pr-1 no-scrollbar">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#b497cf] font-bold mb-2">
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
          className="w-full inline-flex items-center justify-center gap-2 border border-[#2b2f38] bg-[#090a0c] px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#f4f5f7] font-bold transition-all hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
        >
          <span>{isOpen ? "Hide Roster" : "View Full Roster"}</span>
          {isOpen ? <ChevronUpIcon className="w-3.5 h-3.5" /> : <ChevronDownIcon className="w-3.5 h-3.5" />}
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
    <div className="space-y-4 max-w-full">
      {/* Carousel Control Bar - Counter + Title + Clean Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111317] border border-[#1f2228] px-4 py-3.5 text-xs font-mono max-w-full overflow-hidden shadow-lg">
        {/* Team Counter & Active Title */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 font-extrabold text-xs bg-[#090a0c] text-[#b497cf] px-3 py-1 border border-[#b497cf]/30">
            {String(currentIndex + 1).padStart(2, "0")} / {String(teams.length).padStart(2, "0")}
          </span>
          <span className="truncate text-[#f4f5f7] font-extrabold text-sm sm:text-base tracking-tight">
            {teams[currentIndex]?.title}
          </span>
        </div>

        {/* Controls Group */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 border-[#1f2228] pt-2.5 sm:pt-0">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3.5 py-1.5 text-[10px] font-extrabold uppercase font-mono border transition-all active:scale-95 ${
              isPaused
                ? "bg-[#b497cf] border-[#b497cf] text-[#090a0c] shadow-md shadow-[#b497cf]/30"
                : "bg-[#090a0c] border-[#2b2f38] text-[#b497cf] hover:border-[#b497cf]"
            }`}
            title={isPaused ? "Resume Carousel" : "Pause Carousel"}
          >
            {isPaused ? (
              <>
                <PlayIcon className="w-3 h-3" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <PauseIcon className="w-3 h-3" />
                <span>Pause</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Team Card"
              className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#2b2f38] bg-[#090a0c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf] active:scale-95 transition-all"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Team Card"
              className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#2b2f38] bg-[#090a0c] text-[#f4f5f7] hover:border-[#b497cf] hover:text-[#b497cf] active:scale-95 transition-all"
            >
              <ChevronRightIcon className="w-4 h-4" />
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

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-touch py-2 px-0.5 w-full max-w-full"
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
            <span className="text-[11px] font-mono text-[#b497cf] uppercase font-bold">
              {team.label}
            </span>
            <span className="text-[10px] text-[#8e95a2] font-semibold">
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
          className="self-start sm:self-center inline-flex items-center gap-1.5 border border-[#2b2f38] bg-[#090a0c] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#f4f5f7] font-bold transition-colors hover:border-[#b497cf] hover:text-[#b497cf] active:scale-[0.98]"
        >
          <span>{open ? "Hide Roster" : "View Roster"}</span>
          {open ? <ChevronUpIcon className="w-3.5 h-3.5" /> : <ChevronDownIcon className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-[#16181d] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8e95a2] uppercase font-bold">Lead:</span>
          <span className="font-bold text-[#f4f5f7]">{team.coordinator.name}</span>
          <span className="text-[10px] font-mono text-[#b497cf] font-semibold">({team.coordinator.role})</span>
        </div>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-[#16181d] space-y-0.5">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#b497cf] font-bold mb-2">
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
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 sm:px-6 border-t border-[#1f2228] overflow-x-clip"
      aria-labelledby="team-title"
    >
      <SectionHeader
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
              <div className="border border-[#1f2228] bg-[#111317] p-5 flex items-center gap-4 transition-all hover:border-[#b497cf]/60 hover:shadow-xl hover:shadow-[#b497cf]/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#b497cf]/60 bg-[#090a0c] font-mono text-sm font-extrabold text-[#b497cf]">
                  {initials(lead.name)}
                </div>
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#b497cf] bg-[#090a0c] px-2 py-0.5 border border-[#1f2228] mb-1">
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
          <div className="flex flex-col gap-4 border-b border-[#1f2228] pb-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b497cf] font-bold">
                  Departmental Teams
                </span>
                <h3 className="mt-1 text-2xl font-extrabold text-[#f4f5f7] tracking-tight">
                  Core Operations
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8e95a2]">
                {filter === "all" ? "Horizontal Auto-Carousel View" : `Category: ${filteredTeams[0]?.label}`}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex overflow-x-auto no-scrollbar scroll-touch gap-1.5 pb-1 pt-1 w-full max-w-full">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`shrink-0 px-3.5 py-1.5 text-[10px] font-mono uppercase font-bold transition-all border ${
                  filter === "all"
                    ? "bg-[#b497cf] border-[#b497cf] text-[#090a0c] shadow-md shadow-[#b497cf]/20"
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
                  className={`shrink-0 px-3.5 py-1.5 text-[10px] font-mono uppercase font-bold transition-all border ${
                    filter === t.id
                      ? "bg-[#b497cf] border-[#b497cf] text-[#090a0c] shadow-md shadow-[#b497cf]/20"
                      : "bg-[#111317] border-[#2b2f38] text-[#8e95a2] hover:text-[#f4f5f7] hover:border-[#8e95a2]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

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
                className="inline-flex items-center gap-2 border border-[#2b2f38] bg-[#111317] px-5 py-2.5 text-xs font-mono font-bold text-[#b497cf] uppercase hover:border-[#b497cf] transition-all active:scale-95"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to All Teams Carousel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recruitment Callout */}
      <Reveal delay={160} className="mt-10">
        <div className="border border-dashed border-[#2b2f38] bg-[#111317]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-extrabold text-[#f4f5f7]">Open Member Positions</h4>
            <p className="mt-1 text-xs text-[#8e95a2]">
              Applications open for technical, creative, and event operations roles.
            </p>
          </div>
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 shrink-0 bg-[#b497cf] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#090a0c] transition-all hover:bg-[#c4a5e6] active:scale-[0.98]"
          >
            <span>Apply for Slot</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}