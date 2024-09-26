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
  getAllMediaLessons,
  getMediaCourses,
  getMediaLessons,
} from "@/lib/fetch";

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

  const courses = await getMediaCourses(courseType);

  const courseId = slug[1]?.split("-").pop();
  const currentCourseId = courseId
    ? courseId
    : courseType === "medias"
      ? "all_media"
      : String(courses.data[0].id);

  const lessons =
    currentCourseId === "all_media"
      ? await getAllMediaLessons()
      : await getMediaLessons(currentCourseId);

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <Suspense fallback={null}>
        <MediaSidebar
          courses={courses?.data}
          courseType={courseType}
          currentCourseId={+currentCourseId}
        />
      </Suspense>
      <div className="lg:w-[calc(100vw-230px)] flex justify-center px-6 lg:px-2">
        <Suspense fallback={<LoadingBox />}>
          {currentCourseId ? (
            <MediaPageContent
              lessons={lessons.data}
              route={
                currentCourseId === "all_media"
                  ? {
                      url: "/lessons/get/all_media/data",
                      method: "get",
                    }
                  : {
                      url: `/lessons/get/courseId/${currentCourseId}`,
                      method: "get",
                    }
              }
            />
          ) : null}
        </Suspense>
      </div>
    </div>
  );
}
