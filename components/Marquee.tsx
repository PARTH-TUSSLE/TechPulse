const items = [
  "Est. 2026",
  "CSE Block 3",
  "CCE · CGC University",
  "Betterment",
  "Exposure",
  "Guidance",
  "09 Teams",
  "100% Student-Led",
  "Mohali, Punjab",
  "Capability Over Vanity",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="tp-marquee relative w-full overflow-hidden border-y border-[#2c2345] bg-[#120d1c]/90 py-3"
      role="presentation"
    >
      <div className="tp-marquee-track items-center">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-3 font-mono text-[11px] uppercase tracking-widest text-[#7c7192]"
          >
            <span>{item}</span>
            <span className="text-[#3a3155]" aria-hidden>
              &#9670;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}