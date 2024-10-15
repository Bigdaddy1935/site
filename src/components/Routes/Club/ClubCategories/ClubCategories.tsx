"use client";

import useGetMorOnScroll from "@/hooks/useGetMorOnScroll";
import CategoryListSidebar from "./CategoryListSidebar";
import { useClubContext } from "./ClubCategoreisContext";
import ClubTabs from "./ClubTabs";
import { useEffect } from "react";
import PodcastCard from "@/components/PodcastCard";
import CourseCard from "@/components/CourseCard";
import PodcastCartSkeleton from "@/components/PodcastCard/PodcastCartSkeleton";
import CourseCartSkeleton from "@/components/CourseCard/CourseCartSkeleton";
import EmptyGrid from "@/components/Assets/EmptyGrid";
import ClubSearch from "./ClubSearch";
import ClubLessons from "./ClubLessons";
import { useAppSelector } from "@/lib/reduxHooks";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import ClubQuestions from "./ClubQuestions";
import IconLock from "@/components/Icons/IconLock";
import Image from "@/components/Assets/Image";

export default function ClubCategories() {
  const { activeTab, activeContent } = useClubContext();
  const user = useAppSelector(selectUser);
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-[5%]">
      <div className=" lg:w-[240px] max-lg:mb-5 lg:sticky top-[90px]">
        {user?.authority || user?.mahdyar ? <ClubSearch /> : null}
        <CategoryListSidebar />
      </div>

      <div className="flex-1 max-w-screen-lg">
        <ClubTabs />

        {activeContent === "lessons" ? (
          <ClubLessons />
        ) : user?.authority || user?.mahdyar ? (
          <ClubQuestions />
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <Image width={200} height={200} alt="" src={"/auth.svg"} />
            <p className="text-hgray-400 dark:text-text-dark-3 font-medium text-lg">
              فقط کاربران مهدیارشو امکان مشاهده این قسمت را دارند
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
