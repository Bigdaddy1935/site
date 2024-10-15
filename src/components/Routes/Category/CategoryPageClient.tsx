"use client";
import ClientOnly from "@/components/Assets/ClientOnly";
import LayoutLoading from "@/components/Assets/LayoutLoading";
import IconLoading from "@/components/Icons/IconLoading";
import { CategoryPageLayoutProps } from "@/components/Routes/Category/CategoryPageLayout";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const CategoryPageLayout = dynamic(
  () => import("@/components/Routes/Category/CategoryPageLayout"),
  { ssr: false, loading: () => <LayoutLoading color /> }
);

export default function CategoryPageClient(props: CategoryPageLayoutProps) {
  return (
    <ClientOnly>
      <CategoryPageLayout {...props} />
    </ClientOnly>
  );
}
