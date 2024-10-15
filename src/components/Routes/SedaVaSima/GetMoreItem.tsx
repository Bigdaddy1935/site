"use client";
import SedaVaSimaCard from "@/components/SedaVaSimaCard";
import TvCartSkeleton from "@/components/SedaVaSimaCard/TvCartSkeleton";
import useGetMorOnScroll from "@/hooks/useGetMorOnScroll";
import React from "react";
type Props = {
  route: {
    url: string;
    method?: "post" | "get";
  };
};
export default function GetMoreItem(props: Props) {
  const { route } = props;
  const { data, loading, showEnd, ref } = useGetMorOnScroll({ route });
  return (
    <React.Fragment>
      {data.map((item, index) => (
        <SedaVaSimaCard {...item} />
      ))}
      <div
        className="col-span-1 md:col-span-2 lg:col-span-3 xl:grid-cols-4"
        ref={ref}
      />

      {loading && (
        <div className="col-span-3 grid grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          <TvCartSkeleton />
          <TvCartSkeleton />
          <TvCartSkeleton />
        </div>
      )}
      {showEnd && (
        <p className="text-center dark:text-text-dark-4  text-2xl">
          محتوای بیشتری جهت نمایش وجود ندارد
        </p>
      )}
    </React.Fragment>
  );
}
