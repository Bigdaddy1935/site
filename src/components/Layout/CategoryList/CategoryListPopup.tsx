"use client";
import clsx from "clsx";
import EmptyButton from "@/components/Assets/EmptyButton";
import NextLink from "@/components/Assets/NextLink";
import IconCaretDown from "@/components/Icons/IconCaretDown";
import usePopup from "@/hooks/usePopup";
import { Category } from "@/types";

const categoryOrder = [4, 3, 1, 2, 17];
export default function CategoryListPopup({categories} : {categories : Category[]} ) {
  const { open, setOpen, wrapperRef } = usePopup();
  return (
    <div
      ref={wrapperRef}
      className="group relative w-full lg:flex lg:w-auto  lg:items-center lg:justify-start"
    >
      <EmptyButton
        onClick={() => setOpen(!open)}
        className="flex w-full items-center font-medium text-primary-700  dark:text-white max-lg:justify-between lg:w-auto "
      >
        موضوعات
        <IconCaretDown
          className={`${open && "rotate-180"}`}
          width={22}
          height={22}
        />
      </EmptyButton>
      <div
        className={clsx(
          `w-[220px] rounded-lg p-4 transition-all  duration-500 lg:absolute lg:translate-y-4 lg:bg-hgray-200  lg:shadow-xl lg:delay-75  lg:dark:bg-mdark-600`,
          open
            ? "opacity-100 max-lg:h-[300px] lg:top-[100%] lg:z-10 lg:h-[300px]"
            : "h-0 overflow-hidden opacity-0 lg:top-[-100%] lg:-z-50"
        )}
      >
        {categoryOrder.map((catId) => {
              const item = categories?.find((i) => i.id === catId);
              return item ? (
                <NextLink
                  key={item.id}
                  className="flex w-full items-center justify-between py-4 text-hgray-600 transition-colors hover:text-primary-300 dark:text-hgray-200 dark:hover:text-primary-100"
                  href={`/${item.slug}-${item.id}`}
                >
                  {item.name}
                </NextLink>
              ) : null;
            })}
      </div>
    </div>
  );
}
