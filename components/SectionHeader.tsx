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
    <Reveal className={`mb-6 sm:mb-10 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {label ? (
        <div className={`flex items-center gap-2 text-xs font-mono tracking-widest text-[#b497cf] font-bold uppercase mb-2 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#b497cf]" />
          <span>{label}</span>
        </div>
      ) : null}
      
      <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#f4f5f7] leading-none">
        {title}
      </h2>
      
      {lede ? (
        <p className={`mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-[#8e95a2] ${align === "center" ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}