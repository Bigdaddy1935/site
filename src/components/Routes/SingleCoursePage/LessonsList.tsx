"use client";
import BoxButton from "@/components/Assets/BoxButton";
import Skeleton from "@/components/Assets/Skeleton";
import { Post, Query } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { LessenItem, Model } from "@/types/";
import { PaginateData } from "@/types/response";
import LessonItem from "./LessonItem";
import LessonListTab, { TabType } from "./LessonListTab";
import MorLessonItem from "./MorLessonItem";
import LessonSearch from "./LessonSearch";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { setQuiz } from "@/lib/reduxFeatures/headerSlice";
import { selectUser } from "@/lib/reduxFeatures/authSlice";

type ClubLessonRes = { quiz: boolean; lessons: PaginateData<LessenItem> };
type Props = {
  courseId: string | number;
  invoices_exists?: boolean;
  type?: Model;
};
export default function LessonsList(props: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { courseId, type = "course", invoices_exists } = props;
  const [lessonList, setLessonList] = useState<LessenItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleUpdateData = useCallback(() => {
    setLoading(true);
    const url = search.trim().length
      ? `/home/club/lessons/search/${courseId}?search=${search}`
      : activeTab === "all"
        ? `/lessons/get/${type === "club" && currentPage === 0 ? "clubId" : "courseId"}/${courseId}`
        : `/lessons/get/${activeTab}/by_course_id/${courseId}`;

    const func = search.trim().length > 0 ? Post : Query;
    func<PaginateData<LessenItem> | ClubLessonRes>(url)
      .then((res) => {
        if (typeof res === "boolean") return;
        const lessonsRes =
          type === "club" && currentPage === 0
            ? (res as ClubLessonRes).lessons
            : (res as PaginateData<LessenItem>);

        if (type === "club" && currentPage === 0)
          dispatch(setQuiz((res as ClubLessonRes).quiz));

        setLessonList((prev) => [...lessonsRes.data]);
        setCurrentPage(lessonsRes.current_page);
        setLastPage(lessonsRes.last_page);
      })
      .finally(() => setLoading(false));
  }, [activeTab, courseId, invoices_exists, user]);
  useEffect(() => {
    !loading && activeTab && handleUpdateData();
  }, [activeTab, search, invoices_exists, user]);

  return (
    <div className="mt-4">
      {type === "club" ? <LessonSearch setSearch={setSearch} /> : null}
      <LessonListTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-8 flex flex-col gap-3">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton height={55} key={index} />
          ))
          : null}

        {lessonList.length === 0 && !loading ? (
          <BoxButton
            className="text-center"
            text="موردی جهت نمایش وجود ندارد"
          />
        ) : null}

        {lessonList.map((item, index) => (
          <LessonItem
            key={item.id}
            {...item}
            order={index + 1}
            invoices_exists={invoices_exists}
            type={type}
          />
        ))}

        {lastPage > currentPage && lessonList.length > 0 ? (
          <MorLessonItem
            courseId={courseId}
            count={lessonList.length}
            invoices_exists={invoices_exists}
            type={type}
          />
        ) : null}
      </div>
    </div>
  );
}
