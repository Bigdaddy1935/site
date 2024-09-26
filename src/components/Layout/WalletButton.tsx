"use client";
import React from "react";
import NextLink from "../Assets/NextLink";
import IconWallet from "../Icons/IconWallet";
import { useAppSelector } from "@/lib/reduxHooks";
import { selectUser } from "@/lib/reduxFeatures/authSlice";

export default function WalletButton() {
  const user = useAppSelector(selectUser);
  return user ? (
    <NextLink
      className="flex w-full items-center rounded-md bg-primary-300 p-2 text-white"
      href={"/profile/wallet"}
    >
      <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-300 lg:bg-white">
        <IconWallet
          width={22}
          height={22}
          className="text-white lg:text-primary-300"
        />
      </span>

      <div className=" mr-4">
        <span className="text-base text-white lg:text-lg">کیف پول</span>
        <p className="hidden text-xs text-white lg:block">
          شارژ کیف پول برای دسترسی به محتواهای بیشتر
        </p>
      </div>
    </NextLink>
  ) : null;
}
