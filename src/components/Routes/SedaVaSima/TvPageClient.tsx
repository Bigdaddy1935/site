"use client";
import React from "react";
import { TvPageLayoutProps } from "./TvPageLayout";
import dynamic from "next/dynamic";
import LayoutLoading from "@/components/Assets/LayoutLoading";

const TvPageLayout = dynamic(() => import("./TvPageLayout"), {
  ssr: false,
  loading: () => <LayoutLoading color />,
});
export default function TvPageClient(props: TvPageLayoutProps) {
  return <TvPageLayout {...props} />;
}
