import { baseUrl } from "app/sitemap";
import Link from "next/link";
import { lessons } from "./economics/lessons";

const title = "Education";
const description =
  "Short, visual refresher pages for ideas worth re-learning.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${baseUrl}/education`,
    images: [{ url: `${baseUrl}/og?title=${encodeURIComponent(title)}` }]
  }
};

export default function EducationPage() {
  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        Education
      </h1>
      <p className="mt-2 mb-8 text-neutral-400">
        One idea per page. One thing to play with. Three things to remember.
      </p>
      <Link
        href="/education/economics"
        className="group flex flex-col border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-colors"
      >
        <span className="text-neutral-100 font-medium tracking-tight group-hover:text-neutral-300 transition-colors">
          Basic economics
        </span>
        <span className="text-neutral-400 text-sm mt-1">
          {lessons.length} lessons — scarcity, prices, incentives and the
          headline numbers.
        </span>
      </Link>
    </section>
  );
}
