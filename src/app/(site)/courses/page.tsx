import { Metadata } from "next";
import CoursesPage from "./[slug]/page";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "دوره های آکادمی روح بخش",
  };
}
export default (props: any) => <CoursesPage {...props} />;
