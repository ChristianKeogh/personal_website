import { baseUrl } from "app/sitemap";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import ExternalityToy from "../components/externality-toy";
import IncentivesToy from "../components/incentives-toy";
import LessonShell from "../components/lesson-shell";
import MacroDashboard from "../components/macro-dashboard";
import ScarcityToy from "../components/scarcity-toy";
import ShockButtons from "../components/shock-buttons";
import SupplyDemandToy from "../components/supply-demand-toy";
import { getLesson, lessons } from "../lessons";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

const interactives: Record<string, ComponentType> = {
  "scarcity-trade-offs": ScarcityToy,
  "supply-demand": SupplyDemandToy,
  "equilibrium-shocks": ShockButtons,
  incentives: IncentivesToy,
  "markets-failure": ExternalityToy,
  "gdp-inflation-unemployment": MacroDashboard
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata(props: LessonPageProps) {
  const { slug } = await props.params;
  const lesson = getLesson(slug);

  if (!lesson) {
    return;
  }

  const url = `${baseUrl}/education/economics/${lesson.slug}`;
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(lesson.title)}`;

  return {
    title: lesson.title,
    description: lesson.blurb,
    openGraph: {
      title: lesson.title,
      description: lesson.blurb,
      type: "article",
      url,
      images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.blurb,
      images: [ogImage]
    }
  };
}

export default async function LessonPage(props: LessonPageProps) {
  const { slug } = await props.params;
  const lesson = getLesson(slug);
  const Interactive = interactives[slug];

  if (!lesson || !Interactive) {
    notFound();
  }

  return (
    <LessonShell lesson={lesson}>
      <Interactive />
    </LessonShell>
  );
}
