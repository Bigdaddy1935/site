import Container from "@/components/Assets/Container";
import ProductPageClient from "@/components/Routes/SingleProductPage/ProductPageClient";
import { cFetch } from "@/lib/fetch";
import { abort } from "process";


type Props = {
  params: {
    slug: string;
  };

  searchParams: {
    learn: "learning" | "learned" | null;
  };
};

export async function generateStaticParams() {
  const products = await cFetch("/products/ids");

  return products.map((category: any) => ({
    slug: `product-${category.id}`,
  }));
}

export default function ProductPage({ params: { slug } }: Props) {
  const productId = slug?.split("-")?.pop();

  if (!productId) abort();

  return (
    <Container className="my-10 flex flex-col-reverse lg:flex-row lg:justify-between">
      <ProductPageClient productId={Number(productId)} />
    </Container>
  );
}
