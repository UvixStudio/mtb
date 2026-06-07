# PRD — "Yuval's Journey" · Yuval Cohen Portfolio

## Original Problem Statement
Premium one-page portfolio for **Yuval Cohen — Creative Technologist, Creative Director & Producer (AI & 3D)**. Concept: a cinematic low-poly mountain-biking metaphor ("Yuval's Journey") where a 241-frame pre-rendered MTB ride is scrubbed to scroll, and each career milestone is a station along the trail. Tech: React + Tailwind + Framer Motion + Lenis. Gamified, smooth, low-poly mood (not hyper-real). Balanced palette: dark navy base + yellow brand accent + 4 checkpoint colors (yellow/purple/cyan/green).

## User Personas
- **Recruiters / hiring managers / brands** evaluating Yuval as a senior creative leader — need a "wow", professional, clear showcase of skills, experience and projects.

## Architecture (done)
- **Frontend-only** (React, no backend). Contact via modal that builds a `mailto:` to yuval@uvixstudio.com (popup-blocker safe). CV served as static `/Yuval-Cohen-CV.pdf`.
- 241 ride frames in `/public/ride/`, project images in `/public/projects/`, pedal/shoe icons in `/public/icons/`.
- Fonts: Unbounded (display) + Manrope (body). Design tokens in `index.css` + `tailwind.config.js`.

## Implemented (2026-06-07)
- **Cinematic Ride**: sticky canvas, 241 frames scrubbed across scroll; clean hero overlay (floating checkpoint cards removed in redesign).

### Redesign v2 (2026-06-07) — "Continuous Trail World"
Client (Creative Director) feedback: below the hero the site looked like a generic AI site, too colorful, projects were a boring grid with no link to the trail/nature. Reworked so the WHOLE page stays in the low-poly mountain-trail world:
- New **TrailBand** component: each section is full-bleed with a hand-picked ride frame as a parallax background (About=frame20 forest, Experience=100 bridge, Tools/AI=160 river/canyon, Works=200 downhill, Connect=241 trailhead) + dark scrims for legibility.
- **About** capabilities → sporty **hexagon badges** (white/yellow solid icons) on a dashed skill-trail.
- **Experience** → **wooden signposts** on a vertical trail line.
- **Tools/AI** → glowing cyan crystal nodes + toned-down marquees.
- **Selected Works** → **parallax 'trail marker' cards** (3 columns, scroll-offset) instead of a flat grid.
- **Connect** → campfire trailhead band.
- Palette toned down to near-black + yellow dominant; checkpoint colors used sparingly. Verified: iteration_2 100% pass, zero console/runtime errors, mobile no overflow.
- **Hero**: "Hi! I'm Yuval Cohen", slot-machine rotating roles, tagline, **Download CV** + **Let's Talk** CTAs, animated "Let's Ride!" pedal SVG.
- **Floating Journey panel** (desktop) with flags, fill track + wireframe mountain progress; slim top progress bar on mobile.
- **About** (bio, quote, animated stat count-ups, 5 capability nodes), **Experience** (4 milestone stations on a trail line), **AI & Innovation / Tools** (dual marquees of real tools), **Selected Works** (asymmetric bento, 9 real projects, hover reveal), **Connect** (campfire CTA + contact modal).
- All content pulled from CV + portfolio deck (real roles, projects, tools, contact). Responsive desktop + mobile. Lint clean; testing agent: 100% of critical flows, no runtime/console errors.

## Backlog / Next
- **P1**: Replace placeholder project visuals (Beit Ha'Gefen, Digitel TLV, Ten Li Rock'n'Roll, Baboon of Jafa, RPSLS) with real assets when user shares them; add per-project detail/lightbox.
- **P1**: Real logo wall of collaborated companies/clients (Amazon, LEGO, New York Lottery, Playtech, Amdocs, Kaltura…).
- **P2**: Optional working contact form via backend/email (currently mailto). Add OG/meta + favicon, sitemap, analytics goals.
- **P2**: Further tune scroll-frame sync points and add subtle parallax/dust particles in hero.

## Notes
- Contact is **mailto-based (no backend email send)** by design choice.
