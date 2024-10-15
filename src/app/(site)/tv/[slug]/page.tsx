import SedaVaSimaSidebar from "@/components/Routes/SedaVaSima/SedaVaSimaSidebar";
import { abort } from "process";
import Image from "@/components/Assets/Image";
import GetMoreItem from "@/components/Routes/SedaVaSima/GetMoreItem";
import SedaVaSimaCard from "@/components/SedaVaSimaCard";
import { Suspense } from "react";
import TvCartSkeleton from "@/components/SedaVaSimaCard/TvCartSkeleton";
import { getTvCourses, getTvLessons } from "@/lib/fetch";
import TvPageClient from "@/components/Routes/SedaVaSima/TvPageClient";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const  courses = await getTvCourses();

  return courses.data.map((course: any) => ({
    slug: `course-${course.id}`,
  }));
}
 async function fetchData(courseId: string) {
  try {
    const lessons = await getTvLessons(courseId);

    const courses = await getTvCourses();

    return {
      courses,
      lessons,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}

export default async function TvPage({ params }: Props) {
  const { slug } = params;
  const courseId = slug?.split("-").pop();
  if (!courseId) abort();

  const { courses, lessons } = await fetchData(courseId);

  return (
    <TvPageClient courseId={courseId} courses={courses} lessons={lessons} />
  );
}
