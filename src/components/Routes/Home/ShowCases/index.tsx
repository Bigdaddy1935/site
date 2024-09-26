"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";
import IconArrowRightShort from "@/components/Icons/IconArrowRightShort";
import { useRef, useState } from "react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { ShowCase } from "@/types/";
type Props = {
  items: ShowCase[];
};

export default function ShowCases({ items }: Props) {
  const [_, setInit] = useState<boolean>();
  const bulletRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const getHref = (item: ShowCase) => {
    switch (item.model_type) {
      case "App\\Models\\Course":
        if (item.course?.type === "tv") return `/tv/course-${item.model_id}`;
        if (item.course?.type === "course")
          return `/course/course-${item.model_id}`;
        return `/media/${item.course?.type === "media" ? "medias" : item.course?.type}/course-${item.model_id}`;
      case "App\\Models\\Article":
        return `/article/content-${item.model_id}`;
      case "App\\Models\\Product":
        return `/product/product-${item.model_id}`;
      case "App\\Models\\Lesson":
        return `/lessons/${item.lesson?.course_id}-${item.model_id}`;
      default:
        return `#`;
    }
  };

  return (
    <div className="px-10">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        onInit={() => setInit(true)}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 100,
          slideShadows: false,
          scale: 0.9,
        }}
        navigation={{
          enabled: true,
          disabledClass: "!text-hgray-400",
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="w-[100%] py-[50px]"
      >
        {items.map((item) => (
          <SwiperSlide
            className="!h-[80%] !w-[80%] rounded-xl bg-cover bg-center lg:!h-[300px] lg:!w-[400px]"
            key={item.id}
          >
            <NextLink
              href={getHref(item)}
              className="relative block h-[300px] bg-cover bg-center"
            >
              <Image
                src={item.picture}
                unoptimized
                alt=""
                fill
                className="rounded-xl object-contain object-center"
              />
            </NextLink>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-end gap-[10%]">
        <button className="text-primary-300" ref={prevRef}>
          <IconArrowRightShort width={36} height={36} />
        </button>
        <button className="text-primary-300" ref={nextRef}>
          <IconArrowLeftShort width={36} height={36} />
        </button>
      </div>
    </div>
  );
}
