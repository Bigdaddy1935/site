import SedaVaSimaSidebar from "@/components/Routes/SedaVaSima/SedaVaSimaSidebar";
import { abort } from "process";
import Image from "@/components/Assets/Image";
import GetMoreItem from "@/components/Routes/SedaVaSima/GetMoreItem";
import SedaVaSimaCard from "@/components/SedaVaSimaCard";
import { Suspense } from "react";
import TvCartSkeleton from "@/components/SedaVaSimaCard/TvCartSkeleton";
import { getTvCourses, getTvLessons } from "@/lib/fetch";

type Props = {
  params: {
    slug: string;
  };
};



export default async function TvPage({ params }: Props) {
  const { slug } = params;
  const courseId = slug?.split("-").pop();
  if (!courseId) abort();

  const lessons = await getTvLessons(courseId);

  const courses = await getTvCourses();


  return (
    <div className="flex flex-col lg:flex-row">
      <Suspense fallback={null}>
        <SedaVaSimaSidebar courses={courses} courseId={Number(courseId)} />
      </Suspense>
      <div className="flex lg:w-[calc(100vw-230px)] px-6 flex-1 justify-center">
        <div className="my-14 max-w-screen-xl flex flex-1 justify-center flex-col gap-6">
          <div className="rounded-lg overflow-hidden h-[127px] lg:h-[200px] relative">
            <Image
              src={`/tv-${courseId}-min.jpg`}
              fill
              sizes=""
              alt=""
              priority
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
            <Suspense
              fallback={
                <div className="col-span-3 grid grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
                  <TvCartSkeleton />
                  <TvCartSkeleton />
                  <TvCartSkeleton />
                </div>
              }
            >
              {lessons.data.map((item, index) => (
                <SedaVaSimaCard {...item} />
              ))}
            </Suspense>

            <GetMoreItem
              route={{
                url: `/lessons/get/courseId/${courseId}`,
                method: "get",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
