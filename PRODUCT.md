# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript. Single-page marketing site served at `localhost:3000` via `npm run dev`. Content is structured data in `lib/*.ts`; static build, no backend.

## Users

Primary: CSE students at CGC University, Mohali deciding whether to join the club — they scan the club's credibility, structure, and upcoming workshops, then apply through the join form. Secondary: current members/coordinators checking rosters and event logistics; faculty and university administration reviewing club activity.

## Product Purpose

TechPulse is the student activity club of the Department of CSE (CCE · CSE-Block 3) at CGC University, Mohali. The site's job is to recruit new members, establish that the club is a real, professionally run organization, and drive attendance to its workshops. Success is a visiting CSE student applying via the Google Form and showing up to sessions.

## Positioning

A capability-over-vanity engineering club: hands-on workshops and labs ("Betterment"), industry exposure beyond the syllabus ("Exposure"), and a structured team of student leads and faculty mentors ("Guidance"). The mechanism a neighboring club could not truthfully copy is the discipline of the structure itself — a 9-team departmental roster with named coordinators, real sessions with real speakers, and a stated mandate to build, ship, and stand out.

## Operating Context

University campus, CSE Block 3 (labs 411 and 608). Membership runs on a rolling basis through an official Google Form. Two flagship workshops in August 2026 anchor the current page: a cryptography expert talk (Dr. Puneet K Pal, 22 AUG, Lab 411) and a Python fundamentals hands-on workshop (Dr. Jagriti Saini, 23 AUG, Lab 608). Event registration happens through per-event forms; the logistics coordinator seat is open.

## Capabilities and Constraints

Static single-page site: fixed navbar, hero with stat counters, purpose pillars, executive leadership plus a 9-team roster carousel (snap-scroll, pause/play, filter pills, expandable rosters), upcoming-events list with speaker/time/venue/highlights and form links, join CTA, and footer. Content lives in `lib/club.ts`, `lib/data.ts`, `lib/team.ts`, `lib/events.ts` — all factual, must not be invented or altered without confirmation. Placeholder "Member N" slots and the open logistics seat are intentional placeholders awaiting real names. No backend, no CMS, no analytics. Reduced-motion and focus-visible styles already implemented.

## Brand Commitments

Name: TechPulse. College: CGC University, Mohali. Voice: capability-first, technical, spec-sheet precise — "betterment, exposure, guidance." No binding color/typography/style constraints; the incumbent dark + lavender world is evidence, not a commitment.

## Evidence on Hand

Real, verifiable content in the codebase: club identity (`lib/club.ts`), mission pillars and the August 2026 event line-up with named speakers and venues (`lib/data.ts`), leadership and team rosters (`lib/team.ts`), and the join/event Google Form URLs. Social links (GitHub, X, LinkedIn) of the developer, Parth Gartan. Testimonials, press, case studies, and photography do not exist and must not be fabricated.

## Product Principles

- Capability over vanity: substance, structure, and real engineering work outrank decoration.
- The structure is the brand: named coordinators, real rosters, and disciplined logistics are what make the club credible.
- Hands-on before attendance: value is measured in what members build, not seat counts.
- Student-led, faculty-backed: leadership is student-owned with mentorship as the support layer.
- Every claim must be true: content is real data in the codebase; nothing gets invented.