"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLesson, type Lesson } from "../lessons";
import { LAST_LESSON_KEY } from "./last-lesson";

export default function ContinueLink() {
  const [lesson, setLesson] = useState<Lesson>();

  useEffect(() => {
    try {
      const slug = window.localStorage.getItem(LAST_LESSON_KEY);
      setLesson(slug ? getLesson(slug) : undefined);
    } catch {
      // Storage can be blocked; the chapter list still works without it.
    }
  }, []);

  if (!lesson) {
    return null;
  }

  return (
    <Link
      href={`/education/economics/${lesson.slug}`}
      className="inline-flex mt-4 text-sm text-neutral-300 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-300 transition-all"
    >
      Continue: {lesson.title}
    </Link>
  );
}
