'use client';
import { EffectCards, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from '@/components/Assets/Image';
import Paper from '@/components/Assets/Paper';
import { toPersianDateTimeFormat } from '@/lib/toPersianDateFormat';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

import SectionTitle from '@/components/Assets/SectionTitle';
import IconArrowLeftShort from '@/components/Icons/IconArrowLeftShort';
import IconArrowRightShort from '@/components/Icons/IconArrowRightShort';
import { dispayUserName } from '@/lib/number';
import { useRef, useState } from 'react';
import { CommentItem } from '@/types/';

type Props = {
  items: CommentItem[];
};

export default function LatestComments({ items }: Props) {
  const [_, setInit] = useState<boolean>();
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  return (
    <div className="flex flex-col justify-center lg:flex-row lg:justify-between">
      <div className="flex flex-1 lg:items-center lg:justify-center">
        <SectionTitle
          title="آخرین نظرات کاربران"
          subTitle="این ها بخش کوچکی از نظراتی هستند که افراد مختلف در مورد آکادمی روح بخش دارند"
        />
      </div>

      <div className="flex-1">
        <div className="max-w-full  overflow-hidden lg:flex lg:justify-center">
          <Swiper
            onInit={() => setInit(true)}
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            navigation={{
              enabled: true,
              disabledClass: '!text-hgray-400',
              nextEl: nextRef.current,
              prevEl: prevRef.current
            }}
            slideNextClass="text-primary-300"
            className="
        w-[300px] lg:h-[400px] h-[430px] lg:w-[400px]"
            cardsEffect={{
              perSlideOffset: 15,
              slideShadows: false
            }}
          >
            {items.map((comment) => (
              <SwiperSlide key={comment.id}>
                <div className="h-[400px] p-4 lg:h-[300px]">
                  <Paper className="flex h-[400px] flex-col justify-center shadow-[0_0_1px_2px_#ababab1f] lg:h-[300px]">
                    <div className="flex flex-1 items-center justify-center">
                      <p className="leading-5 text-hgray-600 dark:text-text-dark-3">
                        {comment?.body}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Image
                        width={50}
                        height={50}
                        alt=""
                        className="h-[50px] w-[50px] overflow-hidden rounded-full object-cover"
                        src={comment?.user?.picture ?? '/default-profile.png'}
                      />
                      <div className="pr-3">
                        <p className="font-medium text-hgray-600 dark:text-text-dark-3">
                          {dispayUserName(comment?.user?.username)}
                        </p>
                        <p className="ltr text-right text-sm text-hgray-400 dark:text-hgray-200">
                          {toPersianDateTimeFormat(comment?.created_at)}
                        </p>
                      </div>
                    </div>
                  </Paper>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex items-center justify-end gap-[10%]">
          <button className="text-primary-300" ref={prevRef}>
            <IconArrowRightShort width={36} height={36} />
          </button>
          <button className="text-primary-300" ref={nextRef}>
            <IconArrowLeftShort width={36} height={36} />
          </button>
        </div>
      </div>
    </div>
  );
}
