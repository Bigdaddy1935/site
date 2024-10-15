"use client";
import useNextRouter from "@/hooks/useNextRouter";
import { KeyValue } from "@/types";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export type FilterType = {
  categoryId?: number | null;
  teacher?: string | null;
  search?: string | null;
};

type FiltersKeys = {
  search?: string;
  teacher?: string;
};

type FilterContext = {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  handleSetFilters: (filters: FilterType) => void;
};

export const FilterContext = createContext<FilterContext>({
  filters: {},
  setFilters: () => {},
  handleSetFilters: () => {},
});

export default function FilterProvider({
  children,
  filters: filtersProps,
  filterKeys = {
    search: "search",
    teacher: "teacher",
  },
}: {
  children: React.ReactNode;
  filterKeys?: FiltersKeys;
  filters?: FilterType;
}) {
  const [filters, setFilters] = useState<FilterType>({});
  const searchParams = useSearchParams();
  const router = useNextRouter();
  const { slug } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const category = (slug as string)?.split("-").pop() ?? null;
    const search = searchParams.get("search") ?? null;
    const teacher = searchParams.get("teacher") ?? null;

    setFilters({
      categoryId: Number(category?.split("-").pop()),
      search,
      teacher: teacher?.split("_").pop(),
    });
  }, [slug, searchParams]);


  const handleSetFilters = (selectedfilter: FilterType) => {
    const allFilters = { ...filters, ...selectedfilter };
    let queryStr = "";
    delete allFilters?.categoryId;
    for (const key in allFilters) {
      const value = (allFilters as KeyValue)[key];

      if (value === undefined || value === null || value === "") continue;
      const sign = queryStr?.length > 0 ? "&" : "?";
      queryStr += `${sign}${key}=${value}`;
    }
    //  router.push();
    router?.replace(`${pathname}${queryStr}`);
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, handleSetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => useContext(FilterContext);
