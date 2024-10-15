import Container from "@/components/Assets/Container";
import EmptyGrid from "@/components/Assets/EmptyGrid";
import Hidden from "@/components/Assets/Hidden";
import BlogCart from "@/components/BlogCard";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import ArticleMoreItem from "@/components/Routes/Tags/ArticleMoreItem";
import { PostWithCookie } from "@/lib/QueryWithCookie";
import { Metadata } from "next";
import { abort } from "process";
import { BlogListItem, Tag } from "@/types";
import { PaginateData } from "@/types/response";
import { Query } from "@/lib/axios";
import { getArticlesByTag } from "@/lib/fetch";
import { Suspense } from "react";
import LoadingBox from "@/components/Assets/LoadingBox";
type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tagName = slug.split("-")[0];
  if (!tagName) return {};
  return {
    title: `مقالات تگ ${decodeURI(tagName)} | آکادمی روح بخش`,
  };
}

export default async function BlogTagPage({ params: { slug } }: Props) {
  const tagName = slug.split("-")[0];
  if (!tagName) abort();

  const articels = await getArticlesByTag(tagName);

  return (
    <Container className="py-8 lg:py-24">
      <Hidden hidden="lg">
        <HeaderSetTitle label={decodeURI(tagName)} />
      </Hidden>
      <h1 className="mb-10 text-lg lg:text-2xl font-bold text-hgray-500 dark:text-text-dark-1">
        {`مقالات داری تگ`} "
        <span className="text-primary-800 dark:text-primary-100">
          {decodeURI(tagName)}
        </span>
        "
      </h1>
      <Suspense fallback={<LoadingBox />}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articels.data.length > 0 ? (
            articels.data.map((item) => <BlogCart {...item} key={item.id} />)
          ) : (
            <EmptyGrid />
          )}

          <ArticleMoreItem
            lastPage={articels.last_page}
            tags={decodeURI(tagName)}
          />
        </div>
      </Suspense>
    </Container>
  );
}
