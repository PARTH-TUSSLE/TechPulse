"use client";

import { useEffect, useState } from "react";
import { nav, joinUrl, club } from "@/lib/club";
import { ExternalLinkIcon, ArrowRightIcon } from "@/components/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "purpose", "team", "events"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 w-full max-w-full ${
        scrolled || open
          ? "border-b border-[#1f2228] bg-[#090a0c]/95 backdrop-blur-xl py-3 shadow-2xl shadow-black/40"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-5 lg:px-6" aria-label="Main Navigation">
        {/* Brand identity */}
        <a href="#home" className="group flex items-center gap-2.5 min-w-0" onClick={() => setOpen(false)}>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#2b2f38] bg-[#111317] text-xs font-bold tracking-wider text-[#b497cf] transition-all group-hover:border-[#b497cf] group-hover:shadow-md group-hover:shadow-[#b497cf]/20">
            TP
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold tracking-tight text-[#f4f5f7] group-hover:text-[#ffffff] transition-colors truncate">
              TechPulse
            </span>
            <span className="text-[9px] font-mono tracking-wider text-[#8e95a2] uppercase truncate">
              Dept. of CSE &middot; Block 3
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 sm:flex">
          {nav.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isActive = !isExternal && active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-[11px] font-mono tracking-wider uppercase transition-all py-1 ${
                  isActive
                    ? "font-semibold text-[#f4f5f7]"
                    : "text-[#8e95a2] hover:text-[#f4f5f7]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#b497cf]" />}
                  <span>{item.label}</span>
                  {isExternal && <ExternalLinkIcon className="w-3 h-3 text-[#8e95a2]" />}
                </span>
              </a>
            );
          })}
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={`flex h-9 w-9 items-center justify-center border transition-all active:scale-95 sm:hidden shrink-0 ${
            open
              ? "border-[#b497cf] bg-[#111317] text-[#b497cf] shadow-lg shadow-[#b497cf]/20"
              : "border-[#2b2f38] bg-[#111317] text-[#f4f5f7] hover:border-[#b497cf]"
          }`}
        >
          <span className="relative flex h-3.5 w-4 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 origin-center ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 origin-center ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`overflow-hidden border-t border-[#1f2228] bg-[#090a0c]/98 backdrop-blur-2xl transition-all duration-300 ease-out sm:hidden ${
          open ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 px-4 sm:px-5">
          {/* Header Status Bar */}
          <div className="flex items-center justify-between border-b border-[#16181d] pb-3 text-[10px] font-mono tracking-widest text-[#8e95a2] uppercase">
            <span className="flex items-center gap-2 text-[#b497cf] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#b497cf] animate-pulse" />
              NAVIGATION
            </span>
            <span>{club.school}</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {nav.map((item, idx) => {
              const isExternal = item.href.startsWith("http");
              const isActive = !isExternal && active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between p-3 transition-all rounded-none border border-transparent active:scale-[0.98] ${
                    isActive
                      ? "bg-[#111317] border-[#b497cf]/60 border-l-4 border-l-[#b497cf] text-[#f4f5f7] shadow-md shadow-[#b497cf]/10"
                      : "bg-[#090a0c] border-[#16181d] text-[#8e95a2] hover:text-[#f4f5f7] hover:border-[#2b2f38]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#b497cf] font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-base font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </div>

                  <span className="font-mono text-xs flex items-center">
                    {isExternal ? (
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-[#b497cf]" />
                    ) : isActive ? (
                      <span className="h-2 w-2 rounded-full bg-[#b497cf]" />
                    ) : (
                      <ArrowRightIcon className="w-3.5 h-3.5 text-[#8e95a2]" />
                    )}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Bottom Action Footer inside Drawer */}
          <div className="mt-2 pt-4 border-t border-[#16181d] space-y-3">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#b497cf] py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#090a0c] shadow-lg shadow-[#b497cf]/20 transition-all hover:bg-[#c4a5e6] active:scale-[0.98]"
            >
              <span>Apply for Slot</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center justify-center text-[10px] font-mono text-[#8e95a2] pt-1">
              <span>EST. {club.est} &middot; {club.college}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}