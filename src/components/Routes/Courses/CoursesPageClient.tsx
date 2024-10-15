"use client";

import dynamic from "next/dynamic";
import { CoursesPageLayoutProps } from "./CoursesPageLayout";
import LayoutLoading from "@/components/Assets/LayoutLoading";

const CoursesPageLayout = dynamic(() => import("./CoursesPageLayout"), {
  ssr: false,
  loading: () => <LayoutLoading color />,
});
export default function CoursesPageClient(props: CoursesPageLayoutProps) {
  return (
      <CoursesPageLayout {...props} />
  );
}
