import { baseUrl } from "app/sitemap";
import Link from "next/link";
import ContinueLink from "./components/continue-link";
import { lessons } from "./lessons";

const title = "Basic economics";
const description =
  "Six short, visual refreshers: scarcity, supply and demand, shocks, incentives, market failure and the headline numbers.";

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
    <section>
      <Link
        href="/education"
        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        ← Education
      </Link>
      <h1 className="title font-semibold text-2xl tracking-tighter mt-4">
        Basic economics
      </h1>
      <p className="mt-2 text-neutral-400">
        Six ideas. Read in order, or open the one you need.
      </p>
      <ContinueLink />
      <ol className="mt-8 flex flex-col gap-3">
        {lessons.map((lesson, index) => (
          <li key={lesson.slug}>
            <Link
              href={`/education/economics/${lesson.slug}`}
              className="group flex gap-4 border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-colors"
            >
              <span className="text-neutral-600 tabular-nums text-sm pt-0.5">
                {index + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-neutral-100 font-medium tracking-tight group-hover:text-neutral-300 transition-colors">
                  {lesson.title}
                </span>
                <span className="text-neutral-400 text-sm mt-1">
                  {lesson.blurb}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
