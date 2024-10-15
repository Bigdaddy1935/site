"use client";
import React, { Suspense } from "react";
import { CoursePageLayoutProps } from "./CoursePageLayout";
import dynamic from "next/dynamic";
import LayoutLoading from "@/components/Assets/LayoutLoading";

const CoursePageLayout = dynamic(() => import("./CoursePageLayout"), {
  ssr: false,
  loading: () => <LayoutLoading color />,
});
export default function CoursePageClient(props: CoursePageLayoutProps) {
  return (
      <CoursePageLayout {...props} />
  );
}
