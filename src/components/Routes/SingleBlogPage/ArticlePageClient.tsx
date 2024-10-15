"use client";
import React, { Suspense } from "react";
import { ArticlePageLayoutProps } from "./ArticlePageLayout";
import dynamic from "next/dynamic";
import LayoutLoading from "@/components/Assets/LayoutLoading";

const ArticlePageLayout = dynamic(() => import("./ArticlePageLayout"), {
  ssr: false,
  loading: () => <LayoutLoading color />,
});
export default function ArticlePageClient(props: ArticlePageLayoutProps) {
  return (
      <ArticlePageLayout {...props} />
  );
}
