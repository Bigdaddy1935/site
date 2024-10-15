import React from "react";
import IconLoading from "../Icons/IconLoading";

export default function LayoutLoading({ color }: { color?: boolean }) {
  return (
    <div className="fixed z-[999999999]  bg-black/15 flex items-center justify-center top-0 right-0 w-screen h-screen">
      <IconLoading
        width={36}
        height={36}
        className={`${color ? "text-rose-900" : "text-primary-100"}`}
      />
    </div>
  );
}
