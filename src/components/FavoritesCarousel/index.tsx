import SectionTitle from "@/components/Assets/SectionTitle";

import {
  BlogListItem,
  CourseListItem,
  PodcastListItem,
  ProductListItem,
} from "@/types/";
import { CartItemProps, CartType } from "./CartItem";
import { useGetMostLikesQuery } from "@/lib/services/base";
import Skeleton from "../Assets/Skeleton";
import Carousel, { CartData } from "./Carousel";
import { Suspense } from "react";

type Props = {
  title?: string;
  type?: "course" | "article" | "product" | "podcast" | "media";
  cartType?: CartType;
};

const getMostLike = async (type: string) => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/MostLike?type=${type}`,
    {
      next: { revalidate: 7200 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let jsonData = await data.json();

  return jsonData;
};

const getMostSale = async () => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/MostSell`,
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
};
export default async function FavoritesCarousel(props: Props) {
  const { title, type = "course", cartType = "mostLikes" } = props;
  const data =
    type === "product" ? await getMostSale() : await getMostLike(type);

  return (
    <section className="overflow-hidden w-full">
      {!title ? null : <SectionTitle subTitle="" title={title!} />}
      <Suspense fallback={<Loading />}>
        <Carousel data={data} type={type} cartType={cartType} />
      </Suspense>
    </section>
  );
}

function Loading() {
  return (
    <Skeleton
      count={4}
      className="flex-1 min-w-[200px]"
      containerClassName="flex gap-[12px] max-w-[100%] overflow-hidden mb-8"
      borderRadius={"15px"}
      height={200}
    />
  );
}
