"use clien";
import EmptyButton from "@/components/Assets/EmptyButton";
import Hidden from "@/components/Assets/Hidden";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import Divider from "@/components/Divider";
import IconBagHandle from "@/components/Icons/IconBagHandle";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import IconLoading from "@/components/Icons/IconLoading";
import IconTrashOutline from "@/components/Icons/IconTrashOutline";
import useRemoveFromCart from "@/hooks/cart/useRemoveFromCart";
import usePopup from "@/hooks/usePopup";
import { toLocalString } from "@/lib/number";
import { selectCart } from "@/lib/reduxFeatures/cartSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { MouseEvent } from "react";
import { CartItem } from "@/types/";
import DesktopPopup from "./DesktopPopup";

export default function CartPopup() {
  const { open, setOpen, wrapperRef } = usePopup();
  const cart = useAppSelector(selectCart);
  const content = (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="dark:text-hgray-200">{cart.length} مورد</p>

        <NextLink
          className="text-sm text-blue-500"
          href={cart.length === 0 ? "/products" : "/cart"}
        >
          {cart.length === 0 ? "مشاهده محصولات" : "مشاهده سبد خرید"}
        </NextLink>
      </div>
      <Divider space="my-2" orientation="horizontal" />

      {cart.length === 0 ? <EmptyCart /> : <CartList />}
    </div>
  );
  return (
    <div ref={wrapperRef}>
      <div className="relative flex items-center">
        <EmptyButton
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center dark:text-white bg-hgray-300 dark:bg-mdark-400 rounded-full p-2"
        >
          <IconBagHandle
            width={22}
            height={22}
            className="text-primary-300 dark:text-white "
          />
        </EmptyButton>

        {cart.length > 0 ? (
          <span className="absolute -left-1 top-0 rounded-full bg-rose-500 px-1 text-xs text-white">
            {cart.length}
          </span>
        ) : null}
      </div>
      <Hidden hidden="max-lg">
        <DesktopPopup
          innerClassName="lg:px-6"
          className={`${open ? "lg:!top-[50px] lg:!opacity-100" : "lg:hover:top-[-100%]"} max-w-lg left-0 right-[unset]`}
        >
          {content}
        </DesktopPopup>
      </Hidden>
    </div>
  );
}

function EmptyCart() {
  return (
    <div>
      <p className="py-5 text-center font-medium text-hgray-400 dark:text-hgray-200">
        هنوز محصولی به سبد خرید اظافه نشده
      </p>

      <NextLink
        className="inline-block w-full rounded-md bg-primary-300 py-2 text-center text-white dark:bg-primary-800"
        href="/products"
      >
        مشاهده محصولات
      </NextLink>
    </div>
  );
}

function CartList() {
  const cart = useAppSelector(selectCart);

  return (
    <div>
      {cart.map((item) => (
        <CartListItem key={item.id} {...item} />
      ))}

      <div className="flex justify-between py-3">
        <p className="font-medium text-hgray-400 dark:text-hgray-200">مجموع:</p>

        <p className="font-medium text-hgray-400 dark:text-hgray-200">
          {toLocalString(cart.reduce((c, i) => +i.price + c, 0))}
          <span className="text-xs">تومان</span>
        </p>
      </div>

      <NextLink
        href={"/cart"}
        className="flex w-full justify-center rounded-md bg-primary-300 py-3 text-white dark:bg-primary-800"
      >
        تکمیل فرایند خرید
        <IconChevronLeft width={22} height={22} />
      </NextLink>
    </div>
  );
}

function CartListItem(item: CartItem) {
  const { removeFromCart, isLoading } = useRemoveFromCart();
  const handleRemoveFromCart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(item.id);
  };
  return (
    <div
      onClick={(e) => e.preventDefault()}
      className="flex items-center justify-between border-b border-solid border-hgray-300 py-3"
    >
      <div className="flex justify-between">
        <Image
          src={item.product.courses.picture ?? "/temp-images/course-card.jpg"}
          width={65}
          height={50}
          className="rounded-md object-contain"
          alt=""
        />
        <div className="pr-4">
          <p className="font-medium text-hgray-600 dark:text-text-dark-4">{item.name}</p>
          <p className="text-sm text-hgray-400 dark:text-text-dark-5">
            {toLocalString(item.price)}
            <span className="text-xs">تومان</span>
          </p>
        </div>
      </div>
      <EmptyButton onClick={handleRemoveFromCart} className="text-rose-400">
        {isLoading ? (
          <IconLoading width={24} height={24} />
        ) : (
          <IconTrashOutline width={24} height={24} />
        )}
      </EmptyButton>
    </div>
  );
}
