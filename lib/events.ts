export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  speaker: string;
  audience: string;
  why: string;
  highlights: string[];
  register?: string;
}

export const events: Event[] = [
  {
    id: "cryptography",
    title: "Expert Talk on Mathematical Foundation & Cryptography",
    type: "Expert Talk",
    date: "2026-08-22",
    day: "22",
    month: "AUG",
    time: "09:30 AM – 01:30 PM",
    venue: "Lab No. 411 · Block 3, CSE",
    speaker: "Dr. Puneet K Pal · Assistant Professor, Lingaya's Vidyapeeth, Faridabad",
    audience: "B.Tech CSE-CYS-BC · 5th & 3rd sem · 60–80 students",
    why: "Put the mathematics under encryption, hashing and digital signatures to work in real cybersecurity.",
    highlights: [
      "Number theory & modular arithmetic",
      "Encryption & hashing in practice",
      "Digital signatures & key management",
      "Real-world attacks & career paths",
    ],
    register: "https://forms.gle/W3VvqoadN7kKNkTt9",
  },
  {
    id: "python",
    title: "Hands-on Workshop on Python Fundamentals",
    type: "Hands-on Workshop",
    date: "2026-08-23",
    day: "23",
    month: "AUG",
    time: "10:00 AM – 12:00 PM · 02:00 PM – 04:00 PM",
    venue: "Lab No. 608 (Computer Lab) · Block 3, CSE",
    audience: "B.Tech CSE-CYS-BC · 5th sem · 60–80 students",
    speaker: "Dr. Jagriti Saini — Industry Expert, Eternal Restem",
    why: "Go from reading syntax to solving real problems — loops, logic and debugging, hands-on.",
    highlights: [
      "Python syntax & control flow",
      "Loops & logic building",
      "Debugging like a pro",
      "Industry problem-solving practice",
    ],
    register: "https://forms.gle/JKndZC8i4XFrRNBM9",
  },
];