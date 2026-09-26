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
      <h3 className="mt-10 text-sm uppercase tracking-widest text-neutral-500">
        Takeaway
      </h3>
      <ul className="mt-3 flex flex-col gap-2 list-disc pl-5 text-neutral-300">
        {lesson.takeaways.map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ul>
    </section>
  );
}
