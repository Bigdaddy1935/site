"use client";
import { Suspense } from "react";
import SearchBox from "./SearchBox";
import TeacherSelect from "./TeacherSelect";
import { ArchivePage } from "./types";
import CategoryList from "./CategoryList";

type Props = {
  title: string;
  pageType: ArchivePage;
  teacherSelectHidden?: boolean | undefined;
  searchHidden?: boolean;
};
export default function ArchiveSidebar(props: Props) {
  const { title, pageType, teacherSelectHidden, searchHidden } = props;

  return (
    <div className="left-0 top-20 flex w-full flex-col  gap-y-6 lg:sticky lg:w-[300px] lg:min-w-[250px] lg:self-start">
      <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-100 lg:text-6xl">
        {title}
      </h3>

      {!searchHidden && <SearchBox pageType={pageType} />}

      {!teacherSelectHidden && <TeacherSelect />}
        <CategoryList pageType={pageType} />
    </div>
  );
}
