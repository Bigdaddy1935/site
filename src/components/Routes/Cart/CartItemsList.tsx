"use client";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import Paper from "@/components/Assets/Paper";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import { toLocalString } from "@/lib/number";
import { useGetCartQuery } from "@/lib/services/cart";
import { CartItem as CartItemType } from "@/types/";
import RemoveCartItemBtn from "./RemoveCartItemBtn";
import Skeleton from "@/components/Assets/Skeleton";
import Hidden from "@/components/Assets/Hidden";

export default function CartItemsList() {
  const { isLoading, data } = useGetCartQuery();
  return (
    <div className="flex flex-1 flex-col gap-5">
      {isLoading ? (
        <>
          <Skeleton width="100%" height="120px" />
          <Skeleton width="100%" height="120px" />
          <Skeleton width="100%" height="120px" />
        </>
      ) : data?.cart.length === 0 ? (
        <EmptyCart />
      ) : (
        data?.cart.map((item) => <CartItem {...item} key={item.id} />)
      )}
    </div>
  );
}

function CartItem(item: CartItemType) {
  const {
    product: { courses },
  } = item;
  const catrgory = courses.categories?.[0];
  return (
    <Paper className="relative bg-hgray-200 shadow-sm max-w">
      <div className="flex justify-between">
        <div className="flex">
          <div className="">
            <Image
              width={100}
              height={100}
              src={item.attr}
              alt=""
              className="object-center rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between items-start pr-4">
            <span
              style={{
                color: catrgory?.color,
                borderColor: catrgory?.color,
              }}
              className="text-sm border border-primary-600 dark:text-text-dark-1 border-solid rounded-lg px-2"
            >
              {catrgory?.name}
            </span>
            <p className="text-base text-hgray-600 dark:text-text-dark-1 max-w-xl mt-2">
              {item.name}
            </p>
            <Hidden hidden="max-lg">
              <p className="text-sm text-hgray-600 dark:text-text-dark-1 mt-4">
                تعداد درس: {courses.lessons_count}
              </p>
              <p className="text-sm text-hgray-600  dark:text-text-dark-1">
                استاد: {courses.course_teacher}
              </p>
            </Hidden>
          </div>
        </div>

        <div className="flex absolute left-2 max-lg:h-[calc(100%-20px)] lg:relative flex-col justify-between items-end">
          <RemoveCartItemBtn item_id={item.id} />

          <div className="flex lg:w-40 justify-between">
            <p className="text-base text-primary-700 dark:text-text-dark-1 font-bold">
              {toLocalString(item.price)}
            </p>

            <p className="text-base text-hgray-400 dark:text-hgray-200 font-bold">
              تومان
            </p>
          </div>
        </div>
      </div>

      <Hidden hidden="lg">
        <p className="text-sm text-hgray-600 dark:text-text-dark-1 mt-4">
          تعداد درس: {courses.lessons_count}
        </p>
        <p className="text-sm text-hgray-600  dark:text-text-dark-1">
          استاد: {courses.course_teacher}
        </p>
      </Hidden>
    </Paper>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <Image
        src={"/empty-cart.png"}
        width={400}
        height={400}
        className="object-contain rounded-md"
        alt=""
      />

      <p className="text-lg text-hgray-400  dark:text-text-dark-1 font-medium">
        محصولی در سبد خرید وجود ندارد
      </p>

      <NextLink
        className="bg-primary-300 text-white flex justify-center rounded-md w-full max-w-56 py-2 text-center"
        href="/products"
      >
        مشاهده محصولات
        <IconChevronLeft width={22} height={22} />
      </NextLink>
    </div>
  );
}
