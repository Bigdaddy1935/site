import { CourseListItem, LessenItem } from "@/types";
import { PaginateData } from "@/types/response";
import React from "react";
import SedaVaSimaSidebar from "./SedaVaSimaSidebar";
import Image from "@/components/Assets/Image";
import SedaVaSimaCard from "@/components/SedaVaSimaCard";
import GetMoreItem from "./GetMoreItem";

export type TvPageLayoutProps = {
  courses: PaginateData<CourseListItem>;
  courseId: string;
  lessons: PaginateData<LessenItem>;
};
export default function TvPageLayout(props: TvPageLayoutProps) {
  const { courseId, courses, lessons } = props;
  return (
    <div className="flex flex-col lg:flex-row">
      <SedaVaSimaSidebar courses={courses} courseId={Number(courseId)} />
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
            {lessons?.data?.map((item, index) => <SedaVaSimaCard {...item} />)}

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
