import Link from "next/link";
import type { Lesson } from "../lessons";
import LessonHook from "./lesson-hook";
import PrevNext from "./prev-next";

interface LessonShellProps {
  lesson: Lesson;
  children: React.ReactNode;
}

export default function LessonShell({ lesson, children }: LessonShellProps) {
  return (
    <article>
      <Link
        href="/education/economics"
        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        ← Basic economics
      </Link>
      <LessonHook slug={lesson.slug} />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {lesson.title}
      </h1>
      <p className="mt-2 text-neutral-300">{lesson.idea}</p>
      {children}
      <h2 className="mt-10 text-sm uppercase tracking-widest text-neutral-500">
        Takeaway
      </h2>
      <ul className="mt-3 flex flex-col gap-2 list-disc pl-5 text-neutral-300">
        {lesson.takeaways.map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ul>
      <PrevNext slug={lesson.slug} />
    </article>
  );
}
