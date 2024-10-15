"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import NextLink from "./NextLink";
type Props = {
  activeClassName: string;
  poinerClass?: "top" | "right" | "left" | "bottom";
  isDefaultLink?: boolean;
  defaultLink?: {
    link: string;
  };
} & ComponentProps<typeof Link>;
export default function ActiveLink({
  children,
  href,
  className,
  poinerClass,
  activeClassName,
  defaultLink,
  isDefaultLink,
  ...props
}: Props) {
  const pathName = usePathname();
  const isActiveLink = useMemo(
    () =>
      (defaultLink?.link === pathName && isDefaultLink) ||
      pathName === String(href),
    [defaultLink, isDefaultLink, pathName]
  );
  return (
    <NextLink
      href={href}
      className={twMerge(
        className,
        isActiveLink && activeClassName,
        "relative flex flex-col items-stretch"
      )}
      {...props}
    >
      <span
        className={twMerge(
          "relative max-lg:bg-none lg:flex items-center lg:h-[40px] justify-center z-[20] lg:min-w-full",
          isActiveLink && activeClassName
        )}
      >
        {children}
      </span>
      {isActiveLink && poinerClass && <RightPoiner />}
    </NextLink>
  );
}

function RightPoiner() {
  return (
    <>
      <span className="absolute max-lg:hidden w-[16px] h-[35px] bg-white dark:bg-mdark-600 left-[-16px] z-[12] top-[calc(50%-16px)]"></span>
      <span
        style={{ boxShadow: "-2px 2px 9px 3px #0000001f" }}
        className="bg-transparent max-lg:hidden absolute border-solid w-[20px] h-[20px] border-[10px] border-transparent border-l-white dark:border-l-mdark-600 border-b-white dark:border-b-mdark-600 shadow-2xl left-[-24px] rotate-45 z-[10] top-[calc(50%-10px)]"
      ></span>
    </>
  );
}
