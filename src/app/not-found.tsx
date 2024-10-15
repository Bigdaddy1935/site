import Container from "@/components/Assets/Container";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import Header from "@/components/Layout/Header";
import React from "react";

export default function Page404() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Container className="flex flex-col lg:flex-row items-center justify-between py-10">
          <div className="flex-1 flex justify-center items-center text-center">
            <Image
              className="block dark:hidden  max-lg:w-[200px]"
              src={"/404.svg"}
              width={400}
              height={400}
              alt=""
            />
            <Image
              className="hidden dark:block max-lg:w-[200px]"
              src={"/404-dark.svg"}
              width={400}
              height={400}
              alt=""
            />
          </div>

          <div className="flex-1 text-center">
            <p className="text-primary-400 dark:text-primary-50 text-[5rem] lg:text-[10rem]">
              404
            </p>
            <p className="text-hgray-500 dark:text-text-dark-3 text-xl">
              صفحه ای که دنبال آن بودید یافت نشد
            </p>
            <NextLink
              className="text-primary-800 dark:text-text-dark-3 flex justify-center gap-4  mt-5"
              href={"/"}
            >
              رفتن به صفحه اصلی
              <IconChevronLeft width={22} height={22} />
            </NextLink>
          </div>
        </Container>
      </main>
    </React.Fragment>
  );
}
