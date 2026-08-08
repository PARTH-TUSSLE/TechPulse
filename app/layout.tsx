import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechPulse — CCE (CSE-Block 3) Activity Club",
  description:
    "TechPulse is the student activity club of the Department of CSE, CCE, CGC University, Mohali. Workshops, expert talks and a community built to give students betterment, exposure and guidance.",
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
      "The girl-powered coding community at CGC University that turns curiosity into careers.",
    type: "website",
    siteName: "TechPulse",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}