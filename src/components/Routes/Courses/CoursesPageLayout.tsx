import ArchiveLayout from "@/components/ArchiveLayout";
import { FilterType } from "@/components/ArchiveLayout/FilterContext";
import Container from "@/components/Assets/Container";
import { CourseListItem } from "@/types";
import { PaginateData } from "@/types/response";
import React from "react";

export type CoursesPageLayoutProps = {
  courses: PaginateData<CourseListItem>;
  filters: FilterType;
};

export default function CoursesPageLayout({
  courses,
  filters,
}: CoursesPageLayoutProps) {
  return (
    <Container>
      <ArchiveLayout
        pageType="course"
        mostLikes
        pageTitle="دوره ها"
        data={courses.data}
        filters={filters}
        filterKeys={{
          course_title: "search",
          course_teacher: "teacher",
          categories: "categoryId",
        }}
      />
    </Container>
  );
}
