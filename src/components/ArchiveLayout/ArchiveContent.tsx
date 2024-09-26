import React from "react";
import ArchiveBanner from "./ArchiveBanner";
import MoreItems from "./MoreItems";
import { ArchiveLayoutProps } from "./types";
import FavoritesCarousel from "../FavoritesCarousel";
import { modelStr } from "@/constant/constants";
import BlogCart from "../BlogCard";
import CourseCard from "../CourseCard";
import ProductCard from "../ProductCard";
import PodcastCard from "../PodcastCard";
import EmptyGrid from "../Assets/EmptyGrid";

export default function ArchiveContent(props: ArchiveLayoutProps) {
  const {
    data,
    pageType,
    filterKeys,
    mostLikes,
    cartType = "mostLikes",
  } = props;
  return (
    <div className="flex max-w-[1150px]  flex-1 flex-col">
      {mostLikes ? (
        <FavoritesCarousel
          type={pageType}
          cartType={cartType}
          title={
            cartType === "mostLikes"
              ? `محبوب ترین ${modelStr[pageType]?.sum}`
              : `پرفروش ترین ${modelStr[pageType]?.sum}`
          }
        />
      ) : (
        <ArchiveBanner />
      )}

      <div className="mt-10 grid grid-cols-1 gap-8 pb-48 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data?.length === 0 ? <EmptyGrid /> : null}
        {data?.map((item: any) => (
          <React.Fragment>
            <>
              {pageType === "article" ? (
                <BlogCart key={item?.id} {...item} />
              ) : null}
            </>
            <>
              {pageType === "course" ? (
                <CourseCard key={item?.id} {...item} />
              ) : null}
            </>
            <>
              {pageType === "product" ? (
                <ProductCard key={item?.id} {...item} />
              ) : null}
            </>
            <>
              {pageType === "podcast" ? (
                <PodcastCard key={item?.id} {...item} />
              ) : null}
            </>
          </React.Fragment>
        ))}

        {!data || data?.length > 0 ? (
          <MoreItems pageType={pageType} filterKeys={filterKeys} />
        ) : null}
      </div>
    </div>
  );
}
