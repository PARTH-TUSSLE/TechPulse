import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  path: string;
  title: string;
  lede?: string;
}

export default function SectionHeader({ path, title, lede }: SectionHeaderProps) {
  return (
    <Reveal className="mb-14 sm:mb-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal sm:text-sm">
        <span className="text-muted">~/techpulse</span>
        <span className="text-lavender">{path}</span>
      </p>
      <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.05] tracking-tight text-mist sm:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
      ) : null}
    </Reveal>
  );
}