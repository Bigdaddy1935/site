import React from "react";
import MediaSidebar, { CourseType } from "./MediaSidebar";
import { PaginateData } from "@/types/response";
import { CourseListItem, LessenItem } from "@/types";
import MediaPageContent from "./MedialPageContent";

export type MediaPageLayoutProps = {
  courses: PaginateData<CourseListItem>;
  courseType: CourseType;
  currentCourseId: string;
  lessons: PaginateData<LessenItem>;
};
export default function MediaPageLayout(props: MediaPageLayoutProps) {
  const { courseType, courses, currentCourseId, lessons } = props;
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <MediaSidebar
        courses={courses?.data}
        courseType={courseType}
        currentCourseId={+currentCourseId}
      />
      <div className="lg:w-[calc(100vw-230px)] flex justify-center px-6 lg:px-2">
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
      </div>
    </div>
  );
}
