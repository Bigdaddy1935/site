"use client";
import ActiveLink from "@/components/Assets/ActiveLink";
import EmptyButton from "@/components/Assets/EmptyButton";
import Hidden from "@/components/Assets/Hidden";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import { lessonMediaType } from "@/constant/constants";
import React from "react";
import { CourseListItem } from "@/types/";
import { useGetMediaCoursesQuery } from "@/lib/services/base";

export type CourseType = "medias" | "mahdyar" | "kolbe";
const items = [
  {
    title: "آکادمی",
    href: "medias",
  },
  {
    title: "مهدیار",
    href: "mahdyar",
  },
  {
    title: "کلبه",
    href: "kolbe",
  },
];

type Props = {
  courseType: CourseType;
  currentCourseId: number | string;
  courses : CourseListItem[] | undefined
};
export default function MediaSidebar(props: Props) {
  const { courseType, currentCourseId , courses } = props;


  return (
    <React.Fragment>
      <HeaderSetTitle
        label={
          currentCourseId
            ? courses?.find((i) => i.id === currentCourseId)?.course_title
            : `رسانه - ${lessonMediaType[courseType]?.label}`
        }
      />
      <div className="sticky bottom-0 right-0 top-[68px] inline-flex h-[45px] w-full flex-col bg-white dark:bg-mdark-600 max-lg:top-[64px] max-lg:z-30 lg:h-[98vh] lg:w-[230px]  lg:pt-14  lg:shadow-2xl">
        <h1 className="hidden text-center text-4xl font-semibold text-primary-700 dark:text-mdark-300 lg:block">
          رسانه
        </h1>

        <div className="relative z-20 flex flex-1 items-stretch lg:pt-10">
          <div className="relative flex w-full flex-row max-lg:justify-evenly lg:w-[50%] lg:flex-col lg:p-4 lg:shadow-xl">
            {items.map((item) => (
              <div
                key={item.href}
                className="max-lg:flex max-lg:items-center max-lg:justify-center"
              >
                <ActiveLink
                  poinerClass="right"
                  isDefaultLink={courseType === item.href}
                   defaultLink={{
                    link: `/media/${courseType}${currentCourseId !== "all_media" ? "/course-" + currentCourseId : ""}`,
                  }} 
                  key={item.href}
                  activeClassName="text-primary-300 dark:text-text-dark-1 bg-primary-50 dark:bg-mdark-400"
                  className="block rounded-md border-b border-solid border-hgray-200 text-center text-primary-700 dark:border-mdark-600 dark:text-hgray-200 max-lg:p-2 lg:my-2 lg:py-3 lg:text-lg"
                  href={`/media/${item.href}`}
                >
                  {item.title}
                </ActiveLink>
                {courseType === item.href ? (
                  <>
                    <Hidden hidden="lg">
                      <div className="absolute left-0 right-0 top-[42px] w-[100vh]  max-w-[100vw] bg-hgray-200 dark:bg-mdark-600">
                        <div className="relative w-full px-2  py-3">
                          <div className=" scroll-hidden max-w-full  overflow-scroll">
                            <div className="flex justify-around flex-nowrap gap-3 px-2">
                              {courseType === "medias" ? (
                                <SidebarLink
                                  course={{ course_title: "همه" }}
                                  courseType={"medias"}
                                />
                              ) : null}
                              {courses?.map((course) => (
                                <div key={course.id} className="min-w-fit">
                                  <SidebarLink
                                    currentCourseId={currentCourseId}
                                    key={course.id}
                                    course={course}
                                    courseType={courseType}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <EmptyButton className="absolute right-0.5 top-[50%] z-30 translate-y-[-50%] bg-transparent">
                            <IconChevronLeft
                              width={22}
                              height={22}
                              className="rotate-180 text-hgray-500 dark:text-white"
                            />
                          </EmptyButton>
                          <EmptyButton className="absolute left-0.5 top-[50%] z-30 translate-y-[-50%] bg-transparent">
                            <IconChevronLeft
                              width={22}
                              height={22}
                              className="text-hgray-500 dark:text-white"
                            />
                          </EmptyButton>
                        </div>
                      </div>
                    </Hidden>

                    <Hidden hidden="max-lg">
                      <div className="absolute left-0 top-[42px] max-lg:right-0 max-lg:flex max-lg:justify-evenly max-lg:bg-white max-lg:py-3  max-lg:dark:bg-mdark-400 lg:bottom-0 lg:left-[-96%] lg:right-[105%] lg:top-0 lg:p-2 lg:pb-10 lg:pl-2.5">
                        {courseType === "medias" ? (
                          <SidebarLink
                            course={{ course_title: "همه" }}
                            courseType={"medias"}
                          />
                        ) : null}
                        {courses?.map((course) => (
                          <SidebarLink
                            currentCourseId={currentCourseId}
                            key={course.id}
                            course={course}
                            courseType={courseType}
                          />
                        ))}
                      </div>
                    </Hidden>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

type SidebarLinkProps = {
  course: CourseListItem | { course_title: string; id?: undefined };
  courseType: CourseType;
  currentCourseId?: number | string ;
};

function SidebarLink({
  course,
  courseType,
  currentCourseId,
}: SidebarLinkProps) {
  return (
    <ActiveLink
      isDefaultLink={currentCourseId === course.id}
      poinerClass="right"
      defaultLink={{ link: `/media/${courseType}/` }}
      activeClassName="text-primary-300 dark:text-text-dark-1 bg-primary-50 dark:bg-mdark-400"
      className="inline-block rounded-md border-b border-solid border-hgray-200 text-center text-sm text-primary-700 dark:border-mdark-600 dark:text-hgray-200 max-lg:rounded-md max-lg:border-none max-lg:p-2 lg:my-2 lg:block lg:max-w-[95px] lg:py-3"
      href={`/media/${courseType}${course.id ? "/course-" + course.id : ""}`}
    >
      {course?.course_title}
    </ActiveLink>
  );
}
