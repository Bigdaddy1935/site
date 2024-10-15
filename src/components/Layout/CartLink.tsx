"use client";
import NextLink from "@/components/Assets/NextLink";
import IconCart3 from "@/components/Icons/IconCart3";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { selectCart } from "@/lib/reduxFeatures/cartSlice";
import { useAppSelector } from "@/lib/reduxHooks";

export default function CartLink({ label = true }: { label?: boolean }) {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  return user ? (
    <NextLink
      className="flex relative items-center text-hgray-600 dark:text-white lg:hover:text-primary-300 px-2 py-1.5"
      href={"/cart"}
    >
      <IconCart3 width={22} height={22} />

      {label && <span className="text-base flex-1 mr-4">سبد خرید</span>}

      {cart.length > 0 ? (
        <span
          className={`${label ? "w-4 h-4 bg-rose-700" : "absolute w-4 h-4 bg-primary-700"} rounded-full  text-center inline-block text-white text-xs  right-0 top-0`}
        >
          {cart.length}
        </span>
      ) : null}
    </NextLink>
  ) : null;
}
