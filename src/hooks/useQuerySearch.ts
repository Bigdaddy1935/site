"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function useQuerySearch(showParams: boolean = true): any {
  const params = useParams();
  const teacher = useSearchParams().get("teacher");
  const search = useSearchParams().get("search");

  const teacherId = teacher ? teacher : null;

  const categoryId = params?.slug
    ? (params.slug as string).split("-").pop()
    : null;
  const teacherName = teacher
    ? teacher.split("_").slice(0, -1).join(" ")
    : null;

  if (showParams) {
    return {
      ...(categoryId ? { categoryId: params.slug } : {}),
      ...(teacherId ? { user_id: teacherId } : {}),
      ...(search ? { search: search } : {}),
    };
  }

  return {
    teacher: teacher ? teacherName : null,
    search,
    categoryId: categoryId,
  };
}
