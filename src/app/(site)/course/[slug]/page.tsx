

import { abort } from "process";

import { cFetch, getCourse, getCourseComments } from "@/lib/fetch";
import { htmlRemoveRegex } from "@/constant/constants";
import CoursePageClient from "@/components/Routes/SingleCoursePage/CoursePageClient";

type Props = {
  params: {
    slug: string;
  };

  searchParams: {
    learn: "learning" | "learned" | null;
  };
};


export async function generateStaticParams() {
  const courses = await cFetch(`/courses/ids?type=course`);

  return courses.map((course : any) => ({
    slug: `course-${course.id}`,
  }));
}
 async function fetchMYData(courseId: string) {
  try {
    const { course } = await getCourse(courseId);

    const courseComments = await getCourseComments(courseId);

    return {
      course,
      courseComments,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const courseId = slug.split("-")[1];

  if (!courseId) return {};
  const { course } = await getCourse(courseId);

  const { description = "", ...courseData } = course;

  const shortDescription = description
    ?.slice(200)
    .replaceAll(htmlRemoveRegex, "");
  return {
    title: `${courseData.course_title} | آکادمی روح بخش`,
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

  const { course, courseComments } = await fetchMYData(courseId);

  return <CoursePageClient course={course} courseComments={courseComments} />;
}
