import ArchiveLayout from "@/components/ArchiveLayout";
import Container from "@/components/Assets/Container";
import LoadingBox from "@/components/Assets/LoadingBox";
import { getCategoreis, getCategory, getProducts } from "@/lib/fetch";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search: string;
    teacher: string;
  };
};

export async function generateStaticParams() {
  const categories = await getCategoreis();

  return categories.map((category: any) => ({
    slug: `${category.slug}-${category.id}`,
  }));
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
      ? `محصولات ${category?.name} | آکادمی روح بخش`
      : "آکادمی روح بخش | محصولات",
  };
}

export default async function ProductsPage(props: Props) {
  const {
    searchParams: { search, teacher },
    params: { slug },
  } = props;

  const categoryId = slug ? slug?.split("-").pop() : null;

  const teacherName = teacher ? teacher?.split("_")?.slice(0, -1)?.join(" ") : "";

  const products = await getProducts(categoryId, teacherName, search);


  return (
    <Container>
      <Suspense fallback={<LoadingBox />}>
        <ArchiveLayout
          pageType="product"
          pageTitle="محصولات"
          data={products?.data}
          mostLikes
          cartType="mostSales"
          filters={{
            categoryId: Number(categoryId),
            search,
            teacher: teacherName,
          }}
          filterKeys={{
            product_title: "title",
            product_teacher: "teacher",
            categories: "categoryId",
          }}
        />
      </Suspense>
    </Container>
  );
}
