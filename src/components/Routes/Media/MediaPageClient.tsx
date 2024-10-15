"use client";

import LayoutLoading from "@/components/Assets/LayoutLoading";
import dynamic from "next/dynamic";
import React from "react";
import { MediaPageLayoutProps } from "./MediaPageLayout";

const MediaPageLayout = dynamic(() => import("./MediaPageLayout"), {
  ssr: false,
  loading: () => <LayoutLoading color />,
});
export default function MediaPageClient(props: MediaPageLayoutProps) {
  return <MediaPageLayout {...props} />;
}
