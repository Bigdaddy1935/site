"use client";
import { useSearchQuery } from "@/lib/services/base";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SearchData } from "@/types/";
import usePopup from "@/hooks/usePopup";

export type Tab =
  | "course"
  | "article"
  | "lesson"
  | "product"
  | "podcast"
  | "all"
  | null;

export const tabs: { title: string; value: Tab }[] = [
  {
    title: "همه",
    value: "all",
  },
  {
    title: "دوره ها",
    value: "course",
  },
  {
    title: "مقالات",
    value: "article",
  },
  {
    title: "رسانه",
    value: "lesson",
  },
  {
    title: "محصولات",
    value: "product",
  },
  {
    title: "پادکست",
    value: "podcast",
  },
];

type SearchBoxContextType = {
  activeTab: Tab;
  setActiveTab: (s: Tab) => void;
  searchTerm: string | null;
  setSearchTerm: (s: string | null) => void;
  searchData: SearchData;
  setSearchData: (data: SearchData) => void;
  s: string;
  setS: (s: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  startSearch: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  wrapperRef?: React.MutableRefObject<any>;
};
export const SearchBoxContext = createContext<SearchBoxContextType>({
  activeTab: "all",
  setActiveTab: () => {},
  searchTerm: null,
  setSearchTerm: () => {},
  searchData: {
    article: [],
    course: [],
    lesson: [],
    podcast: [],
    product: [],
  },
  setSearchData: (d: SearchData) => {},
  s: "",
  setS: (s: string) => {},
  isLoading: false,
  isSuccess: false,
  startSearch: false,
  open: false,
  setOpen: () => {},
});

export const useSearchBox = () => useContext(SearchBoxContext);

export default function SearchBoxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [s, setS] = useState<string>("");
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchData>({
    article: [],
    course: [],
    podcast: [],
    lesson: [],
    product: [],
  });
  const { open, setOpen, wrapperRef } = usePopup();

  const { data, isLoading, isSuccess, isFetching } = useSearchQuery(
    {
      search: searchTerm as string,
    },
    {
      skip: !searchTerm,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setSearchData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess && !startSearch) {
      setStartSearch(true);
    }
  }, [isSuccess]);

  return (
    <SearchBoxContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        searchData,
        setSearchData,
        s,
        setS,
        isLoading: isLoading || isFetching,
        isSuccess: isSuccess,
        startSearch,
        open,
        setOpen,
        wrapperRef,
      }}
    >
      {children}
    </SearchBoxContext.Provider>
  );
}
