"use client";

import LayoutLoading from "@/components/Assets/LayoutLoading";
import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const UserLayoutContainer = dynamic(() => import("./UserLayoutContainer"), {
  loading: () => <LayoutLoading />,
});
export default function UserLayoutClient(props: PropsWithChildren) {
  return <UserLayoutContainer {...props} />;
}
