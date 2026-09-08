# Education → Basic Economics (v1 plan)

Bookmarkable refresher pages for core econ ideas. People come back to re-learn a concept, or open a page on their phone to explain something fast. This is **not** a course: no accounts, no progress sync, no certificates.

**Status:** plan only. Do not ship a half-built education UI in this PR.

---

## Product intent

- Each lesson URL stands alone and is shareable / bookmarkable.
- Fast to scan on a phone. Plain language. Visual-first.
- One idea per page. One interactive per page. Three-bullet takeaway.
- Optional light `localStorage` for “last opened lesson” is fine; **not required for v1**.
- No auth, no user accounts, no backend progress sync.

### Out of scope (v1)

- Auth, quizzes backend, scored tests
- Live economic data APIs (FRED, BLS, Treasury, etc.)
- Multi-chapter education hub beyond a thin `/education` index
- Accounts, comments, or “mark complete”

---

## Routes

| Route | Purpose |
| --- | --- |
| `/education` | Optional thin hub: list of chapters. v1 only needs Economics. |
| `/education/economics` | Chapter hub: six lesson cards + one-line blurbs. |
| `/education/economics/[slug]` | One concept per page. |

Suggested slugs (stable; do not rename after ship):

1. `scarcity-trade-offs`
2. `supply-demand` — **flagship interactive**
3. `equilibrium-shocks`
4. `incentives`
5. `markets-failure`
6. `gdp-inflation-unemployment`

Canonical URLs look like `https://christiankeogh.com/education/economics/supply-demand`.

---

## Lesson page pattern

Every lesson uses the same vertical rhythm:

1. **Hook animation** — 3–8 seconds, muted, decorative. Respect `prefers-reduced-motion` (static diagram or first frame instead).
2. **One idea** — a short heading + 1–3 sentences. No lecture.
3. **One interactive** — the page’s only “toy.” Keyboard operable.
4. **Takeaway** — exactly three bullets.
5. **Prev / next** — links to adjacent lessons, plus a link back to `/education/economics`.

Keep copy scannable: short paragraphs, large chart, controls under the chart on mobile.

---

## v1 lessons

### 1. Scarcity & trade-offs — `/education/economics/scarcity-trade-offs`

- **Idea:** You cannot have everything. Choosing one thing means giving up another (opportunity cost).
- **Hook:** A small pie or two piles that split when you pick A vs B.
- **Interactive:** A two-option slider (“more free time” vs “more money”). Show the thing you give up as opportunity cost. Optional: a tiny PPF curve with one movable point.
- **Takeaway:**
  - Scarcity is the starting point of economics.
  - Every choice has an opportunity cost.
  - “Free” still costs time or something else you could have done.

### 2. Supply & demand — `/education/economics/supply-demand` (flagship)

- **Idea:** Price is where buyers’ willingness and sellers’ willingness meet.
- **Hook:** Two lines (demand down, supply up) draw in and cross.
- **Interactive (the one to polish):**
  - Two range sliders: **Demand** (shift left/right) and **Supply** (shift left/right).
  - Chart shows both curves, the intersection as **price** and **quantity**, and a short status line (“shortage”, “surplus”, or “clears”).
  - Optional third slider: a price floor/ceiling that creates a visible gap vs equilibrium.
  - Use toy numbers, not real market data.
- **Takeaway:**
  - Demand slopes down; supply slopes up.
  - Shifts move the intersection (price and quantity).
  - A price stuck away from the intersection creates shortage or surplus.

### 3. Equilibrium & shocks — `/education/economics/equilibrium-shocks`

- **Idea:** Markets rest at a crossing. A shock moves a curve; price and quantity adjust.
- **Hook:** A stable cross, then a sudden shift, then a new cross.
- **Interactive:** Preset shock buttons (oil shock, good harvest, sudden popularity, new tax) that shift supply or demand and animate to the new equilibrium. Same chart language as lesson 2.
- **Takeaway:**
  - Equilibrium is a resting point, not a moral judgment.
  - Demand shocks and supply shocks move price in different directions.
  - Read the *cause* before guessing what happens to price.

### 4. Incentives — `/education/economics/incentives`

- **Idea:** People respond to costs and benefits. Change the payoff, change the behavior.
- **Hook:** A simple “before / after a tax or subsidy” count of choices.
- **Interactive:** Toggle a tax vs a subsidy on a toy activity (e.g. cycling vs driving). Show how the mix of choices moves. Keep it qualitative.
- **Takeaway:**
  - Incentives are everywhere, not just money.
  - Unintended consequences often come from ignored incentives.
  - If a policy fails, ask what it rewarded.

### 5. Markets & failure (light) — `/education/economics/markets-failure`

- **Idea:** Markets work well when costs and benefits are on the people choosing. They fail when someone else pays, or information is bad, or one seller dominates.
- **Hook:** A tidy market vs a spill that is not in the price.
- **Interactive:** A single externality slider (pollution not in the price). Show “private cost” vs “social cost” and that the market quantity is too high. Stay light — no full public-goods model.
- **Takeaway:**
  - A market can be efficient and still miss a cost.
  - Externalities, public goods, and thin competition are the usual failure modes.
  - “Failure” means the price signal is incomplete, not that trade is bad.

### 6. GDP, inflation, unemployment — `/education/economics/gdp-inflation-unemployment`

- **Idea:** Three headline gauges of a whole economy — output, rising prices, people who want work and do not have it.
- **Hook:** Three big numbers tick into place (static toy values, **not** a live API).
- **Interactive:** A simple dashboard: three cards + one chart. A “year” slider plays canned illustrative series (made-up but plausible). Labels explain each series in one sentence. No FRED/BLS calls in v1.
- **Takeaway:**
  - GDP is a flow of production, not a measure of happiness.
  - Inflation is a rise in the *price level*, not “that one thing got expensive.”
  - Unemployment counts people who want work; it is not “everyone without a job.”

---

## How this fits the repo

This is a Next.js **App Router** personal site (`app/`). Match existing patterns; do not introduce a Pages Router.

Relevant facts for the implementer:

- Router: `app/` only. Dynamic routes already exist at `app/blog/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`, `notFound()`).
- Package manager: **bun**. Add chart deps with `bun add`.
- Already installed: `framer-motion`, `lucide-react`, Tailwind v4, Geist fonts.
- **Not** installed: Recharts, Visx, D3.
- Theme: black background, white/neutral text (`text-white bg-black`). Keep education pages in that system.
- Root layout (`app/layout.tsx`) wraps the whole site in `max-w-xl`. That is tight for charts.
- Nav lives in `app/components/nav.tsx` (home, blog, projects dropdown, art).
- Sitemap is a hardcoded route list in `app/sitemap.ts` plus blog posts.
- OG images: `app/og/route.tsx` via `/og?title=...`.
- Interactive toys elsewhere (`/us-debt`, `/snake`) are `"use client"` pages with Framer Motion. Education interactives should follow that: server page shell + client island for the toy.

### Layout width (do this first)

Do **not** widen `app/layout.tsx` for the whole site.

Give education routes their own nested layout, e.g. `app/education/layout.tsx`, that opts into a wider column (`max-w-2xl` or `max-w-3xl`) and/or lets charts `w-full`. Footer and nav are also `max-w-xl` — either leave them as-is or mirror the wider width only inside the education layout. Do not redesign global chrome.

### Charts

**Recommendation for v1: Recharts + Framer Motion.**

- Recharts is enough for supply/demand lines, intersection dots, and the macro dashboard.
- Framer Motion is already in the repo; use it for hook animations, reduced-motion fallbacks, and slider-driven transitions.
- Reach for Visx only if Recharts fights custom SVG (e.g. you want a hand-drawn PPF or highly custom hit targets). Do not add both in v1.

Keep datasets tiny and in-module. No fetches.

### File / folder sketch

```
app/education/
  layout.tsx                 # wider column, education-only
  page.tsx                   # thin hub
  economics/
    page.tsx                 # chapter hub
    [slug]/
      page.tsx               # lesson shell (metadata, notFound, prev/next)
    lessons.ts               # ordered registry: slug, title, blurb, takeaways
    components/
      lesson-shell.tsx       # shared page pattern
      prev-next.tsx
      supply-demand-chart.tsx    # flagship (client)
      scarcity-toy.tsx
      shock-buttons.tsx
      incentives-toy.tsx
      externality-toy.tsx
      macro-dashboard.tsx
```

Keep **copy in the registry** (`lessons.ts`) so the slug page stays thin. Do not invent an MDX content pipeline for v1 unless you already want one; these pages are interactive, not posts. Blog MDX (`app/blog/posts`) is the wrong template.

`generateStaticParams` should read the same registry so every slug is static.

### Nav, sitemap, metadata

When building (not in this plan PR):

- Add **Education** to `app/components/nav.tsx`. Prefer a top-level link to `/education` or `/education/economics`. Do not bury it only under “projects / other” unless you want it to feel like a toy.
- Extend `app/sitemap.ts` with `/education`, `/education/economics`, and each lesson slug.
- Per-lesson `generateMetadata`: unique title + description; OG via existing `/og?title=`.
- `notFound()` for unknown slugs, same as blog.

### Accessibility

- Sliders are real `<input type="range">` (or a Radix/shadcn equivalent if you add one) with visible labels, `aria-valuemin/max/now`, and a text readout of the current value.
- Charts need a text equivalent: e.g. “Price 4, quantity 10, market clears.”
- `useReducedMotion()` / `prefers-reduced-motion`: skip hook animation; jump to the final diagram.
- Hit targets ≥ 44px on phone. Controls stack under the chart, not in a hover-only toolbar.
- Do not convey state with color alone (shortage vs surplus needs a label).

### Optional localStorage (not required)

If it is cheap after the pages work: store `education:economics:lastSlug` and surface “Continue” on `/education/economics`. Fail open if storage is blocked.

---

## Implementation order

Build in this order so the flagship is real before the rest of the copy:

1. `lessons.ts` registry + `app/education/layout.tsx` (width) + empty hubs.
2. Shared `LessonShell` (hook slot, idea, interactive slot, takeaway, prev/next).
3. Flagship `supply-demand` interactive until it feels good on a phone.
4. Remaining five lessons, reusing chart primitives where possible (lessons 2, 3, 5 share “two curves + a point”).
5. Nav, sitemap, metadata, reduced-motion pass.
6. Optional last-opened `localStorage`.

Ship lesson 2 before polishing hooks on 1/4/5. The supply/demand toy is the product.

---

## Acceptance criteria (when someone implements this)

- All seven URLs above resolve (hubs + six lessons). Unknown slugs 404.
- Each lesson is usable on a ~360px-wide phone: no horizontal page scroll, sliders work with a thumb, takeaway is visible without hunting.
- `/education/economics/supply-demand` lets you shift supply and demand and see price, quantity, and shortage/surplus update.
- Keyboard can operate every interactive.
- `prefers-reduced-motion: reduce` does not loop decorative motion.
- No auth, no quiz backend, no live macro APIs.
- Site-wide `max-w-xl` layout on blog/home/art is unchanged.

---

## This plan PR

- Adds this document only (plus a README pointer).
- Does **not** add education routes, chart libraries, or nav items.
- Next step for the owner: implement from this file in Cursor, starting with the registry + supply/demand chart.
