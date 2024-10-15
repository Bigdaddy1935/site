"use client";
import { useGetCategoresQuery } from "@/lib/services/base";
import React, { useEffect } from "react";
import { useClubContext } from "./ClubCategoreisContext";
import EmptyButton from "@/components/Assets/EmptyButton";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";

export default function CategoryListSidebar() {
  const { activeTab, setActiveTab } = useClubContext();
  const { data } = useGetCategoresQuery();

  useEffect(() => {
    if (data && data?.length > 0) setActiveTab(data[0].id);
  }, [data]);
  return (
    <div className="flex flex-row lg:flex-col gap-2 lg:gap-7">
      {data
        ?.filter((i) => i.slug !== "startup-studio")
        .map((cat) => (
          <div
            key={cat.id}
            className={`group max-lg:flex-1 lg:w-full cursor-pointer rounded-lg bg-hgray-200 p-3  dark:bg-mdark-400 ${activeTab === cat.id && "bg-primary-50 dark:bg-mdark-600"}`}
          >
            <div
              onClick={() => setActiveTab(cat.id)}
              className="flex items-center justify-between w-full  text-lg text-hgray-600 dark:text-white"
            >
              <div className="flex items-center w-full gap-4">
                <span className="flex-1 inline-block text-sm max-lg:text-center">
                  {cat.name}
                </span>
                <EmptyButton className="max-lg:hidden">
                  <IconChevronLeft
                    width={28}
                    height={28}
                    className={`text-primary-300`}
                  />
                </EmptyButton>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
