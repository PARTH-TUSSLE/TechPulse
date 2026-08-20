import { club, developer } from "@/lib/club";
import { ExternalLinkIcon } from "@/components/Icons";
import Logo from "@/components/Logo";

const socialLinks = [
  { label: "GitHub", href: developer.socials.github },
  { label: "X (Twitter)", href: developer.socials.x },
  { label: "LinkedIn", href: developer.socials.linkedin },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#2c2345] bg-[#120d1c] w-full max-w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo
                className="h-11 w-11 object-contain"
                animated={false}
              />
              <span className="font-sans text-sm font-bold tracking-tight text-[#f4f5f7]">
                TechPulse
              </span>
            </div>
            <p className="text-xs text-[#a79fbd] leading-relaxed max-w-xs">
              Student activity club of the Department of Computer Science & Engineering, {club.college}, {club.location}.
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a79fbd] block font-semibold">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs font-mono uppercase">
              <li>
                <a href="#home" className="text-[#a79fbd] hover:text-[#f4f5f7] transition-colors">
                  01 / Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#a79fbd] hover:text-[#f4f5f7] transition-colors">
                  02 / About
                </a>
              </li>
              <li>
                <a href="#team" className="text-[#a79fbd] hover:text-[#f4f5f7] transition-colors">
                  03 / Team Roster
                </a>
              </li>
              <li>
                <a href="#events" className="text-[#a79fbd] hover:text-[#f4f5f7] transition-colors">
                  04 / Events
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Col */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a79fbd] block font-semibold">
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
                  className="inline-flex items-center gap-1.5 border border-[#3a3155] bg-[#1b1531] px-2.5 py-1 text-[10px] font-mono text-[#a79fbd] transition-colors hover:border-[#b497cf] hover:text-[#f4f5f7]"
                >
                  <span>{link.label}</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#2c2345] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-[#a79fbd] text-center sm:text-left">
          <span>
            &copy; {new Date().getFullYear()} {club.name} &middot; {club.school}
          </span>
          <span className="flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <span className="tp-heartbeat h-1.5 w-1.5 rounded-full bg-[#a8e08f] shrink-0" />
            Dept. of CSE &middot; CGC University
          </span>
        </div>
      </div>
    </footer>
  );
}