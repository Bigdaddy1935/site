import { Metadata } from "next";
import BlogsPage from "./[slug]/page";

export async function generateMetadata({
    params: { slug },
  }: {
    params: { slug: string };
  }): Promise<Metadata> {
    
    return {
      title: "مقالات آکادمی روح بخش",
    };
  }
export default (props: any) => <BlogsPage {...props} />