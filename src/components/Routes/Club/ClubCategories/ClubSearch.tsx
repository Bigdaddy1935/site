"use client";
import TextInput from "@/components/Assets/TextInput";
import React, { useEffect, useState } from "react";
import { useClubContext } from "./ClubCategoreisContext";
import IconSearch from "@/components/Icons/IconSearch";

export default function ClubSearch() {
  const { setSearch, activeContent } = useClubContext();
  const [s, setS] = useState("");

  useEffect(() => {
    const handleSearch = setTimeout(() => setSearch(s), 300);
    return () => clearTimeout(handleSearch);
  }, [s]);
  return (
    <div className="items-stretch relative mb-4  rounded-md">
      <input
        placeholder={
          activeContent === "lessons"
            ? "جستجوی سرفصل ها..."
            : "جستجوی پرسش ها..."
        }
        className="border-2 appearance-none text-sm pl-2 p-2 rounded-lg outline-0 w-full border-solid border-primary-50 focus:border-primary-300"
        type="search"
        value={s}
        onChange={(e) => setS(e.target.value)}
      />

      <IconSearch
        className="absolute left-1 top-[50%] translate-y-[-50%] text-primary-50"
        width={22}
        height={22}
      />
    </div>
  );
}
