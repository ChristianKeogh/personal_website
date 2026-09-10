import { baseUrl } from "app/sitemap";
import Link from "next/link";
import { lessons } from "./economics/lessons";

const title = "Education";
const description = "Forget these lessons at your own peril";

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
        Forget these lessons at your own peril
      </p>
      <Link
        href="/education/economics"
        className="group flex flex-col border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-colors"
      >
        <span className="text-neutral-100 font-medium tracking-tight group-hover:text-neutral-300 transition-colors">
          Basic economics
        </span>
        <span className="text-neutral-400 text-sm mt-1">
          {lessons.length} lessons — what an economy is, then scarcity, prices,
          incentives.
        </span>
      </Link>
    </section>
  );
}
