import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  category?: string;
  path?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  index?: string;
}

export default function SectionHeader({ category, path, title, lede, align = "left", index }: SectionHeaderProps) {
  const label = category || (path ? path.replace(/^\//, "").toUpperCase() : "");

  return (
    <Reveal className={`mb-6 sm:mb-10 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {/* Index + rule line */}
      <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        {index ? (
          <span className="font-mono text-xs font-black text-[#b497cf] tracking-widest">{index}</span>
        ) : null}
        <span className="h-px w-10 bg-[#b497cf]/50" aria-hidden />
        {label ? (
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#a79fbd] font-bold">
            {label}
          </span>
        ) : null}
        <span className={`h-px ${label || index ? "flex-1" : "w-10"} bg-[#2c2345]`} aria-hidden />
      </div>

      <h2
        className={`mt-4 font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] text-[#f4f5f7] leading-[0.95] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>

      {lede ? (
        <p className={`mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#a79fbd] ${align === "center" ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}