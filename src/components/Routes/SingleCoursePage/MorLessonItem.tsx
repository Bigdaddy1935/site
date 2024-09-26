"use client";
import Button from "@/components/Assets/Button";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import IconLoading from "@/components/Icons/IconLoading";
import { Query } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { LessenItem, Model } from "@/types/";
import { PaginateData } from "@/types/response";
import LessonItem from "./LessonItem";

type Props = {
  courseId: string | number;
  count: number;
  invoices_exists?: boolean;
  type?: Model;
};
export default function (props: Props) {
  const { courseId, count, invoices_exists, type } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LessenItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [end, setEnd] = useState(false);
  const learn = useSearchParams().get("learn");

  const handleGetMoreData = () => {
    if (!loading) {
      setLoading(true);

      Query<PaginateData<LessenItem>>(
        learn && ["learned", "learning"].includes(learn)
          ? `/lessons/get/${learn}/by_course_id/${courseId}`
          : `/lessons/get/courseId/${courseId}`,
        {
          params: {
            page: currentPage + 1,
          },
        }
      )
        .then((res) => {
          if (typeof res !== "boolean") {
            setData((prev) => [...prev, ...res.data]);
            setCurrentPage(res.current_page);

            if (res.current_page === res.last_page) setEnd(true);
          }
        })
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <React.Fragment>
      {data.map((item, index) => (
        <LessonItem
          invoices_exists={invoices_exists}
          type={type}
          key={item.id}
          {...item}
          order={index + count + 1}
        />
      ))}
      {!end && (
        <Button
          disabled={loading}
          onClick={handleGetMoreData}
          fullWidth
          size="medium"
          color="primary"
          outlined
          className="border-[2px] dark:border-mdark-400 dark:bg-mdark-500 dark:text-white flex justify-center items-center"
        >
          {loading ? (
            <IconLoading
              className="text-primary-600 dark:text-white"
              width={32}
              height={32}
            />
          ) : (
            <>
              مشاهده بیشتر
              <IconDownOpen
                width={32}
                height={32}
                className="text-primary-600 dark:text-white pr-3"
              />
            </>
          )}
        </Button>
      )}
    </React.Fragment>
  );
}
