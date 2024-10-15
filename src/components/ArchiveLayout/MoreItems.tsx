"use client";

import React, { useEffect } from "react";
import { ArchivePage, FilterKeys } from "./types";
import BlogCartSkeleton from "../BlogCard/BlogCartSkeleton";
import CourseCartSkeleton from "../CourseCard/CourseCartSkeleton";
import ProductCartSkeleton from "../ProductCard/ProductCartSkeleton";
import PodcastCartSkeleton from "../PodcastCard/PodcastCartSkeleton";
import BlogCart from "../BlogCard";
import CourseCard from "../CourseCard";
import ProductCard from "../ProductCard";
import PodcastCard from "../PodcastCard";
import useQuerySearch from "@/hooks/useQuerySearch";
import useGetMorOnScroll from "@/hooks/useGetMorOnScroll";
import Hidden from "../Assets/Hidden";
import IconLoading from "../Icons/IconLoading";
import { useFilters } from "./FilterContext";

type Props = {
  pageType: ArchivePage;
  filterKeys?: FilterKeys;
};

const skelectons = {
  article: <BlogCartSkeleton />,
  course: <CourseCartSkeleton />,
  product: <ProductCartSkeleton />,
  podcast: <PodcastCartSkeleton />,
};

const Carts = {
  article: BlogCart,
  course: CourseCard,
  product: ProductCard,
  podcast: PodcastCard,
};

export default function MoreItems(props: Props) {
  const { pageType, filterKeys } = props;
  const querySearch = useQuerySearch(false);
  const { filters } = useFilters();
  const categoryId = querySearch.categoryId?.split("-").pop();
  const routes = {
    article: "articles",
    course: "courses",
    product: "products",
    podcast: "lessons/podcast/search",
  };

  const getParamsKey = (params: any) => {
    if (!filterKeys) return params;
    const allParams: { [key: string]: any } = {};

    for (const key in filterKeys) {
      const allKeys = filterKeys[key]?.split(".");
      allParams[key] = allKeys?.reduce((a, b) => a?.[b], params);

    }
    return allParams;
  };


  const { data, loading, ref, showEnd } = useGetMorOnScroll({
    route: {
      url: `/${routes[pageType]}`,
      method: "get",
    },
    params: getParamsKey(querySearch),
  });

  const CartComponent = Carts[pageType];
  return (
    <React.Fragment>
      {data.map((item) => (
        <CartComponent key={item.id} {...item} />
      ))}

      <div
        className="col-span-1 md:col-span-2 lg:col-span-3 xl:grid-cols-4"
        ref={ref}
      />
      {loading && (
        <>
          <Hidden hidden="max-lg">
            {skelectons[pageType]}
            {skelectons[pageType]}
            {skelectons[pageType]}
          </Hidden>

          <Hidden hidden="lg">
            <div className="col-span-1 flex items-center justify-center rounded-lg border border-solid border-hgray-400 p-3 text-hgray-400 md:col-span-2 lg:col-span-3 xl:grid-cols-4 ">
              <IconLoading width={22} height={22} className="ml-1" />
              <p className="text-sm font-medium">در حال دریافت موارد بیشتر</p>
            </div>
          </Hidden>
        </>
      )}
      {showEnd && (
        <p className="col-span-1 py-5 text-center text-xl font-medium text-hgray-600 dark:text-text-dark-2 md:col-span-2 lg:col-span-3  xl:grid-cols-4">
          محتوای بیشتری جهت نمایش وجود ندارد
        </p>
      )}
    </React.Fragment>
  );
}
