"use client";

import LayoutLoading from "@/components/Assets/LayoutLoading";
import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const ProfileLayoutContainer = dynamic(
  () => import("./ProfileLayoutContainer"),
  {
    loading: () => <LayoutLoading />,
  }
);
export default function ProfileLayoutClient(props: PropsWithChildren) {
  return <ProfileLayoutContainer {...props} />;
}
