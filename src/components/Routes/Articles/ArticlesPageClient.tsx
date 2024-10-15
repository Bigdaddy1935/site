"use client";

import dynamic from "next/dynamic";
import { ArticlesPageLayoutProps } from "./ArticlesPageLayout";
import LayoutLoading from "@/components/Assets/LayoutLoading";

const ArticlesPageLayout = dynamic(() => import("./ArticlesPageLayout"), {
  ssr: false,
  loading: () => <LayoutLoading color />,
});
export default function ArticlesPageClient(props: ArticlesPageLayoutProps) {
  return (
      <ArticlesPageLayout {...props} />
  );
}
