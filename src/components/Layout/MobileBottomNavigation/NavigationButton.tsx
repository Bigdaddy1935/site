"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import NextLink from "@/components/Assets/NextLink";
import IconBxBlock from "@/components/Icons/IconBxBlock";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  label: string;
  href?: string;
  Icon?: (props: any) => React.JSX.Element;
  type?: "link" | "button";
  image?: string;
  onClick?: () => void;
};

export default function NavigationButton(props: Props) {
  const {
    label,
    href = "#",
    Icon = IconBxBlock,
    type = "link",
    image,
    onClick,
  } = props;
  const path = usePathname();
  return type === "link" ? (
    <NextLink
      className={`flex w-full flex-1 flex-col items-center py-4 text-hgray-600 dark:text-text-dark-3 ${path === href && "border-t-2 border-solid text-primary-300 dark:!text-primary-50 border-primary-300 dark:border-primary-50"}`}
      href={href}
    >
      {image ? (
        <Image
          src={image}
          width={22}
          height={22}
          className="rounded-full object-fill flex-1"
          alt=""
        />
      ) : (
        <Icon width={22} height={22} />
      )}

      <span className="text-xs">{label}</span>
    </NextLink>
  ) : (
    <EmptyButton
      onClick={() => onClick?.()}
      className="flex flex-1 flex-col items-center py-4 text-hgray-600 dark:text-text-dark-3"
    >
      {image ? (
        <Image
          src={image}
          width={22}
          height={22}
          className="rounded-full"
          alt=""
        />
      ) : (
        <Icon width={22} height={22} />
      )}
      <span className="text-xs text-nowrap">{label}</span>
    </EmptyButton>
  );
}
