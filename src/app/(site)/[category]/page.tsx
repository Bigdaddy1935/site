import Container from "@/components/Assets/Container";
import CartCarousel from "@/components/CartCarousel";
import CategoryPageHeader from "@/components/Routes/Category/CategoryPageHeader";
import { abort } from "process";

import React, { Suspense } from "react";
import IconLoading from "@/components/Icons/IconLoading";
import { getCategoreis, getCategory, getCategoryModel } from "@/lib/fetch";
import {
  BlogListItem,
  CourseListItem,
  PodcastListItem,
  ProductListItem,
} from "@/types";
import AudioPlayerProvider from "@/components/Assets/AudioPlayer/AudioPlayerContext";

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params: { category } }: Props) {
  const categoryId = category.split("-").pop();

  if (!categoryId) return {};
  const categoryData = await getCategory(+categoryId);

  return {
    title: `موضوعات ${categoryData?.name} | آکادمی روح بخش`,
    openGraph: {
      title: `${categoryData?.name} | آکادمی روح بخش`,
    },
  };
}

export default async function CategoryPage({ params: { category } }: Props) {
  const categoryId = category.split("-").pop();
  if (!categoryId) abort();

  const categories = await getCategoreis();

  const products = await getCategoryModel<ProductListItem>(
    +categoryId,
    "products"
  );
  const courses = await getCategoryModel<CourseListItem>(
    +categoryId,
    "courses"
  );
  const podcasts = await getCategoryModel<PodcastListItem>(
    +categoryId,
    "podcast"
  );
  const articles = await getCategoryModel<BlogListItem>(
    +categoryId,
    "articles"
  );

  const categoryData = await getCategory(+categoryId);

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center h-[100px] bg-hgray-400/20 rounded-xl my-16">
            <IconLoading
              className="mx-auto inline-block"
              width={36}
              height={36}
            />
          </div>
        }
      >
        <CategoryPageHeader
          sections={{
            podcasts: !!podcasts?.data?.length,
            products: !!products?.data?.length,
            articles: !!articles?.data?.length,
            courses: !!courses?.data?.length,
          }}
          categories={categories ?? []}
          categoryId={Number(categoryId)}
        />
      </Suspense>

      <Container>
        <Suspense fallback={<CategoryLoading />}>
          {!!products?.data?.length ? (
            <>
              <div className="my-16" />

              <CartCarousel
                id={`${categoryData?.slug}-products`}
                data={products?.data?.slice(0, 8)}
                type="product"
                title="محصولات"
                subTitle="جدیدترین دوره های آموزشی"
                moreHref={`/products/${category}`}
              />
            </>
          ) : null}
        </Suspense>

        <Suspense fallback={<CategoryLoading />}>
          {!!courses?.data?.length ? (
            <>
              <div className="my-24" />

              <CartCarousel
                id={`${categoryData?.slug}-courses`}
                data={courses?.data?.slice(0, 8)}
                type="course"
                title="دوره ها"
                subTitle="جدیدترین دوره های آموزشی"
                moreHref={`/courses/${category}`}
              />
            </>
          ) : null}
        </Suspense>
        <Suspense fallback={<CategoryLoading />}>
          {!!podcasts?.data.length ? (
            <>
              <div className="my-24" />
              <AudioPlayerProvider>
                <CartCarousel
                  id={`${categoryData?.slug}-podcasts`}
                  data={podcasts?.data?.slice(0, 8)}
                  type="podcast"
                  display="grid"
                  title="پادکست ها"
                  moreHref={`/podcasts/${category}`}
                />
              </AudioPlayerProvider>
            </>
          ) : null}
        </Suspense>

        <Suspense fallback={<CategoryLoading />}>
          {!!articles?.data?.length ? (
            <>
              <div className="my-24" />

              <CartCarousel
                id={`${categoryData?.slug}-articles`}
                data={articles?.data?.slice(0, 8)}
                type="blog"
                title="مقالات"
                moreHref={`/articles/${category}`}
              />
            </>
          ) : null}
        </Suspense>

        <div className="my-16" />
      </Container>
    </React.Fragment>
  );
}

function CategoryLoading() {
  return (
    <div className="w-full flex justify-center items-center h-[400px] bg-hgray-400/20 rounded-xl my-16">
      <IconLoading className="mx-auto inline-block" width={36} height={36} />
    </div>
  );
}
