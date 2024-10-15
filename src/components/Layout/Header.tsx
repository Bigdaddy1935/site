import Container from "@/components/Assets/Container";
import Hidden from "@/components/Assets/Hidden";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import HeaderLeft from "./HeaderLeft";
import MobileMenu from "./MobileMenu";
import NavMenu from "./NavMenu";
import SearchBoxProvider from "./SearchBox/SearchBoxProvider";
import SearchBox from "./SearchBox";
import Link from "next/link";
import ScrollHidden from "../Assets/ScrollHidden";
import HeaderAds from "./HeaderAds";
import React from "react";

function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-hgray-300 bg-hgray-100 dark:border-mdark-400 dark:bg-mdark-600">
   {/*    <ScrollHidden height={65}>
        <HeaderAds />
      </ScrollHidden> */}
      <SearchBoxProvider>
        <Container className="flex h-[4rem] items-center justify-between">
          <Hidden hidden="max-lg">
            <NextLink href={"/"} className="relative inline-block">
              <Image
                className="object-contain"
                src={"/logo.png"}
                alt="آکادمی روح بخش"
                width={80}
                height={50}
                priority
              />
              {/* <Image
                className="hidden dark:hidden min-[1269px]:block"
                src={"/logo.png"}
                alt="آکادمی روح بخش"
                fill
                priority
              />
              <Image
                className="hidden min-[1269px]:dark:block max-[1269px]:hidden"
                src={"/logo-dark.png"}
                alt="آکادمی روح بخش"
                fill
                priority
              />
              <Image
                className="block dark:hidden min-[1269px]:hidden"
                src={"/mobile-logo.png"}
                alt="آکادمی روح بخش"
                width={60}
                height={60}
                priority
              />
              <Image
                className="hidden max-[1269px]:dark:block"
                src={"/logo-mobile-dark.png"}
                alt="آکادمی روح بخش"
                width={60}
                height={60}
                priority
              /> */}
            </NextLink>
          </Hidden>
          <div className="hidden max-w-md flex-1 items-center lg:flex">
            <SearchBox />
          </div>

          <MobileMenu />

          <HeaderLeft />
        </Container>

        <Hidden hidden="max-lg">
          <ScrollHidden height={65}>
            <Container>
              <div className="hidden items-center justify-between lg:flex">
                <NavMenu />

                {/* <Link href={"/club"} className="text-primary-300 font-medium">
                  ورود به مهدیار شو
                </Link> */}
              </div>
            </Container>
          </ScrollHidden>
        </Hidden>
      </SearchBoxProvider>
    </header>
  );
}

export default React.memo(Header);
