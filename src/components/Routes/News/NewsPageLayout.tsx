"use client";
import Hidden from "@/components/Assets/Hidden";
import PageTitle from "@/components/Assets/PageTitle";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import React, { useEffect } from "react";
import NewsItems from "./NewsItem";
import { NewsItem } from "@/types";

export default function NewsPageLayout({ items }: { items: NewsItem[] }) {
  useEffect(() => {
    if (items) {
      const lastIndex = localStorage.getItem("last-news-id") ?? "0";
      const lastDataIndex = items.at(-1);

      if (lastDataIndex && lastIndex) {
        if (Number(lastIndex) < lastDataIndex.id) {
          localStorage.setItem("last-news-id", String(lastDataIndex.id));
        }
      }
    }
  }, [items]);
  return (
    <div className="my-10 flex-col">
      <PageTitle title="اخبار جدید" />
      <Hidden hidden="lg">
        <HeaderSetTitle label="اخبار جدید" />
      </Hidden>
      <div className="mt-16 flex flex-col gap-5">
        {items.map((i) => (
          <NewsItems key={i.id} {...i} />
        ))}
      </div>
    </div>
  );
}
