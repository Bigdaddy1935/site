import Container from "@/components/Assets/Container";
import { abort } from "process";
import { cFetch } from "@/lib/fetch";
import LessonPageLayoutClient from "@/components/Routes/SingleLessonPage/LessonPageLayoutClient";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const lessons = await cFetch(`/lessons/ids`);

  return lessons.map((lesson: any) => ({
    slug: `${lesson.course_id}-${lesson.id}`,
  }));
}
export async function generateMetadata({ params: { slug } }: Props) {
  /*   const lessonId = slug.split("-")[1];

  if (!lessonId) return {};
  const lesson = await Query<{ lessons: LessenItem }>(
    `/lessons/get/${lessonId}`
  );

  if (typeof lesson === "boolean") {
    return {};
  }

  const {
    lessons: { description, title },
  } = lesson;

  const shortDescription = description
    ?.slice(200)
    .replaceAll(htmlRemoveRegex, ""); */
  return {
    title: `آکادمی روح بخش`,
    //   description: shortDescription,
    openGraph: {
      title: `آکادمی روح بخش`,
      //    description: shortDescription,
    },
  };
}

export default function LessonPage({ params: { slug } }: Props) {
  const [course_id, lesson_id] = slug?.split("-");
  if (!course_id || !lesson_id) abort();

  return (
    <Container>
      <LessonPageLayoutClient
        lessonId={Number(lesson_id)}
        courseId={Number(course_id)}
      />
    </Container>
  );
}
