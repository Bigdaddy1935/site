import IconLoading from "@/components/Icons/IconLoading";
import React from "react";
import CategoryPageHeader from "./CategoryPageHeader";
import { PaginateData } from "@/types/response";
import {
  BlogListItem,
  Category,
  CourseListItem,
  PodcastListItem,
  ProductListItem,
} from "@/types";
import Container from "@/components/Assets/Container";
import CartCarousel from "@/components/CartCarousel";
import AudioPlayerProvider from "@/components/Assets/AudioPlayer/AudioPlayerContext";

export type CategoryPageLayoutProps = {
  courses: CourseListItem[];
  articles: BlogListItem[];
  products: ProductListItem[];
  podcasts: PodcastListItem[];
  categories: Category[];
  category: Category;
};
export default function CategoryPageLayout(props: CategoryPageLayoutProps) {
  const { articles, courses, podcasts, products, categories, category } = props;
  return (
    <React.Fragment>
      <CategoryPageHeader
        sections={{
          podcasts: !!podcasts?.length,
          products: !!products?.length,
          articles: !!articles?.length,
          courses: !!courses?.length,
        }}
        categories={categories ?? []}
        categoryId={category.id}
      />

      <Container>
        {!!products?.length ? (
          <>
            <div className="my-16" />

            <CartCarousel
              id={`${category?.slug}-products`}
              data={products?.slice(0, 8)}
              type="product"
              title="محصولات"
              subTitle="جدیدترین دوره های آموزشی"
              moreHref={`/products/${category.slug}-${category.id}`}
            />
          </>
        ) : null}

        {!!courses?.length ? (
          <>
            <div className="my-24" />

            <CartCarousel
              id={`${category?.slug}-courses`}
              data={courses?.slice(0, 8)}
              type="course"
              title="دوره ها"
              subTitle="جدیدترین دوره های آموزشی"
              moreHref={`/courses/${category.slug}-${category.id}`}
            />
          </>
        ) : null}
        {!!podcasts?.length ? (
          <>
            <div className="my-24" />
            <AudioPlayerProvider>
              <CartCarousel
                id={`${category?.slug}-podcasts`}
                data={podcasts?.slice(0, 8)}
                type="podcast"
                display="grid"
                title="پادکست ها"
                moreHref={`/podcasts/${category.slug}-${category.id}`}
              />
            </AudioPlayerProvider>
          </>
        ) : null}

        {!!articles?.length ? (
          <>
            <div className="my-24" />

            <CartCarousel
              id={`${category?.slug}-articles`}
              data={articles?.slice(0, 8)}
              type="blog"
              title="مقالات"
              moreHref={`/articles/${category.slug}-${category.id}`}
            />
          </>
        ) : null}

        <div className="my-16" />
      </Container>
    </React.Fragment>
  );
}
