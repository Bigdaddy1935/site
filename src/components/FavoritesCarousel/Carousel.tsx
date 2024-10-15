"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";
import IconArrowRightShort from "@/components/Icons/IconArrowRightShort";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import CartItem, { CartItemProps, CartType } from "./CartItem";
import {
  BlogListItem,
  CourseListItem,
  PodcastListItem,
  ProductListItem,
} from "@/types";

export type CartData =
  | BlogListItem
  | CourseListItem
  | PodcastListItem
  | ProductListItem;
export default function Carousel({
  data,
  cartType,
  type = "course",
}: {
  data: CartData[];
  cartType?: CartType;
  type?: "course" | "article" | "product" | "podcast" | "media";
}) {
  const [_, setInit] = useState<boolean>();
  const bulletRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const cartData = (cartItem: CartData): CartItemProps => {
    return {
      count:
        cartType === "mostLikes"
          ? cartItem.like_count
          : ((cartItem as ProductListItem).sell_count ?? 0),
      picture:
        (cartItem as BlogListItem).picture ??
        (cartItem as CourseListItem).picture ??
        (cartItem as ProductListItem).courses?.picture ??
        (cartItem as PodcastListItem).picture ??
        "/temp-images/course-card",
      title:
        (cartItem as BlogListItem).title ??
        (cartItem as CourseListItem).course_title ??
        (cartItem as ProductListItem).courses?.course_title ??
        (cartItem as PodcastListItem).title,
      id: cartItem.id,
      course_id: (cartItem as PodcastListItem).course_id,
      type,
    };
  };
  return (
    <div className="overflow-hidden lg:max-w-[calc(100vw-403px)]">
      {
        <div className="w-[calc(100%+200px)] lg:w-[calc(100%+100px)]">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            wrapperClass="pb-3"
            onInit={() => setInit(true)}
            pagination={{
              dynamicBullets: true,
              el: bulletRef.current,
              bulletClass: "swiper-pagination-bullet !w-3 !h-3 !bg-primary-300",
            }}
            navigation={{
              enabled: true,
              nextEl: nextRef.current,
              prevEl: prevRef.current,
              disabledClass: "!text-hgray-300 !dark:text-text-dark-2",
            }}
            modules={[Pagination, Navigation]}
            breakpoints={{
              420: {
                slidesPerView: 2,
              },
              640 : {
                slidesPerView : 3
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 3,
              },

              1280: {
                slidesPerView: 4,
              },

              1530 : {
                slidesPerView : 5
              }
            }}
          >
            {data?.map((item, index) => (
              <SwiperSlide key={item.id}>
                <CartItem {...cartData(item)} cartType={cartType} key={index} />
              </SwiperSlide>
            ))}
            <SwiperSlide className="max-lg:hidden" />
          </Swiper>
        </div>
      }

      <div className="mx-auto flex max-w-[200px] items-center justify-between gap-[10%]">
        <button
          className="text-primary-300 dark:text-text-dark-2"
          ref={prevRef}
        >
          <IconArrowRightShort width={36} height={36} />
        </button>
        <div className="flex-1 text-center">
          <div className="!translate-x-0" ref={bulletRef} />{" "}
        </div>
        <button className="text-primary-300" ref={nextRef}>
          <IconArrowLeftShort width={36} height={36} />
        </button>
      </div>
    </div>
  );
}
