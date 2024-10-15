import MediaSidebar, {
  CourseType,
} from "@/components/Routes/Media/MediaSidebar";
import { redirect } from "next/navigation";

import { CourseListItem, KeyValue, LessenItem } from "@/types";
import { Suspense } from "react";
import { PaginateData } from "@/types/response";
import MediaPageContent from "@/components/Routes/Media/MedialPageContent";
import LoadingBox from "@/components/Assets/LoadingBox";
import {
  cFetch,
  getAllMediaLessons,
  getMediaCourses,
  getMediaLessons,
} from "@/lib/fetch";
import MediaPageClient from "@/components/Routes/Media/MediaPageClient";

const mediaUrls: KeyValue = {
  medias: "آکادمی",
  mahdyar: "مهدیار",
  kolbe: "کلبه",
};

type Props = {
  params: {
    slug: [CourseType, string | null];
  };
};

export async function generateStaticParams() {
  const [medias, kolbe, mahdyar] = await Promise.all([
    cFetch(`/courses/ids?type=media`),
    cFetch(`/courses/ids?type=kolbe`),
    cFetch(`/courses/ids?type=mahdyar`),
  ]);

  return [
    ["medias"],
    ["kolbe"],
    ["mahdyar"],
    ...medias.map((course: any) => ({
      slug: [`medias`, `course-${course.id}`],
    })),
    ...kolbe.map((course: any) => ({
      slug: [`kolbe`, `course-${course.id}`],
    })),
    ...medias.map((course: any) => ({
      slug: [`mahdyar`, `course-${course.id}`],
    })),
  ];
}

async function fetchData(courseId: string | null, courseType: string) {
  try {
    const courses = await getMediaCourses(courseType);

    const currentCourseId = courseId
      ? courseId
      : courseType === "medias"
        ? "all_media"
        : String(courses.data[0].id);

    const lessons =
      currentCourseId === "all_media"
        ? await getAllMediaLessons()
        : await getMediaLessons(currentCourseId);

    return {
      currentCourseId,
      courses,
      lessons,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}
/* export async function generateMetadata({
  params: { slug = ["medias", null] },
}: Props): Promise<Metadata> {
  if (!slug?.[1])
    return {
      title: `رسانه ${mediaUrls[slug[0]]} | آکادمی روح بخش`,
    };

  const courses = await PostWithCookie<PaginateData<CourseListItem>>(
    `/courses/get/${slug[0]}`
  );

  const courseId = slug[1].split("-").pop();
  if (typeof courses === "boolean") return {};
  const course = courses.data.find((i) => i.id === Number(courseId));

  if (!slug?.[1])
    return {
      title: `رسانه ${mediaUrls[slug[0]]} | آکادمی روح بخش`,
    };

  return {
    title: `${course?.course_title} | ${mediaUrls[slug[0]]} | آکادمی روح بخش`,
  };
} */
export default async function MediaPage(props: Props) {
  const {
    params: { slug = [null, null] },
  } = props;

  if (!slug?.[0]) redirect("/media/medias");
  const courseType = slug?.[0] ?? "medias";
  const courseId = slug[1]?.split("-").pop() ?? null;

  const { courses, lessons, currentCourseId } = await fetchData(
    courseId,
    courseType
  );

  return (
    <MediaPageClient
      courseType={courseType}
      courses={courses}
      currentCourseId={currentCourseId}
      lessons={lessons}
    />
  );
}
