import Container from "@/components/Assets/Container";
import { htmlRemoveRegex } from "@/constant/constants";
import { Query } from "@/lib/axios";
import { abort } from "process";
import { LessenItem } from "@/types";
import LessomPageLayout from "@/components/Routes/SingleLessonPage/LessomPageLayout";

type Props = {
  params: {
    slug: string;
  };
};
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
      <LessomPageLayout
        lessonId={Number(lesson_id)}
        courseId={Number(course_id)}
      />
    </Container>
  );
}
