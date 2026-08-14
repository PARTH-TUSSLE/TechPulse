export interface TeamMember {
  id: string;
  name: string;
  role: string;
  lead?: boolean;
  placeholder?: boolean;
}

export interface Team {
  id: string;
  label: string;
  title: string;
  blurb: string;
  coordinator: TeamMember;
  members: TeamMember[];
}

const placeholderMembers = (teamId: string, role: string): TeamMember[] =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `${teamId}-slot-${i + 1}`,
    name: `Member ${i + 1}`,
    role,
    placeholder: true,
  }));

export const leadership: TeamMember[] = [
  {
    id: "president",
    name: "Yash Verma",
    role: "Student President · Club Coordinator",
    lead: true,
  },
  {
    id: "vp",
    name: "Parth Gartan",
    role: "Vice President · Technical Coordinator",
    lead: true,
  },
];

export const teams: Team[] = [
  {
    id: "technical",
    label: "Technical",
    title: "Technical Team",
    blurb: "Workshops, hackathons, installs and on-ground gear support.",
    coordinator: { id: "parth-gartan", name: "Parth Gartan", role: "Technical Coordinator" },
    members: placeholderMembers("technical", "Technical Member"),
  },
  {
    id: "social",
    label: "Social Media & Marketing",
    title: "Social Media & Marketing Team",
    blurb: "Reels, posts, captions and everything between the club and its audience.",
    coordinator: { id: "aditya-kumar", name: "Aditya Kumar", role: "Social Media Coordinator" },
    members: placeholderMembers("social", "Social Media Member"),
  },
  {
    id: "design",
    label: "Design",
    title: "Design & Creative Team",
    blurb: "Posters, banners, certificates and the look that makes events feel premium.",
    coordinator: { id: "darshi", name: "Darshi", role: "Design & Creative Coordinator" },
    members: placeholderMembers("design", "Design Member"),
  },
  {
    id: "photography",
    label: "Media",
    title: "Photography & Videography Team",
    blurb: "Photos, highlight reels and media coverage for every activity.",
    coordinator: { id: "goranshu", name: "Goranshu", role: "Photography Coordinator" },
    members: placeholderMembers("photography", "Media Member"),
  },
  {
    id: "discipline",
    label: "Discipline",
    title: "Discipline & Volunteer Team",
    blurb: "Entry, queues, seating and smooth ground coordination during events.",
    coordinator: { id: "vishal-nath", name: "Vishal Nath", role: "Discipline Coordinator" },
    members: placeholderMembers("discipline", "Volunteer Member"),
  },
  {
    id: "pr",
    label: "Outreach",
    title: "PR & Outreach Team",
    blurb: "Promotions across departments, invites and external collaborations.",
    coordinator: { id: "siya", name: "Siya", role: "PR & Outreach Coordinator" },
    members: placeholderMembers("pr", "Outreach Member"),
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Logistics & Hospitality Team",
    blurb: "Venues, seating, guests and welcome kits — the backbone of every event.",
    coordinator: { id: "logistics-lead", name: "Open seat", role: "Logistics Coordinator", placeholder: true },
    members: placeholderMembers("logistics", "Logistics Member"),
  },
  {
    id: "documentation",
    label: "Content",
    title: "Documentation & Content Team",
    blurb: "Event reports, notices, minutes and all the writing that matters.",
    coordinator: { id: "dronacharya", name: "Dronacharya", role: "Documentation Coordinator" },
    members: placeholderMembers("documentation", "Content Member"),
  },
  {
    id: "events",
    label: "Events",
    title: "Event Planning Team",
    blurb: "Expert talks, workshops and the timelines that take them to the stage.",
    coordinator: { id: "ritul-pruthi", name: "Ritul Pruthi", role: "Event Planning Coordinator" },
    members: placeholderMembers("events", "Events Member"),
  },
];