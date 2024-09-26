import ArchiveLayout from "@/components/ArchiveLayout";
import Container from "@/components/Assets/Container";
import LoadingBox from "@/components/Assets/LoadingBox";
import { getProducts } from "@/lib/fetch";
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
