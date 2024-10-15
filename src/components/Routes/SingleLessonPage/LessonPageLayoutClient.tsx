"use client";

import LayoutLoading from "@/components/Assets/LayoutLoading";
import dynamic from "next/dynamic";
import React from "react";
import { LessonPageLayoutProps } from "./LessonPageLayout";

const LessonPageLayout = dynamic(() => import("./LessonPageLayout"), {
  loading: () => <LayoutLoading />,
});

export default function LessonPageLayoutClient(props: LessonPageLayoutProps) {
  return <LessonPageLayout {...props} />;
}
