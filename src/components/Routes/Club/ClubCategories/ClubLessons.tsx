"use client";
import CourseCard from "@/components/CourseCard";
import React, { useEffect } from "react";
import { useClubContext } from "./ClubCategoreisContext";
import useGetMorOnScroll from "@/hooks/useGetMorOnScroll";
import EmptyGrid from "@/components/Assets/EmptyGrid";
import CourseCartSkeleton from "@/components/CourseCard/CourseCartSkeleton";

export default function ClubLessons() {
  const { activeTab, activeContent, search } = useClubContext();
  const { loading, data, showEnd, ref, fetchInitData, currentPage } =
    useGetMorOnScroll({
      route: search
        ? {
            url: `/home/club/courses/search/${activeTab}`,
            method: "post",
          }
        : {
            url: `/categories/get/clubs/${activeTab}`,
            method: "get",
          },

      params: {
        search: search ?? undefined,
      },
    });

  useEffect(() => {
    if (activeTab) fetchInitData();
  }, [activeTab, activeContent, search]);
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mb-8">
        {data.map((item, index) => (
          <CourseCard {...item} key={index} />
        ))}
      </div>
      <div ref={ref} />
      {loading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseCartSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {data.length === 0 && currentPage > 0 ? <EmptyGrid /> : null}
    </div>
  );
}
