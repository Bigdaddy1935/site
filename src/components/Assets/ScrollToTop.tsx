"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function ScrollToTop() {
  const patchName = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [patchName]);
  return <div></div>;
}
