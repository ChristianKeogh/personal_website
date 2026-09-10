"use client";
import { useEffect } from "react";

export const LAST_LESSON_KEY = "education:economics:lastSlug";

export function RememberLesson({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(LAST_LESSON_KEY, slug);
    } catch {
      // Storage can be blocked; nothing here is required to read a lesson.
    }
  }, [slug]);

  return null;
}
