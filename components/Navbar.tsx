"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/club";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "team", "events"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-panel/60 font-display text-sm font-semibold text-signal transition-colors group-hover:border-signal/60">
            TP
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-tight text-mist">TechPulse</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              CSE · Block 3
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-current={!external && active === item.href ? "true" : undefined}
                className={`relative rounded-md px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  !external && active === item.href
                    ? "text-signal"
                    : "text-muted hover:text-mist"
                }`}
              >
                {item.label}
                {external ? (
                  <span className="ml-1.5 inline-block text-signal/70">↗</span>
                ) : null}
                {!external ? (
                  <span
                    className={`absolute inset-x-4 -bottom-px h-px bg-signal transition-opacity duration-300 ${
                      active === item.href ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-panel text-mist transition-colors hover:text-signal sm:hidden"
        >
          <span className="relative flex h-3.5 w-5 flex-col justify-between">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-full bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-line bg-ink transition-[max-height] duration-300 ease-out sm:hidden ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-5 py-4">
          {nav.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-md px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${
                  !external && active === item.href
                    ? "bg-panel text-signal"
                    : "text-muted hover:text-mist"
                }`}
              >
                {item.label}
                {external ? (
                  <span className="text-signal/70" aria-hidden>
                    ↗
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}