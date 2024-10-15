import { Metadata } from "next";
import ProductsPage from "./[slug]/page";

export async function generateMetadata({
    params: { slug },
  }: {
    params: { slug: string };
  }): Promise<Metadata> {
    
    return {
      title: "آکادمی روح بخش | محصولات",
    };
  }
export default (props: any) => <ProductsPage {...props} />