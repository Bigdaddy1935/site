"use client";
import React, { useEffect, useState } from "react";
import NextLink from "../Assets/NextLink";
import IconNewsLetter from "../Icons/IconNewsLetter";
import { useGetNewsQuery } from "@/lib/services/base";

export default function NewsButton() {
  const { isLoading, data } = useGetNewsQuery();

  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      const lastIndex = localStorage.getItem("last-news-id") ?? "0";
      const lastDataIndex = data.at(-1);
      if (lastDataIndex && lastIndex) {
        if (Number(lastIndex) < lastDataIndex.id) {
          setCount(() => data.map((i) => i.id > Number(lastIndex)).length);
        } else {
          setCount(null);
        }
      }
    }
  }, [data]);
  return (
    <NextLink
      className="flex items-center px-2 py-3 text-hgray-600 dark:text-white lg:py-1.5 lg:hover:text-primary-300 dark:hover:text-primary-100"
      href={"/news"}
    >
      <IconNewsLetter width={22} height={22} />

      <span className="mr-4 flex-1 text-base">اخبار جدید</span>

      {count && (
        <span className="w-4 h-4 text-xs flex items-center bg-rose-700 text-center justify-center rounded-full text-white">
          {count}
        </span>
      )}
    </NextLink>
  );
}
