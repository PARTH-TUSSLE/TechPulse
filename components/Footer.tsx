import { club, developer } from "@/lib/club";

const socialLinks = [
  { label: "Github", href: developer.socials.github },
  { label: "X", href: developer.socials.x },
  { label: "LinkedIn", href: developer.socials.linkedin },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-panel font-display text-sm font-semibold text-signal">
                TP
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-mist">
                TechPulse
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The student tech club of {club.school}, working under {club.college}, {club.location}.
              Built by students, for students — from betterment to the first job.
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted">
              Navigate
            </span>
            <a href="#home" className="font-mono text-sm text-muted transition-colors hover:text-signal">
              Home
            </a>
            <a href="#team" className="font-mono text-sm text-muted transition-colors hover:text-signal">
              Team
            </a>
            <a href="#events" className="font-mono text-sm text-muted transition-colors hover:text-signal">
              Events
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted">
              Reach us
            </span>
            <p className="font-mono text-sm leading-relaxed text-muted">
              {club.school}
              <br />
              {club.college}, {club.location}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-muted">
              Developed &amp; designed
            </span>
            <p className="font-display text-sm font-semibold tracking-tight text-mist">
              {developer.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-xs tracking-wider text-muted transition-colors hover:border-signal/50 hover:text-signal"
                >
                  {link.label}
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-muted">
            © {new Date().getFullYear()} {club.name} · {club.school}
          </p>
          <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            The pulse stays on
          </p>
        </div>
      </div>
    </footer>
  );
}