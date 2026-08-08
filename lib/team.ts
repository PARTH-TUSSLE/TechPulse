export interface Member {
  id: string;
  role: string;
  name: string;
  phone?: string;
  team?: string;
  bio: string;
  lead?: boolean;
}

export const team: Member[] = [
  {
    id: "president",
    role: "Student President / Club Coordinator",
    name: "Yash Sharma",
    phone: "7717406601",
    bio: "Leads the student body, coordinates with the faculty in-charge, assigns responsibilities, conducts meetings, and monitors the progress of all teams.",
    lead: true,
  },
  {
    id: "vp",
    role: "Vice President / Deputy Club Coordinator",
    name: "Yash Verma",
    phone: "9855421527",
    bio: "Supports the President in planning and managing activities, supervises coordinators, ensures smooth coordination between teams, and leads the club in the President's absence.",
    lead: true,
  },
  {
    id: "technical",
    role: "Technical Coordinator",
    name: "Parth Gartan",
    phone: "9991451446",
    team: "Aryan Dev",
    bio: "Handles the technical requirements of workshops, hackathons, coding competitions, project exhibitions, software installations, and connectivity.",
  },
  {
    id: "social-media",
    role: "Social Media Coordinator",
    name: "Aditya Kumar",
    phone: "9779333967",
    team: "Shivam Yadav",
    bio: "Manages the club's social media handles and publishes photographs, videos, reels, event announcements, achievements, and activity highlights.",
  },
  {
    id: "design",
    role: "Design & Creative Coordinator",
    name: "Darshi",
    phone: "8146422208",
    bio: "Creates posters, banners, certificates, invitation cards, presentation templates, and other promotional material.",
  },
  {
    id: "photography",
    role: "Photography & Videography Coordinator",
    name: "Goranshu",
    phone: "8437517289",
    bio: "Captures photographs and videos during activities, edits event highlights, organizes media files, and feeds content to the social media team.",
  },
  {
    id: "discipline",
    role: "Discipline & Volunteer Coordinator",
    name: "Vishal Nath",
    phone: "8133988099",
    team: "Ishpreet",
    bio: "Maintains discipline during events, manages entry and seating, forms volunteer teams, and ensures smooth movement of participants.",
  },
  {
    id: "pr",
    role: "Public Relations & Outreach Coordinator",
    name: "Siya",
    phone: "7710390605",
    bio: "Promotes activities among students, coordinates with other clubs and departments, invites participants, and builds external collaborations.",
  },
  {
    id: "logistics",
    role: "Logistics & Hospitality Coordinator",
    name: "",
    bio: "Arranges venues, seating, equipment, refreshments, guest reception, mementos, stationery and registration desks.",
    // name intentionally empty — seat awaiting its coordinator
  },
  {
    id: "documentation",
    role: "Documentation & Content Coordinator",
    name: "Dronacharya",
    phone: "8453047259",
    bio: "Prepares event reports, notices, speaker introductions, press notes, attendance records, and meeting documentation.",
  },
  {
    id: "event-planning",
    role: "Event Planning Coordinator",
    name: "Ritul Pruthi",
    phone: "8295997337",
    team: "Bhavishya Mamodiya",
    bio: "Plans expert talks, workshops, hackathons and competitions, prepares timelines, schedules and execution plans.",
  },
  {
    id: "marketing",
    role: "Marketing Coordinator",
    name: "Keshav Raina",
    phone: "826499179",
    bio: "Develops promotional strategies, identifies target audiences, plans campaigns and grows event participation and club visibility.",
  },
];