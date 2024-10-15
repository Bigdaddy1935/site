"use client";
import ContentBox from "@/components/Assets/ContentBox";
import EmptyButton from "@/components/Assets/EmptyButton";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import { useMemo } from "react";
import { tabs, useSearchBox } from "./SearchBoxProvider";
import TabContent from "./TabContent";

export default function MobileContent() {
  const { searchData, activeTab, setActiveTab, isLoading, startSearch } =
    useSearchBox();

  const tabContent = useMemo(() => {
    if (activeTab === "all")
      return (
        <TabContent
          items={[
            ...searchData.course.map((i) => ({
              id: i.id,
              category: i.categories[0],
              title: i.course_title,
              href: `/course/course-${i.id}`,
              model: i.model,
            })),
            ...searchData.article.map((i) => ({
              id: i.id,
              category: i.categories[0],
              title: i.title,
              href: `/article/content-${i.id}`,
              model: i.model,
            })),
            ...searchData.product.map((i) => ({
              id: i.id,
              category: i.categories[0],
              title: i?.courses?.course_title,
              href: `/product/product-${i.id}`,
              model: i.model,
            })),
            ...searchData.podcast.map((i) => ({
              id: i.id,
              category: i.categories[0],
              title: i.title,
              href: `/lessons/${i.course_id}-${i.id}`,
              model: i.model,
            })),
            ...searchData.lesson.map((i) => ({
              id: i.id,
              category: i.courses?.categories?.[0],
              title: i.title,
              href: `/lessons/${i.course_id}-${i.id}`,
              model: i.model,
            })),
          ]}
        />
      );
    if (activeTab === "course")
      return (
        <TabContent
          items={searchData.course.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i?.course_title,
            href: `/course/course-${i.id}`,
          }))}
        />
      );

    if (activeTab === "article")
      return (
        <TabContent
          items={searchData.article.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i.title,
            href: `/article/content-${i.id}`,
          }))}
        />
      );

    if (activeTab === "product")
      return (
        <TabContent
          items={searchData.product.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i.courses?.course_title,
            href: `/product/product-${i.id}`,
          }))}
        />
      );
    if (activeTab === "podcast")
      return (
        <TabContent
          items={searchData.podcast.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i.courses?.course_title,
            href: `/lessons/${i.course_id}-${i.id}`,
          }))}
        />
      );
    if (activeTab === "lesson")
      return (
        <TabContent
          items={searchData.lesson.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i.courses?.course_title,
            href: `/lessons/${i.course_id}-${i.id}`,
          }))}
        />
      );

    return null;
  }, [activeTab, searchData]);
  return (
    <div>
      {!startSearch || isLoading ? (
        <p>در حال جستجوی اطلاعات...</p>
      ) : (
        tabs.map((tab) => (
          <div key={tab.value}>
            <EmptyButton
              className="flex w-full text-hgray-500 dark:text-hgray-200 justify-between items-center border-b border-solid border-hgray-200 dark:border-mdark-500 py-5"
              onClick={() =>
                setActiveTab(activeTab === tab.value ? null : tab.value)
              }
            >
              <span>{tab.title}</span>

              <IconDownOpen
                width={22}
                height={22}
                className={`${activeTab === tab.value && "rotate-180"}`}
              />
            </EmptyButton>

            <ContentBox minHeight={200} open={activeTab === tab.value}>
              {tabContent}
            </ContentBox>
          </div>
        ))
      )}
    </div>
  );
}
