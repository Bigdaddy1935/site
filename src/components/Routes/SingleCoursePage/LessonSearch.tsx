import IconSearch from "@/components/Icons/IconSearch";
import useNextRouter from "@/hooks/useNextRouter";
import React, { useEffect, useState } from "react";

export default function LessonSearch({setSearch} : {setSearch : (s : string)=>void}) {
    const [s, setS] = useState("");
    const router = useNextRouter();

  useEffect(() => {
    const handleSearch = setTimeout(() => setSearch(s), 300);
    return () => clearTimeout(handleSearch);
  }, [s]);
  return (
    <div className="items-stretch relative mb-4  rounded-md">
      <input
        placeholder={"جستجوی درس ها..."}
        className="border-2 appearance-none text-sm pl-2 p-2 rounded-lg outline-0 w-full border-solid dark:border-mdark-600 dark:bg-mdark-600 dark:text-text-dark-5 border-primary-50 focus:border-primary-300"
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
