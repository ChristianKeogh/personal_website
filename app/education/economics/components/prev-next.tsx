import Link from "next/link";
import { getNeighbours } from "../lessons";

export default function PrevNext({ slug }: { slug: string }) {
  const { previous, next } = getNeighbours(slug);

  return (
    <nav className="mt-12 pt-6 border-t border-neutral-800 flex flex-col gap-4 text-sm">
      <div className="flex justify-between gap-4">
        {previous ? (
          <Link
            href={`/education/economics/${previous.slug}`}
            className="text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/education/economics/${next.slug}`}
            className="text-neutral-400 hover:text-neutral-100 transition-colors text-right"
          >
            {next.title} →
          </Link>
        )}
      </div>
      <Link
        href="/education/economics"
        className="text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        All lessons
      </Link>
    </nav>
  );
}
