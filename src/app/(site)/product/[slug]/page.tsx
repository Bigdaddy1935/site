import Container from "@/components/Assets/Container";
import { abort } from "process";
import ProductPageLayout from "@/components/Routes/SingleProductPage/ProductPageLayout";

type Props = {
  params: {
    slug: string;
  };

  searchParams: {
    learn: "learning" | "learned" | null;
  };
};

export default function ProductPage({ params: { slug } }: Props) {
  const productId = slug?.split("-")?.pop();

  if (!productId) abort();

  return (
    <Container className="my-10 flex flex-col-reverse lg:flex-row lg:justify-between">
      <ProductPageLayout productId={Number(productId)} />
    </Container>
  );
}
