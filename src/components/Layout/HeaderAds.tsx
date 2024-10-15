import React from "react";
import Image from "../Assets/Image";
import NextLink from "../Assets/NextLink";

export default function HeaderAds() {
  return (
    <NextLink
      href={"/products"}
      className="relative overflow-hidden block w-full h-[60px]"
    >
      <Image
        src={"/ads.jpg"}
        fill
        alt=""
        className="scale-x-[2] md:scale-x-[1.3] lg:scale-x-[1] object-fill"
      />
    </NextLink>
  );
}
