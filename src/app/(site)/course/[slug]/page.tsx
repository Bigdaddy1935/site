import Container from "@/components/Assets/Container";
import Hidden from "@/components/Assets/Hidden";
import Image from "@/components/Assets/Image";
import VideoPlayer from "@/components/Assets/VideoPlayer";
import Comments from "@/components/Comments";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import CourseDetails from "@/components/Routes/SingleCoursePage/CourseDetails";
import CourseHeader from "@/components/Routes/SingleCoursePage/CourseHeader";
import CourseStartButton from "@/components/Routes/SingleCoursePage/CourseStartButton";
import LessonsList from "@/components/Routes/SingleCoursePage/LessonsList";
import { isExists } from "@/lib/utils";
import { abort } from "process";
import { Suspense } from "react";
import LoadingBox from "@/components/Assets/LoadingBox";
import QuizStartButton from "@/components/Routes/SingleCoursePage/Quiz/QuizStartButton";
import { getCourse, getCourseComments } from "@/lib/fetch";
import { htmlRemoveRegex } from "@/constant/constants";

type Props = {
  params: {
    slug: string;
  };

  searchParams: {
    learn: "learning" | "learned" | null;
  };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const courseId = slug.split("-")[1];

  if (!courseId) return {};
  const { course } = await getCourse(courseId);

  const { description = "", ...courseData } = course;

  const shortDescription = description
    ?.slice(200)
    .replaceAll(htmlRemoveRegex, "");
  return {
    title: courseData.course_title,
    description: shortDescription,
    openGraph: {
      title: `${courseData.course_title} | آکادمی روح بخش`,
      description: shortDescription,
    },
  };
}

export default async function CoursePage({ params: { slug } }: Props) {
  const courseId = slug.split("-").pop();

  if (!courseId) abort();

  const { course: courseData } = await getCourse(courseId);

  const courseComments = await getCourseComments(courseId);

  return (
    <Container className="my-10 flex flex-col-reverse lg:flex-row lg:justify-between">
      <Suspense fallback-={<LoadingBox />}>
        <div className="lg:w-[50%] lg:flex-1">
          <CourseHeader
            title={courseData?.course_title}
            description={courseData?.description}
            categories={courseData?.categories}
            type="course"
          />

          <Hidden hidden="lg">
            <HeaderSetTitle label={courseData?.course_title} />
          </Hidden>

          {courseData.type === "club" ? (
            <QuizStartButton {...courseData} />
          ) : (
            <CourseStartButton courseProgress={courseData.courseProgress} />
          )}

          <LessonsList type={courseData?.type} courseId={courseId} />

          <Comments
            model="course"
            id={Number(courseId)}
            type="App\Models\Course"
            comments={courseComments}
          />
        </div>
        <div className="top-[100px] lg:sticky lg:w-[50%] lg:flex-1 lg:self-start lg:p-6">
          {isExists(courseData.intro) ? (
            <VideoPlayer poster={courseData.picture} src={courseData.intro!} />
          ) : (
            <div className="relative overflow-hidden rounded-md">
              <Image
                style={{ width: "100%", height: "auto" }}
                width={600}
                height={399}
                src={courseData.picture}
                alt={courseData?.course_title}
              />
            </div>
          )}

          <CourseDetails {...courseData} />
        </div>
      </Suspense>
    </Container>
  );
}
