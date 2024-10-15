import React, { Suspense, lazy } from "react";
import { getCategoreis, getCategory, getCategoryModel } from "@/lib/fetch";
import {
  BlogListItem,
  CourseListItem,
  PodcastListItem,
  ProductListItem,
} from "@/types";

import CategoryPageClient from "@/components/Routes/Category/CategoryPageClient";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  const categories = await getCategoreis();

  return categories.map((category) => ({
    category: `${category.slug}-${category.id}`,
  }));
}

async function fetchMYData(categoryId: number, categorySlug: string) {
  try {
    const categories = await getCategoreis();

    const products = await getCategoryModel<ProductListItem>(
      categoryId,
      "products"
    );
    const courses = await getCategoryModel<CourseListItem>(
      categoryId,
      "courses"
    );
    const podcasts = await getCategoryModel<PodcastListItem>(
      categoryId,
      "podcast"
    );
    const articles = await getCategoryModel<BlogListItem>(
      categoryId,
      "articles"
    );

    return {
      products,
      courses,
      articles,
      podcasts,
      categories,
    };
  } catch (error) {
    console.log("fetch error...");
    throw new Error("Failed to fetch revenue data.");
  }
}

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
  if (!categoryId) notFound();

  const categoryData = await getCategory(+categoryId);

  if (!category || category !== `${categoryData.slug}-${categoryData.id}`)
    notFound();

  const { articles, products, categories, courses, podcasts } =
    await fetchMYData(+categoryId, category);

  return (
    <React.Fragment>
      <CategoryPageClient
        articles={articles.data}
        courses={courses.data}
        podcasts={podcasts.data}
        products={products.data}
        categories={categories}
        category={categoryData}
      />
    </React.Fragment>
  );
}
