"use client";
import { useLazyGetClubsQuery } from "@/lib/services/mahdyar";
import { CourseListItem, KeyValue, PodcastListItem } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type ClubContent = "lessons" | "questions";

export type ContextData = {
  activeTab: number | null;
  setActiveTab: (a: number) => void;
  activeContent: ClubContent;
  setActiveContent: (c: ClubContent) => void;
  search : string;
  setSearch : (s : string)=>void
};
const Context = createContext<ContextData>({
  activeTab: null,
  setActiveTab: () => {},
  activeContent: "lessons",
  setActiveContent: () => {},
  search : "",
  setSearch : (s : string) => {}
});

export const useClubContext = () => useContext(Context);

export default function ClubProvider({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const [activeContent, setActiveContent] = useState<ClubContent>("lessons");
  const [search, setSearch] = useState("");



  return (
    <Context.Provider
      value={{
        activeContent,
        setActiveContent,
        setActiveTab,
        activeTab,
        search,
        setSearch
      }}
    >
      {children}
    </Context.Provider>
  );
}
