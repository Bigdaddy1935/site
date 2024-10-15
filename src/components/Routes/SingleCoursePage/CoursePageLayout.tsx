import Container from "@/components/Assets/Container";
import React from "react";
import CourseHeader from "./CourseHeader";
import { CommentItem, CourseItem } from "@/types";
import { PaginateData } from "@/types/response";
import Hidden from "@/components/Assets/Hidden";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import QuizStartButton from "./Quiz/QuizStartButton";
import CourseStartButton from "./CourseStartButton";
import LessonsList from "./LessonsList";
import Comments from "@/components/Comments";
import { isExists } from "@/lib/utils";
import VideoPlayer from "@/components/Assets/VideoPlayer";
import Image from "@/components/Assets/Image";
import CourseDetails from "./CourseDetails";

export type CoursePageLayoutProps = {
  course: CourseItem;
  courseComments: PaginateData<CommentItem>;
};

export default function CoursePageLayout({
  course,
  courseComments,
}: CoursePageLayoutProps) {
  return (
    <Container className="my-10 flex flex-col-reverse lg:flex-row lg:justify-between">
      <div className="lg:w-[50%] lg:flex-1">
        <CourseHeader
          title={course?.course_title}
          description={course?.description}
          categories={course?.categories}
          type="course"
        />

        <Hidden hidden="lg">
          <HeaderSetTitle label={course?.course_title} />
        </Hidden>

        {course?.type === "club" ? (
          <QuizStartButton {...course} />
        ) : (
          <CourseStartButton courseProgress={course?.courseProgress} />
        )}

        <LessonsList type={course?.type} courseId={course.id} />

        <Comments
          model="course"
          id={Number(course.id)}
          type="App\Models\Course"
          comments={courseComments}
        />
      </div>
      <div className="top-[100px] lg:sticky lg:w-[50%] lg:flex-1 lg:self-start lg:p-6">
        {isExists(course?.intro) ? (
          <VideoPlayer poster={course.picture} src={course?.intro!} />
        ) : (
          <div className="relative overflow-hidden rounded-md">
            <Image
              style={{ width: "100%", height: "auto" }}
              width={600}
              height={399}
              src={course?.picture}
              alt={course?.course_title}
            />
          </div>
        )}

        <CourseDetails {...course} />
      </div>
    </Container>
  );
}
