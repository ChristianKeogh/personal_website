import type { Lesson } from "../lessons";
import LessonHook from "./lesson-hook";

interface LessonShellProps {
  lesson: Lesson;
  children: React.ReactNode;
}

export default function LessonShell({ lesson, children }: LessonShellProps) {
  return (
    <section
      id={lesson.slug}
      className="mt-16 pt-10 border-t border-neutral-800 scroll-mt-24"
    >
      <LessonHook slug={lesson.slug} />
      <h2 className="title font-semibold text-2xl tracking-tighter">
        {lesson.title}
      </h2>
      <p className="mt-2 text-neutral-300">{lesson.idea}</p>
      {children}
    </section>
  );
}
