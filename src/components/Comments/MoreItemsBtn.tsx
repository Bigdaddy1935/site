"use client";
import Button from "@/components/Assets/Button";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import IconLoading from "@/components/Icons/IconLoading";
import React, { useEffect, useState } from "react";
import { CommentItem as CommentItemType } from "@/types/";
import { PaginateData } from "@/types/response";
import CommentItem from "./CommentItem";
import { Post } from "@/lib/axios";

type Props = {
  last_page: number;
  id: number;
  comments?: PaginateData<CommentItemType>
  type: string
};
export default function MoreItemsBtn(props: Props) {
  const { last_page, id, comments, type } = props;
  const [currentPage, setCurrentPage] = useState(comments?.data ? 1 : 0);
  const [lastPage, setLastPage] = useState(comments?.last_page ?? 1);
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState<CommentItemType[]>(comments?.data ?? []);

  const handleGetMore = () => {
    setIsLoading(true);
    const res = Post<PaginateData<CommentItemType>>(`/comment/get/accepted/type/${id}`,
      {
        data: { type },
        params: { page: currentPage + 1 }
      }).then((res) => {
        if (typeof res === "boolean") return;

        setData(prev => [...prev, ...res.data]);
        setCurrentPage(res.current_page);
        setLastPage(res.last_page)
        setIsLoading(false)
      })
  };


  useEffect(() => {
    if (type === "App\\\\Models\\\\Lesson" || type === "App\\Models\\Product" ) handleGetMore();
  }, [type])

  return (
    <React.Fragment>
      {data.map((item) => (
        <CommentItem {...item} key={item.id} />
      ))}
      {currentPage < lastPage ? (
        <Button
          disabled={isloading}
          onClick={handleGetMore}
          fullWidth
          outlined
          rounded="lg"
          className="flex justify-center items-center  bg-transparent border-[3px] p-4 border-solid  border-hgray-300 dark:border-mdark-400 rounded-lg"
        >
          {isloading ? (
            <IconLoading
              className="text-hgray-600 inline-block"
              width={28}
              height={28}
            />
          ) : (
            <>
              <span className="font-semibold inline-block text-lg text-hgray-600 dark:text-hgray-300 dark:font-medium">
                مشاهده بیشتر
              </span>
              <IconDownOpen
                className="mr-2 text-primary-300"
                width={28}
                height={28}
              />
            </>
          )}
        </Button>
      ) : null}
    </React.Fragment>
  );
}
