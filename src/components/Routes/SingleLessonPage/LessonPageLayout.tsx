"use client";
import { LessonBreadCrump } from "@/components/Assets/BreadCrumb";
import Hidden from "@/components/Assets/Hidden";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import React from "react";
import LessonsList from "../SingleCoursePage/LessonsList";
import Comments from "@/components/Comments";
import LessonDetails from "./LessonDetails";
import LessonVideo from "./LessonVideo";
import Paper from "@/components/Assets/Paper";
import LessonInfo from "./LessonInfo";
import Image from "@/components/Assets/Image";
import { useGetLessonDataQuery } from "@/lib/services/base";
import IconLoading from "@/components/Icons/IconLoading";
import { useAppSelector } from "@/lib/reduxHooks";
import { selectUserSeason } from "@/lib/reduxFeatures/authSlice";
import { useParams } from "next/navigation";
import NextLink from "@/components/Assets/NextLink";
import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";

export type LessonPageLayoutProps = {
  lessonId: number;
  courseId: number;
};

export default function LessonPageLayout({ lessonId, courseId }: LessonPageLayoutProps) {
  const season = useAppSelector(selectUserSeason);
  const params = useParams();
  const { isLoading, data, isError } = useGetLessonDataQuery(
    { lessonId, withDate: params.clubSlug && season === "new" ? true : false },

    { skip: !courseId, refetchOnMountOrArgChange: true }
  );
  const lessonData = data?.lessons;
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="min-h-[70vh] bg-hgray-400/20 w-full flex items-center justify-center">
          <IconLoading width={36} height={35} />
        </div>
      ) : lessonData ? (
        <>
          <LessonBreadCrump lesson={lessonData} />

          <Hidden hidden="lg">
            <HeaderSetTitle label={lessonData.title} needAnimation={true} />
          </Hidden>
          {lessonData?.courses?.type === "podcast" ? (
            <div className="flex flex-col items-stretch justify-between gap-5 lg:flex-row">
              <div className="relative w-full max-w-sm overflow-hidden rounded-md">
                <Image
                  src={
                    lessonData.picture ??
                    lessonData.courses.picture ??
                    "/temp-images/course-card.jpg"
                  }
                  className="object-contain"
                  fill
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col gap-y-5">
                <LessonInfo {...lessonData} />
                <Paper>
                  <LessonVideo
                    progress={lessonData.progress}
                    src={lessonData.url_video}
                    poster={lessonData.picture}
                    lessonId={lessonId}
                    type={lessonData?.courses?.type}
                  />
                </Paper>
              </div>
            </div>
          ) : (
            <Paper>
              <LessonVideo
                progress={lessonData?.progress}
                src={lessonData?.url_video}
                poster={lessonData?.picture}
                lessonId={lessonId}
                type={lessonData?.courses?.type}
              />
            </Paper>
          )}

          <div className="my-8 flex flex-col justify-between gap-10 lg:flex-row">
            <div className="flex-1">
              <LessonDetails
                {...lessonData}
                course_title={lessonData?.courses?.course_title}
              />
              <Hidden hidden="max-lg">
                <Comments
                  model="lesson"
                  id={Number(lessonId)}
                  type="App\\Models\\Lesson"
                />
              </Hidden>
            </div>

            <div className="w-full lg:w-[375px]">
              <LessonsList
                courseId={courseId}
                type={lessonData?.courses?.type}
                invoices_exists={lessonData?.courses?.products?.paid}
              />
            </div>
          </div>
          <div className="my-8 flex flex-col">
            <Hidden hidden="lg">
              <Comments
                model="lesson"
                id={Number(lessonId)}
                type="App\\Models\\Lesson"
              />
            </Hidden>
          </div>
        </>
      ) : !isError ? (
        <div className="max-w-lg mx-auto mt-9">
          <Paper className="flex gap-5 flex-col items-center">
            <Image src={"/lock.svg"} width={300} height={300} alt="" />
            <p className="text-hgray-500 dark:text-text-dark-4 text-center px-5">
              برای مشاهده محتوای این درس لطفا ابتدا نسبت به خرید این محصول اقدام
              نمایید
            </p>

            <NextLink
              className="font-medium flex items-center text-blue-500 dark:text-text-dark-1"
              href={`/product/product-${(data as any).product?.id}`}
            >
              خرید محصول
              <IconArrowLeftShort className="mr-3" width={24} height={24} />
            </NextLink>
          </Paper>
        </div>
      ) : (
        <div className="min-h-[500px] flex items-center justify-center">
          <p>دریافت اطلاعات با مشکل مواجه شد.</p>
        </div>
      )}
    </React.Fragment>
  );
}
