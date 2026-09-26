import { notFound, permanentRedirect } from "next/navigation";
import { getLesson, lessons } from "../lessons";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage(props: LessonPageProps) {
  const { slug } = await props.params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  permanentRedirect(`/education/economics#${lesson.slug}`);
}
