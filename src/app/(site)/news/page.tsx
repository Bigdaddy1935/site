import ContainerLayout from "@/components/Assets/ContainerLayout";
import { abort } from "process";
import NewsPageLayout from "@/components/Routes/News/NewsPageLayout";
import { Suspense } from "react";

async function getNews() {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/notification/get`,
    {
      next: { revalidate: 7200 },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let jsonData = await data.json();

  return jsonData;
}
export const metadata = {
  title: `اخبار جدید | آکادمی روحبخش`,
};
export default async function NewsPage() {
  const news = await getNews();

  return (
    <ContainerLayout>
      <Suspense fallback={null}>
        <NewsPageLayout items={news} />
      </Suspense>
    </ContainerLayout>
  );
}
