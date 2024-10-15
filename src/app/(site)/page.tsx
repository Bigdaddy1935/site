import Container from "@/components/Assets/Container";
import CartCarousel from "@/components/CartCarousel";
import LatestComments from "@/components/Routes/Home/LatestComments";
import MahdiyarBanner from "@/components/Routes/Home/MahdiyarBanner";
import ShowCases from "@/components/Routes/Home/ShowCases";
import SiteAds from "@/components/Routes/Home/SiteAds";
import SiteServices from "@/components/Routes/Home/SiteServices";

import { Suspense } from "react";
import {
  getCategoreis,
  getLatestComments,
  getLeatestArticle,
  getLeatestCourse,
  getLeatestPodcasts,
  getLeatestProducts,
  getShowcases,
  getStatistics,
} from "@/lib/fetch";
import Statistics from "@/components/Routes/Home/Statistics";
import Image from "@/components/Assets/Image";
import AudioPlayerProvider from "@/components/Assets/AudioPlayer/AudioPlayerContext";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  title: "آکادمی روح بخش",
};

export default async function HomePage() {
  const latestCourse = await getLeatestCourse();
  const latestArticle = await getLeatestArticle();
  const latestProducts = await getLeatestProducts();
  const latestPodcasts = await getLeatestPodcasts();
  const showcases = await getShowcases();
  const categories = await getCategoreis();
  const statistics = await getStatistics();
  const latestComments = await getLatestComments();

  return (
    <>
      <Container className="flex flex-col items-center justify-between py-12 lg:flex-row-reverse">
        <div className="w-full overflow-hidden lg:w-[65%] mb-10 lg:mb-0">
          <Suspense>
            <ShowCases items={showcases.NotExpired} />
          </Suspense>
        </div>
        <div className="w-full lg:w-[35%]">
          <Suspense>
            <SiteAds categories={categories.filter((i: any) => i.id !== 17)} />
          </Suspense>
        </div>
      </Container>
      <Container>
        <Suspense>
          <CartCarousel
            data={latestProducts ?? []}
            type="product"
            title="جدیدترین محصولات"
            moreHref="/products"
          />
          <div className="my-20" />
        </Suspense>
        <Suspense>
          <CartCarousel
            data={latestCourse}
            title="آخرین دوره ها"
            moreHref="/courses"
          />
        </Suspense>
        <div className="my-20" />

        <MahdiyarBanner />
        <div className="my-20" />

        <Suspense>
          <CartCarousel
            data={latestArticle}
            type="blog"
            title="آخرین مقالات"
            moreHref="/articles"
          />
          <div className="my-20" />
        </Suspense>

        <SiteServices />
        <div className="my-20" />

        <Suspense>
          <AudioPlayerProvider>
            <CartCarousel
              data={latestPodcasts.slice(0, 8)}
              display="carousel"
              type="podcast"
              title="آخرین پادکست ها"
            />
          </AudioPlayerProvider>
          <div className="my-20" />
        </Suspense>

        <Suspense>
          <Statistics {...statistics} />
          <div className="my-20" />
        </Suspense>

        <Suspense>
          <LatestComments items={latestComments.data} />
          <div className="my-20" />
        </Suspense>
      </Container>
    </>
  );
}
