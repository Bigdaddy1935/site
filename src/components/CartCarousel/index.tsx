'use client';
import SectionTitle from '@/components/Assets/SectionTitle';
import BlogCart from '@/components/BlogCard';
import CourseCard from '@/components/CourseCard';
import IconArrowLeftShort from '@/components/Icons/IconArrowLeftShort';
import IconArrowRightShort from '@/components/Icons/IconArrowRightShort';
import PodcastCard from '@/components/PodcastCard';
import ProductCard from '@/components/ProductCard';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BlogListItem, CourseListItem, KeyValue, PodcastListItem, ProductListItem } from '@/types/';

const Carts: KeyValue = {
  course: CourseCard,
  blog: BlogCart,
  product: ProductCard,
  podcast: PodcastCard,
  club: CourseCard,
};
type Props = {
  title?: string;
  subTitle?: string;
  moreHref?: string;
  moreText?: string;
  type?: 'course' | 'blog' | 'product' | 'podcast' | 'club';
  display?: 'grid' | 'carousel';
  data: BlogListItem[] | CourseListItem[] | ProductListItem[] | PodcastListItem[];
  id?: string;
};
export default function CartCarousel(props: Props) {
  const {
    title,
    subTitle,
    moreHref,
    moreText,
    type = 'course',
    display = 'carousel',
    data,
    id
  } = props;
  const [_, setInit] = useState<boolean>();
  const bulletRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const CartComponent = Carts[type];
  return (
    <section id={id}>
      {!title && !subTitle ? null : (
        <SectionTitle title={title!} subTitle={subTitle!} moreHref={moreHref} moreText={moreText} />
      )}

      {display === 'carousel' ? (
        <div className="overflow-hidden">
          <div className="">
            <Swiper
              spaceBetween={15}
              slidesPerView={1}
              onInit={() => setInit(true)}
              pagination={{
                dynamicBullets: true,
                el: bulletRef.current,
                bulletClass  :"swiper-pagination-bullet !w-3 !h-3 !bg-primary-300"
              }}
              navigation={{
                enabled: true,
                nextEl: nextRef.current,
                prevEl: prevRef.current,
                disabledClass : "!text-hgray-300 !dark:text-text-dark-2"
              }}
              modules={[Pagination, Navigation]}
              wrapperClass="pb-3"
              breakpoints={{
                640: {
                  slidesPerView: 2
                },
                768: {
                  slidesPerView: 3
                },
                1024: {
                  slidesPerView: 4
                }
              }}
            >
              {data.map((item, index) => (
                <SwiperSlide key={item.id} className="p-2">
                  <CartComponent {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mx-auto flex max-w-[200px] items-center justify-between gap-[10%]">
            <button className="text-primary-300 dark:text-text-dark-2" ref={prevRef}>
              <IconArrowRightShort width={36} height={36} />
            </button>
            <div className="flex-1 text-center">
              <div className="!translate-x-0" ref={bulletRef} />{' '}
            </div>
            <button className="text-primary-300" ref={nextRef}>
              <IconArrowLeftShort width={36} height={36} />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item, index) => (
            <CartComponent {...item} key={index} />
          ))}
        </div>
      )}
    </section>
  );
}
