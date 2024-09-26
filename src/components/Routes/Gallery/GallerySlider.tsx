"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import Image from "@/components/Assets/Image";
import IconWindowClose from "@/components/Icons/IconWindowClose";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ContainerLayout from "@/components/Assets/ContainerLayout";
import { useState } from "react";
import 'swiper/css/scrollbar';
import { Library } from "@/types/";

type Props = {
    onClose: () => void;
    items: Library[];
    title: string;
    open: number | null;
}
export default function GallerySlider(props: Props) {
    const { onClose, items, open , title } = props;
    const [activeImage, setActiveImage] = useState(open ?? 0);
    return (
        <div className="fixed top-0 right-0  h-screen w-screen bg-black/60 z-40">
            <div className="relative  h-screen w-screen">
                <div className="p-8 bg-black/60 flex items-center">
                    <EmptyButton onClick={onClose}>
                        <IconWindowClose className="text-white ml-4" width={26} height={26} />
                    </EmptyButton>
                    <p className="text-white">
                        {title}
                    </p>
                </div>
                <ContainerLayout>
                    <div>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            wrapperClass='pb-3'
                            modules={[Navigation]}
                            slideNextClass="text-primary-300"
                            navigation
                            scrollbar={{ draggable: true }}
                            onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
                            onInit={(swiper) => swiper.slideTo(activeImage)}
                        >
                            {items.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <div className="relative h-[94vh]">
                                        <Image loading="eager" fill src={item.picture} alt="" className="object-none" />
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>

                </ContainerLayout>
                <div className="absolute box-border p-5 bottom-0  right-0 left-0 bg-black/60 flex z-40">
                    <p className="text-white text-center w-full">
                        {items[activeImage]?.title}
                    </p>
                </div>
            </div>
        </div>
    )
}
