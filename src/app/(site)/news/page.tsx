import ContainerLayout from "@/components/Assets/ContainerLayout";
import NewsPageLayout from "@/components/Routes/News/NewsPageLayout";
import { getNews } from "@/lib/fetch";
import { Suspense } from "react";

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
