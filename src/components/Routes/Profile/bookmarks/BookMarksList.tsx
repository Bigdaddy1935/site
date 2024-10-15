"use client";
import EmptyGrid from "@/components/Assets/EmptyGrid";
import BlogCart from "@/components/BlogCard";
import BlogCartSkeleton from "@/components/BlogCard/BlogCartSkeleton";
import ClassCard from "@/components/ClassCard";
import ClassCartSkeleton from "@/components/ClassCard/ClassCartSkeleton";
import CourseCard from "@/components/CourseCard";
import CourseCartSkeleton from "@/components/CourseCard/CourseCartSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductCartSkeleton from "@/components/ProductCard/ProductCartSkeleton";
import { useGetBookMarksQuery } from "@/lib/services/auth";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import BookMarkTabs, { ActiveTab } from "./BookMarkTabs";
import PodcastCartSkeleton from "@/components/PodcastCard/PodcastCartSkeleton";
import PodcastCard from "@/components/PodcastCard";
import BookMarkCart from "./BookMarkCart";

const lessonKeys = ["podcast", "tv", "media", "lessons"];
export default function BookMarksList() {
  const { isLoading, data } = useGetBookMarksQuery();
  const activeTabQuery = useSearchParams().get("tab");
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    activeTabQuery ? (activeTabQuery as ActiveTab) : "courses"
  );

  const getCurrentActiveTabData = () => {
    if (!data) return [];

    if (!lessonKeys.includes(activeTab))
      return typeof data?.[activeTab] !== undefined ? data?.[activeTab] : [];

    if (activeTab === "lessons")
      return data?.["lessons"].filter((i) =>
        ["course", "product"].includes(i?.courses?.type)
      );
    if (activeTab === "media")
      return data?.["lessons"].filter((i) =>
        ["kolbe", "mahdyar", "media"].includes(i?.courses?.type)
      );

    return data?.["lessons"].filter((i) => i?.courses?.type === activeTab);
  };

  const renderCurrentActiveTabContent = useMemo(() => {
    const tabData = getCurrentActiveTabData();

    if (tabData.length === 0) return <EmptyGrid />;

    return tabData.map((item) => (
      <BookMarkCart key={item.id} cartType={activeTab} item={item} />
    ));
  }, [data, activeTab]);
  return (
    <div>
      <BookMarkTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-[1%] gap-y-10 justify-between my-10">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, index) => {
              if (activeTab === "courses") return <CourseCartSkeleton />;
              if (activeTab === "articles") return <BlogCartSkeleton />;
              if (activeTab === "products") return <ProductCartSkeleton />;
              if (activeTab === "podcast") return <PodcastCartSkeleton />;
              if (lessonKeys.includes(activeTab)) return <ClassCartSkeleton />;
            })}
          </>
        ) : (
          renderCurrentActiveTabContent
        )}
      </div>
    </div>
  );
}
