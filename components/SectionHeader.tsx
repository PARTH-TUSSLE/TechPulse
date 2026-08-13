import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  category?: string;
  path?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ category, path, title, lede, align = "left" }: SectionHeaderProps) {
  const label = category || (path ? path.replace(/^\//, "").toUpperCase() : "");

  return (
    <Reveal className={`mb-6 sm:mb-8 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {label ? (
        <div className={`flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#8e95a2] uppercase mb-1.5 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#b497cf]" />
          <span>{label}</span>
        </div>
      ) : null}
      
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[#f4f5f7] sm:text-3xl md:text-4xl leading-tight">
        {title}
      </h2>
      
      {lede ? (
        <p className={`mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-[#8e95a2] ${align === "center" ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}