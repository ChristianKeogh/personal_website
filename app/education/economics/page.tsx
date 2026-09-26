import { baseUrl } from "app/sitemap";
import Link from "next/link";
import type { ComponentType } from "react";
import EconomyToy from "./components/economy-toy";
import ExternalityToy from "./components/externality-toy";
import HashScroll from "./components/hash-scroll";
import IncentivesToy from "./components/incentives-toy";
import LessonShell from "./components/lesson-shell";
import MacroDashboard from "./components/macro-dashboard";
import ScarcityToy from "./components/scarcity-toy";
import ShockButtons from "./components/shock-buttons";
import SupplyDemandToy from "./components/supply-demand-toy";
import { lessons } from "./lessons";

const title = "Basic economics";
const description =
  "What an economy is, then scarcity, prices, shocks, incentives, market failure and the headline numbers.";

const interactives: Record<string, ComponentType> = {
  "an-economy": EconomyToy,
  "scarcity-trade-offs": ScarcityToy,
  "supply-demand": SupplyDemandToy,
  "equilibrium-shocks": ShockButtons,
  incentives: IncentivesToy,
  "markets-failure": ExternalityToy,
  "gdp-inflation-unemployment": MacroDashboard
};

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${baseUrl}/education/economics`,
    images: [{ url: `${baseUrl}/og?title=${encodeURIComponent(title)}` }]
  }
};

export default function EconomicsPage() {
  return (
    <article>
      <HashScroll />
      <Link
        href="/education"
        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        ← Education
      </Link>
      <h1 className="title font-semibold text-2xl tracking-tighter mt-4">
        Basic economics
      </h1>
      {lessons.map((lesson) => {
        const Interactive = interactives[lesson.slug];

        return (
          <LessonShell key={lesson.slug} lesson={lesson}>
            <Interactive />
          </LessonShell>
        );
      })}
    </article>
  );
}
