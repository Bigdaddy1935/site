import UserHeader from "@/components/Layout/UserHeader";
import UserLayoutClient from "@/components/Routes/User/UserLayoutClient";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayoutClient>{children}</UserLayoutClient>;
}
