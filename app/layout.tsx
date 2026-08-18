import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechPulse — CCE (CSE-Block 3) Activity Club",
  description:
    "TechPulse is the student activity club of the Department of CSE, CCE, CGC University, Mohali. Workshops, expert talks and a community built for betterment, exposure and guidance.",
  keywords: [
    "TechPulse",
    "CCE",
    "CSE Block 3",
    "CGC University",
    "Mohali",
    "student club",
    "technical club",
  ],
  openGraph: {
    title: "TechPulse — CCE (CSE-Block 3) Activity Club",
    description:
      "The student technology community at CGC University turning curiosity into engineering excellence.",
    type: "website",
    siteName: "TechPulse",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-[#120d1c] text-[#f4f5f7] selection:bg-[#b497cf]/25 selection:text-[#ffffff]">
        {children}
      </body>
    </html>
  );
}