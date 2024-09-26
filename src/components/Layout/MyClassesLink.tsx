"use client";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import React from "react";
import NextLink from "../Assets/NextLink";
import IconClassTeacher from "../Icons/IconClassTeacher";

export default function MyClassesLink() {
  const user = useAppSelector(selectUser);
  return user ? (
    <NextLink
      className="flex items-center px-2 py-3 text-hgray-600 dark:text-white lg:py-1.5 lg:hover:text-primary-300"
      href={"/profile/my-class"}
    >
      <IconClassTeacher width={22} height={22} />

      <span className="mr-4 text-base">{"کلاس های من"}</span>
    </NextLink>
  ) : null;
}
