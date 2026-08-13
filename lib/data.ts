export interface Member {
  /** Roster rank, encodes hierarchy (01 = President). */
  rank: string;
  name: string;
  role: string;
  duties: string;
  deputy?: string;
  open?: boolean;
}

export interface ClubEvent {
  id: string;
  kicker: string;
  title: string;
  why: string;
  speaker: string;
  speakerNote?: string;
  day: string;
  month: string;
  year: string;
  time: string[];
  venue: string;
  seats: string;
  formUrl: string;
}

export const club = {
  name: "TechPulse",
  parent: "CCE · Department of CSE · Block 3",
  college: "CGC University, Mohali",
  tagline:
    "The student activity club of the CSE Department — a platform for betterment, exposure and guidance, so students can build, ship, and stand out.",
};

export const mission = [
  {
    title: "Betterment",
    body: "Hands-on workshops, labs and build sessions that raise your baseline — not just your attendance record.",
  },
  {
    title: "Exposure",
    body: "Industry experts, campus speakers and cross-department events that widen the view beyond the syllabus.",
  },
  {
    title: "Guidance",
    body: "A structured team of student leads and faculty mentors who help you find your lane and stay on it.",
  },
];

export const team: Member[] = [
  {
    rank: "01",
    name: "Yash Sharma",
    role: "Student President · Club Coordinator",
    duties:
      "Leads the student body of the club, coordinates with the faculty in-charge, assigns responsibilities, conducts meetings, and monitors the progress of every team.",
  },
  {
    rank: "02",
    name: "Yash Verma",
    role: "Vice President · Deputy Coordinator",
    duties:
      "Supports planning and management, supervises all coordinators, resolves operational issues, and leads the club in the President's absence.",
  },
  {
    rank: "03",
    name: "Parth Gartan",
    role: "Technical Coordinator",
    deputy: "Aryan Dev",
    duties:
      "Handles technical requirements of workshops, hackathons, coding competitions, project exhibitions, software installations and on-ground support.",
  },
  {
    rank: "04",
    name: "Aditya Kumar",
    role: "Social Media Coordinator",
    deputy: "Shivam Yadav",
    duties:
      "Manages the club's social accounts — photographs, videos, reels, event announcements, achievements and activity highlights.",
  },
  {
    rank: "05",
    name: "Darshi",
    role: "Design & Creative Coordinator",
    duties:
      "Creates posters, banners, certificates, invitation cards, presentation templates and social media graphics.",
  },
  {
    rank: "06",
    name: "Goranshu",
    role: "Photography & Videography Coordinator",
    duties:
      "Captures photographs and videos during activities, produces event highlight reels, and organizes media for the social team.",
  },
  {
    rank: "07",
    name: "Vishal Nath",
    role: "Discipline & Volunteer Coordinator",
    deputy: "Ishpreet",
    duties:
      "Maintains discipline during events, manages entry and seating, forms volunteer teams, and assigns duties.",
  },
  {
    rank: "08",
    name: "Siya",
    role: "PR & Outreach Coordinator",
    duties:
      "Promotes activities among students, connects with other clubs and departments, invites participants, and builds external collaborations.",
  },
  {
    rank: "09",
    name: "Open seat",
    role: "Logistics & Hospitality Coordinator",
    open: true,
    duties:
      "Arranges venues, seating, equipment, refreshments, guest reception, stationery and registration desks.",
  },
  {
    rank: "10",
    name: "Dronacharya",
    role: "Documentation & Content Coordinator",
    duties:
      "Prepares event reports, notices, speaker introductions, attendance records, feedback summaries and meeting minutes.",
  },
  {
    rank: "11",
    name: "Ritul Pruthi",
    role: "Events Planning Coordinator",
    deputy: "Bhavishya Mamodiya",
    duties:
      "Plans expert talks, workshops, hackathons and competitions; owns timelines, schedules, task lists and execution plans.",
  },
];

export const events: ClubEvent[] = [
  {
    id: "cryptography",
    kicker: "Expert Talk",
    title: "Mathematical Foundation & Cryptography",
    why: "The maths beneath encryption, hashing, digital signatures and key management — and how it plays out in real security systems.",
    speaker: "Dr. Puneet K Pal",
    speakerNote: "Assistant Professor, Lingaya's Vidyapeeth",
    day: "22",
    month: "AUG",
    year: "2026",
    time: ["09:30 AM – 01:30 PM"],
    venue: "Block-3 · Lab No. 411 · Dept. of CSE",
    seats: "60–80 seats",
    formUrl: "https://forms.gle/W3VvqoadN7kKNkTt9",
  },
  {
    id: "python",
    kicker: "Hands-on Workshop",
    title: "Python Fundamentals for Effective Problem Solving",
    why: "Loops, control flow and real debugging habits — write, run and break programs until they work.",
    speaker: "Dr. Jagriti Saini",
    speakerNote: "Industry Expert · Eternal Restem",
    day: "23",
    month: "AUG",
    year: "2026",
    time: ["10:00 AM – 12:00 PM", "02:00 PM – 04:00 PM"],
    venue: "Block-3 · Lab No. 608 (Computer Lab) · Dept. of CSE",
    seats: "60–80 seats",
    formUrl: "https://forms.gle/JKndZC8i4XFrRNBM9",
  },
];
