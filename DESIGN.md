---
name: TechPulse
description: Midnight terminal aesthetic for the CSE student club — ink-dark surfaces, one lavender signal, mono spec-sheet labels.
colors:
  primary: "#b497cf"
  glow: "#a8e08f"
  ink: "#120d1c"
  surface: "#1b1531"
  surface-hover: "#241c40"
  surface-border: "#2c2345"
  hairline: "#26203f"
  edge: "#3a3155"
  mist: "#f4f5f7"
  muted: "#a79fbd"
  faint: "#7c7192"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  serif-accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  none: "0px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-accent:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "24px"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: "4px 0px"
  nav-link-active:
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "4px 0px"
  chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
---

# Design System: TechPulse

## Overview

**Creative North Star: "The Midnight Terminal"**

Every surface of TechPulse reads like a terminal session left running at midnight: a deep-violet phosphor canvas, hairline-ruled panes, and a single lavender signal color that behaves like a live cursor — present, precise, and never decorative. A light green heartbeat threads through the live indicators — the pulse dot, SYS.ONLINE, the blinking cursor block — so the page feels alive and soulful, not static chrome. The system is a technical spec-sheet dressed as a club site: field numbers, mono uppercase labels, dotted indicators, and ruled borders that separate information the way code comments separate sections.

Density is comfortable but disciplined. Layout is sharp-cornered and rectilinear — no rounding, no gradients-as-decoration, no drop-shadow theater. Depth comes from tonal layering (ink → surface → surface-hover) and from hairline borders, not from elevation. The one serif voice (Instrument Serif, italic) is reserved for editorial moments — the tagline and the quote — a deliberate counter-voice to the industrial sans, used rarely so it stays surprising. The lavender accent is the single live signal: the pulse dot, the active nav marker, the stat counter, the current carousel slide. Everything else stays in the neutral ramp so that lavender always means "now / live / selected / here."

The visual grammar is obsessed with the number and the label: `01 / BETTERMENT`, `EST. 2026`, `03 CORE PILLARS`, `09 TEAMS`. This is the voice of a club run like an engineering organization — capable, structured, and confident enough to state facts in print.

**Key Characteristics:**
- Deep-violet phosphor canvas (`#120d1c`) with hairline-ruled panels (`#2c2345` / `#26203f`).
- One lavender signal (`#b497cf`) for structural accent, lit by a light green heartbeat (`#a8e08f`) on live indicators.
- Sharp corners everywhere — radius is zero by doctrine.
- JetBrains Mono for every label, kicker, stat, and index; Space Grotesk for reading and display; Instrument Serif italic for rare editorial voice.
- Flat by default; shadow is a hover-state response, not an ambient condition.

## Colors

The palette is a two-signal system: a lavender structural accent against a deep-violet neutral ramp, lit by a light green heartbeat on live moments. No other hues exist; introducing them breaks the terminal metaphor.

### Primary
- **Live Lavender** (#b497cf): The structural signal. Section kickers and indices, active nav markers and active filter pills, stat numbers, event dates, speaker times and venues, the live carousel slide, accent buttons, and the focus ring. It means "now / live / selected / here." It sits on ink and surface but never floods a screen.

### Secondary
- **Light Green Heartbeat** (#a8e08f): The soul accent — reserved for live indicators that pulse: the pulse dot in the meta band, SYS.ONLINE, the blinking cursor block after the tagline and in stat cells, the carousel scroll cue, the marquee diamonds, and the footer status dot. Where lavender structures, green breathes. Use on tiny live elements only, never as a fill or a border.

### Neutral
- **Violet Ink** (#120d1c): The page and backdrop ground. Also the chip and inner-badge fill.
- **Deep Surface** (#1b1531): Panel and card fill — the standard "raised" step, a violet-tinged ink.
- **Surface Hover** (#241c40): Hover fill for interactive panels.
- **Hairline Border** (#2c2345): The standard 1px ruling that separates sections and panels.
- **Inner Hairline** (#26203f): The dimmer ruling used inside cards — subdivides rows, borders the stat grid, separates CTA bars.
- **Edge Tone** (#3a3155): Secondary borders — button outlines, dashed recruitment callout, avatar frames.
- **Phosphor Mist** (#f4f5f7): Primary text, headings, and the solid primary button.
- **Muted Signal** (#a79fbd): Body copy, meta labels, nav links at rest, and disabled hints — lavender-tinted so secondary text never reads as gray on the violet canvas.
- **Faint Trace** (#7c7192): The quietest text and placeholder tones.

### Named Rules
**The Two-Signal Rule.** Lavender structures, green breathes. Lavender marks the selected/structural signal; green marks only what is currently alive and pulsing. Both together cover ≤10% of any given screen — their rarity is the point.
**The No-Gradient Rule.** Backgrounds are flat fills; the only permitted gradients are the backdrop scrim and the ambient radial glows (lavender pillar, green under-glow), never decorative color ramps.
**The Ink Ground Rule.** Every color sits on ink or surface — lavender, green, mist, and muted are never used as page backgrounds, only as foreground signal, fills, and borders.

## Typography

**Display Font:** Space Grotesk (with ui-sans-serif / system-ui fallback)
**Body Font:** Space Grotesk (with ui-sans-serif / system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback)
**Editorial Accent Font:** Instrument Serif (with Georgia fallback)

**Character:** A technical, confident pairing — industrial grotesque for display and reading, engineering mono for labels and numbers, and one reserved italic serif that shows up only for the tagline and blockquote. The type system behaves like a spec sheet: every label is uppercase, tracked wide, and small; every stat is mono and heavy; every display is black-weight and tight-tracked.

### Hierarchy
- **Display** (900, `clamp(3rem, 7vw, 6rem)`, 0.95): The TechPulse hero wordmark and oversized section statements. Tracked tight (`-0.03em`), the "Pulse" portion lifts to Live Lavender with a soft glow.
- **Headline** (900, `clamp(1.875rem, 4vw, 3rem)`, 1): Section titles ("Capability Over Vanity", "Student Leadership & Teams", "Upcoming Workshops"). Tight tracking, black weight, leading-none.
- **Title** (700, `clamp(1.125rem, 2vw, 1.5rem)`, 1.2): Card titles, event names, team names.
- **Body** (400, 1rem, 1.6): Descriptive copy at `#a79fbd`, max width ~44ch (`max-w-xl`). Never full-bleed width.
- **Serif Accent** (400 italic, `clamp(1.5rem, 3vw, 2rem)`, 1.2): The hero tagline ("Curiosity → Engineering Excellence") and the Purpose blockquote. The only non-sans display moment.
- **Label** (700, 0.625rem, 1.4): All kickers, section categories, stat captions, tags, nav links, and button text. Uppercase, `letter-spacing: 0.1em`, JetBrains Mono. The system's signature voice.

### Named Rules
**The Mono Label Rule.** Any text that names, numbers, or categorizes is JetBrains Mono uppercase with wide tracking. If it reads like a label, it is set in mono. If it reads like a sentence, it is set in Space Grotesk.
**The Serif Rarity Rule.** Instrument Serif appears at most twice per page. It is the editorial exception, not a body voice.
**The Tight-Tracking Rule.** All sans display and headline text tracks tight (`-0.02em` to `-0.03em`) and sets leading to 1 or below. Air is added with margin, never with line-height.

## Layout

A single max-width container (`max-w-6xl`, 72rem) centers every section with `px-4`/`px-6` gutters. The page is a vertical stack of ruled sections, each separated by a full-width hairline top border (`border-t border-[#2c2345]`) — the terminal reads as one continuous document, not discrete pages.

The hero is a 12-column asymmetric grid: a 7-column left rail of stacked meta band / display headline / copy / CTA / stat strip, and a 5-column right rail holding the "Core Mandate" panel. Below it, Purpose uses a 3-column card grid, Team uses executive cards (2-col) plus a snap-scroll carousel (3 visible on desktop), Events is a vertical list of full-width spec rows, and Join Us is a single ruled panel.

The spacing rhythm is small-unit and consistent: `py-12 sm:py-16` section padding, `gap-5` card grids, `space-y-5` event rows. Responsive behavior is additive — grids collapse from multi-column to single on mobile (`lg:grid-cols-12` → `grid-cols-1`), the carousel becomes a single-card snap view, and mobile navigation moves to a full overlay drawer. Scroll reveals are a gentle 12px translate + fade at 0.5s with a spring-like easing; they respect `prefers-reduced-motion`.

**The Ruled-Document Rule.** Every major section is separated by a full-width hairline and shares the same 72rem measure. Vertical rhythm comes from rules and consistent padding, not from scattered backgrounds.

## Elevation & Depth

The system is flat by default. Depth is conveyed through tonal layering (ink → surface → surface-hover) and hairline borders, not shadow. Shadows exist only as a hover-state response or a deliberate emphasis device:

- Cards at rest: flat, hairline-bordered. On hover they deepen a border to lavender (`hover:border-[#b497cf]/50`) and gain a faint lavender wash (`hover:shadow-xl hover:shadow-[#b497cf]/5`).
- The hero "Core Mandate" panel and primary buttons carry a resting shadow (`shadow-2xl shadow-black/70`, `shadow-xl shadow-white/10`) as their stated emphasis — the few elements allowed to sit slightly above the page.
- Accent buttons and active pills carry a tight lavender glow (`shadow-lg shadow-[#b497cf]/20`) to reinforce the "live" reading.
- The navbar gains `backdrop-blur-xl` and `shadow-black/40` once scrolled — the only blurred surface, reserved for the fixed chrome.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, active, emphasis) — never as ambient page furniture.

## Shapes

Sharp by doctrine. Every corner is square — radius is zero across buttons, cards, panels, chips, badges, inputs, and the navbar. The only rounded shapes in the system are the tiny signal dots (`h-1.5 w-1.5 rounded-full`) — the pulse indicator, the nav marker, the section kicker dot, the footer status dot — which are round precisely because everything else is square.

Borders are 1px hairlines at `#2c2345` (section/panel level) or `#26203f` (inner subdivisions). Button frames use `#3a3155`. Focus is a 2px lavender outline with 3px offset. The recurring silhouette is the numbered spec row: an index (mono lavender), a rule, content, and a trailing label — the unit of the whole system.

**The Zero-Radius Rule.** Nothing is rounded except signal dots. Radius is 0 by default; adding any corner rounding breaks the terminal metaphor.
**The Hairline Rule.** Structure is drawn with 1px borders, never with background contrast alone.

## Components

### Buttons
- **Shape:** Square (0 radius). `text-xs font-bold uppercase tracking-wider`, mono labels. `px-7 py-3.5` (primary), `px-7 py-3` (secondary).
- **Primary (mist):** `#f4f5f7` fill, `#120d1c` text, `shadow-xl shadow-white/10`. Hover `#ffffff`. Represents the confident forward action ("Upcoming Workshops", "Feedback Form").
- **Accent (lavender):** `#b497cf` fill, ink text, `shadow-lg shadow-[#b497cf]/20`. Hover `#c4a5e6`. Represents the join/apply action — the structural signal inviting membership.
- **Secondary:** `#1b1531` fill, `#3a3155` border, mist text. Hover border and text lift to lavender. The measured, secondary action.
- **Active / Focus:** `active:scale-[0.98]` press feedback; `:focus-visible` 2px lavender outline + 3px offset.

### Chips & Tags
- **Style:** Ink fill (`#120d1c`), 1px hairline border, mono uppercase `text-[10px] font-bold`, lavender text. Used for event highlights and meta labels.
- **Filter pills:** Inactive — surface fill, `#3a3155` border, muted text. Active — lavender fill, ink text, lavender glow. The active pill is always the lavender one.

### Cards / Containers
- **Corner Style:** Square (0 radius).
- **Background:** `#1b1531` at ~95% opacity (sits on ink); inner sub-panels use `#120d1c`.
- **Shadow Strategy:** Flat at rest (see Elevation). Hover: border to lavender, faint lavender wash.
- **Border:** 1px `#2c2345`; inner subdivides at `#26203f`.
- **Internal Padding:** `p-5` to `p-7` (20–28px), matching the small-unit rhythm.

### Navigation
- **Style:** Fixed top chrome, transparent at rest, on scroll gains hairline bottom border + `backdrop-blur-xl` over `#120d1c/95`.
- **Typography:** Mono uppercase `text-[11px] tracking-wider`; active links are mist with a lavender dot, rest are muted.
- **Mobile:** A full overlay drawer (`max-h` transition) with numbered rows (`01`, `02`, `03`…), a status header, and a lavender "Apply for Slot" action at the bottom.

### Signature Component: The Spec Row
The unit of the system — a ruled row or panel built from three parts: a lavender mono index (`01 /`), a bold title, and trailing mono metadata. Seen in the Core Mandate panel, stat counters, event rows, member rows, and the carousel control bar. Numbered, labeled, and absolutely precise — the club's operational character made visible.

## Do's and Don'ts

### Do:
- **Do** set every label, kicker, index, stat, and button in JetBrains Mono uppercase with wide tracking — it is the signature voice.
- **Do** use lavender for live/active/selected only — pulse dots, current slide, active nav, stat numbers, section kickers, accent CTAs.
- **Do** keep every corner at radius 0.
- **Do** use 1px hairlines (`#2c2345` / `#26203f`) to structure space.
- **Do** keep surfaces flat at rest; introduce shadow only on hover or for stated emphasis.
- **Do** use Instrument Serif italic sparingly — the tagline and one quote per page.
- **Do** respect `prefers-reduced-motion` (reduced: no animation, no reveal transforms).

### Don't:
- **Don't** introduce a third accent hue — lavender structures, green breathes, and that is the whole signal strategy.
- **Don't** round corners on buttons, cards, panels, or inputs.
- **Don't** use lavender as a background fill beyond button/chip/pill forms.
- **Don't** add ambient drop shadows to resting cards.
- **Don't** use gradients for decoration — only the backdrop contrast scrim is permitted.
- **Don't** set body copy wider than `max-w-xl` (36rem).
- **Don't** render the serif voice in more than two places on a page.