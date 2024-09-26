"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import Paper from "@/components/Assets/Paper";
import React from "react";
import { ClubContent, useClubContext } from "./ClubCategoreisContext";
import { twMerge } from "tailwind-merge";

const tabItems = [
  {
    key: "lessons",
    label: "سرفصل ها",
  },
  {
    key: "questions",
    label: "پرسش و پاسخ",
  },
];
export default function ClubTabs() {
  const { setActiveContent, activeContent } = useClubContext();
  return (
    <Paper className="w-full py-1.5 sticky top-[70px] z-40 max-w-full overflow-x-auto scroll-hidden mb-5">
      <div className="flex items-center">
        {tabItems.map((item) => (
          <EmptyButton
            key={item.key}
            onClick={() => setActiveContent(item.key as ClubContent)}
            className={twMerge(
              `p-3 text-hgray-600 dark:text-text-dark-4 text-sm font-medium transition-colors flex-1`,
              activeContent === item.key &&
                "text-white  bg-primary-300 rounded-md"
            )}
          >
            {item.label}
          </EmptyButton>
        ))}
      </div>
    </Paper>
  );
}
