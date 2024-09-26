"use client";
import ContentBox from "@/components/Assets/ContentBox";
import EmptyButton from "@/components/Assets/EmptyButton";
import Image from "@/components/Assets/Image";
import IconBxPlusCircle from "@/components/Icons/IconBxPlusCircle";
import React, { useState } from "react";

export default function ClubRoadMap() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-center mb-5">
        <EmptyButton
          className="flex flex-col items-center dark:text-text-dark-4"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>مشاهده نقشه های راه</span>
          <IconBxPlusCircle width={32} height={32} />
        </EmptyButton>
      </div>

      <ContentBox open={open}>
        <div className="overflow-auto">
          <div className="flex min-w-[600px] gap-5 justify-between">
            {Array.from({ length: 3 }).map((_, index) => (
              <Image
                alt=""
                src={`/club-road-map-${index + 1}.jpg`}
                width={400}
                height={600}
                className="flex-1 w-[250px] lg:w-[400px] object-contain object-center"
              />
            ))}
          </div>
        </div>
      </ContentBox>
    </div>
  );
}
