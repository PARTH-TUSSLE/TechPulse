import { club, developer } from "@/lib/club";
import { ExternalLinkIcon } from "@/components/Icons";

const socialLinks = [
  { label: "GitHub", href: developer.socials.github },
  { label: "X (Twitter)", href: developer.socials.x },
  { label: "LinkedIn", href: developer.socials.linkedin },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1f2228] bg-[#090a0c] w-full max-w-full overflow-x-clip">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center border border-[#2b2f38] bg-[#111317] text-[10px] font-bold text-[#b497cf]">
                TP
              </span>
              <span className="font-sans text-sm font-bold tracking-tight text-[#f4f5f7]">
                TechPulse
              </span>
            </div>
            <p className="text-xs text-[#8e95a2] leading-relaxed max-w-xs">
              Student activity club of the Department of Computer Science & Engineering, {club.college}, {club.location}.
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a2] block font-semibold">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs font-mono uppercase">
              <li>
                <a href="#home" className="text-[#8e95a2] hover:text-[#f4f5f7] transition-colors">
                  01 / Home
                </a>
              </li>
              <li>
                <a href="#purpose" className="text-[#8e95a2] hover:text-[#f4f5f7] transition-colors">
                  02 / Philosophy
                </a>
              </li>
              <li>
                <a href="#team" className="text-[#8e95a2] hover:text-[#f4f5f7] transition-colors">
                  03 / Team Roster
                </a>
              </li>
              <li>
                <a href="#events" className="text-[#8e95a2] hover:text-[#f4f5f7] transition-colors">
                  04 / Events
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Col */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a2] block font-semibold">
              Designed & Developed By
            </span>
            <p className="text-xs font-semibold text-[#f4f5f7]">
              {developer.name}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#2b2f38] bg-[#111317] px-2.5 py-1 text-[10px] font-mono text-[#8e95a2] transition-colors hover:border-[#b497cf] hover:text-[#f4f5f7]"
                >
                  <span>{link.label}</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#1f2228] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-[#8e95a2] text-center sm:text-left">
          <span>
            &copy; {new Date().getFullYear()} {club.name} &middot; {club.school}
          </span>
          <span className="flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b497cf] shrink-0" />
            Dept. of CSE &middot; CGC University
          </span>
        </div>
      </div>
    </footer>
  );
}