import ArchiveLayout from "@/components/ArchiveLayout";
import Container from "@/components/Assets/Container";
import { PostWithCookie, QueryWithCookie } from "@/lib/QueryWithCookie";
import { Query } from "@/lib/axios";
import { Metadata } from "next";
import { abort } from "process";
import { BlogListItem, Category } from "@/types";
import { PaginateData } from "@/types/response";
import { Suspense } from "react";
import LoadingBox from "@/components/Assets/LoadingBox";
import { getArticles, getCategoreis, getCategory } from "@/lib/fetch";
import ArticlesPageClient from "@/components/Routes/Articles/ArticlesPageClient";
import LayoutLoading from "@/components/Assets/LayoutLoading";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search: string;
  };
};

export async function generateStaticParams() {
  const categories = await getCategoreis();

  return categories.map((category: any) => ({
    slug: `${category.slug}-${category.id}`,
  }));
}
 async function fetchMYData(
  categoryId: string | null | undefined,
  search: string
) {
  try {
    const articles = await getArticles(categoryId, search);

    return {
      articles,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categoryId = slug ? slug?.split("-").pop() : null;
  let category = null;
  if (categoryId) {
    category = await getCategory(+categoryId);
  }
  return {
    title: category
      ? `مقالات ${category?.name} | آکادمی روح بخش`
      : "مقالات آکادمی روح بخش",
  };
}

export default async function BlogsPage(props: Props) {
  const {
    searchParams: { search },
    params: { slug },
  } = props;

  const categoryId = slug ? slug?.split("-").pop() : null;

  const { articles } = await fetchMYData(categoryId, search);

  return (
      <ArticlesPageClient articles={articles} />
  );
}
