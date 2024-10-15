'use client';
import EmptyGrid from '@/components/Assets/EmptyGrid';
import Skeleton from '@/components/Assets/Skeleton';
import CourseCard from '@/components/CourseCard';
import LessonItem from '@/components/Routes/SingleCoursePage/LessonItem';
import { useGetUserCoursesQuery } from '@/lib/services/auth';
import { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMyClass } from './MyClassProvider';

export default function ClassList() {
  const { activeTab } = useMyClass();
  const { data, isLoading, isFetching } = useGetUserCoursesQuery(
    { type: activeTab },
    { refetchOnMountOrArgChange: true }
  );
  const [activeCourse, setActiveCourse] = useState<null | number>(data?.[0]?.id ?? null);
  return (
    <div className="mt-10 max-w-[100%] overflow-x-hidden">
      {isLoading || isFetching ? (
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="min-w-[365px] px-6">
              <Skeleton width="100%" height="370px" />
            </div>
          ))}
        </div>
      ) : data?.length && data?.length > 0 ? (
        <div className="w-[160%] lg:w-[120%]">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            wrapperClass="pb-3"
            breakpoints={{
              640: {
                slidesPerView: 3
              },
              768: {
                slidesPerView: 4
              },
              1024: {
                slidesPerView: 5
              }
            }}
          >
            {data?.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className="relative">
                  {activeCourse !== item.id ? (
                    <div
                      onClick={() => setActiveCourse(item.id)}
                      className="absolute bottom-0 left-0 right-0 top-0 z-10 cursor-pointer bg-transparent"
                    ></div>
                  ) : null}
                  <CourseCard {...item} key={item.id} />
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide className="max-lg:hidden" />
          </Swiper>
        </div>
      ) : (
        <EmptyGrid />
      )}

      <div className="mt-3 flex flex-col gap-y-3">
        {activeCourse &&
          data
            ?.find((i) => i.id === activeCourse)
            ?.lessons.map((item, index) => <LessonItem {...item} order={index + 1} key={index} />)}
      </div>
    </div>
  );
}
