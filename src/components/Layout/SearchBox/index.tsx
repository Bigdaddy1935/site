"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import Hidden from "@/components/Assets/Hidden";
import TextInput from "@/components/Form/TextField/TextInput";
import IconLoading from "@/components/Icons/IconLoading";
import IconSearch from "@/components/Icons/IconSearch";
import usePopup from "@/hooks/usePopup";
import React, { useEffect } from "react";
import DesktopPopup from "../DesktopPopup";
import MobileContent from "./MobileContent";
import { useSearchBox } from "./SearchBoxProvider";
import SerachTabs from "./SerachTabs";
import TabContent from "./TabContent";
import { usePathname } from "next/navigation";

export default function SearchBox({ homePage }: { homePage?: boolean }) {

  const patchname = usePathname();
  const {
    activeTab,
    setSearchTerm,
    searchData,
    isSuccess,
    s,
    setS,
    isLoading,
    open,
    setOpen,
    wrapperRef
  } = useSearchBox();

  useEffect(() => {
    const handle = setTimeout(() => s.length > 2 && setSearchTerm(s), 300);

    return () => clearInterval(handle);
  }, [s]);

  useEffect(() => {
    if (isSuccess) setOpen(true);
  }, [isSuccess]);

  const content = (
    <div ref={wrapperRef} className="w-full">
      <SerachTabs />

      {activeTab === "all" ? (
        <TabContent
          items={[
            ...searchData.course.map((i) => ({
              id: i.id,
              category: i.categories[0],
              title: i?.course_title,
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
              title: i.courses?.course_title,
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
      ) : null}
      {activeTab === "course" ? (
        <TabContent
          items={searchData.course.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i?.course_title,
            href: `/course/course-${i.id}`,
          }))}
        />
      ) : null}
      {activeTab === "article" ? (
        <TabContent
          items={searchData.article.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i.title,
            href: `/article/content-${i.id}`,
          }))}
        />
      ) : null}

      {activeTab === "product" ? (
        <TabContent
          items={searchData.product.map((i) => ({
            id: i.id,
            category: i.categories[0],
            title: i?.courses?.course_title,
            href: `/product/product-${i.id}`,
          }))}
        />
      ) : null}
      {activeTab === "podcast" ? (
        <TabContent
          items={searchData.podcast.map((i) => ({
            id: i.id,
            category: i.courses.categories[0],
            title: i.title,
            href: `/lessons/${i.course_id}-${i.id}`,
          }))}
        />
      ) : null}
      {activeTab === "lesson" ? (
        <TabContent
          items={searchData.lesson.map((i) => ({
            id: i.id,
            category: i.courses?.categories?.[0],
            course: i.courses,
            title: i.title,
            model: i.model,
            href: `/lessons/${i.course_id}-${i.id}`,
          }))}
        />
      ) : null}
    </div>
  );

  return (
    <React.Fragment>
      <Hidden hidden="max-lg">
        <SearchInput />
        <DesktopPopup
          innerClassName="lg:px-6"
          className={`${open ? "lg:!top-[120px] lg:!opacity-100 lg:z-[99]" : "lg:hover:top-[-100%]"}`}
        >
          {content}
        </DesktopPopup>
      </Hidden>

      <Hidden hidden="lg">
        {homePage ? (
          <SearchInput />
        ) : (
          <EmptyButton onClick={() => setOpen(!open)}>
            <IconSearch className="left-2 top-2 h-[28px] w-[28px] text-primary-400" />
          </EmptyButton>
        )}

        {open ? (
          <div
            ref={wrapperRef}
            className="fixed bottom-0 left-0  right-0 top-[65px] z-50 overflow-y-auto rounded-2xl bg-white px-3 py-7 shadow-lg dark:bg-mdark-600"
          >
            <div className="relative  overflow-hidden rounded-md border border-solid border-hgray-300 dark:border-mdark-400">
              <TextInput
                onChange={(e) => setS(e.target.value.trim())}
                className="border-0 py-2 pr-1 text-size-4 text-primary-700 placeholder:text-primary-700 dark:text-white dark:placeholder:text-white"
                placeholder="جستجو"
                value={s}
              />
              {isLoading ? (
                <IconLoading className="absolute left-2 top-2 h-[24px] w-[24px] text-primary-400" />
              ) : (
                <IconSearch className="absolute left-2 top-2 h-[24px] w-[24px] text-primary-400" />
              )}
            </div>
            <div className="scroll-hidden mt-10 h-[80%] overflow-y-auto">
              <MobileContent />
            </div>
          </div>
        ) : null}
      </Hidden>
    </React.Fragment>
  );
}

export function SearchInput() {
  const { setS, isLoading } = useSearchBox();
  return (
    <div className="relative w-full overflow-hidden rounded-md border-hgray-300 p-1 dark:border-mdark-400">
      <TextInput
        onChange={(e) => setS(e.target.value.trim())}
        className="h-[36px] lg:w-full p-1 pr-2 text-size-4 text-primary-700 outline-1 placeholder:text-sm placeholder:text-primary-100 dark:text-white dark:placeholder:text-white"
        placeholder="جستجو..."
      />
      {isLoading ? (
        <IconLoading className="absolute left-2 top-2.5 h-[24px] w-[24px] text-primary-400" />
      ) : (
        <IconSearch className="absolute left-1 top-2.5 h-[24px] w-[24px] text-primary-400" />
      )}
    </div>
  );
}
