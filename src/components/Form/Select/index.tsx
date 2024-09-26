"use client";
import Skeleton from "@/components/Assets/Skeleton";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import usePopup from "@/hooks/usePopup";
import clsx from "clsx";
import { useEffect, useState } from "react";

type SelectItem = {
  label: string;
  value: string | number;
};
type Props = {
  items: SelectItem[];
  label: string;
  isLoading?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  defaultValue?: string | number;
};

export default function Select({
  items,
  label,
  isLoading,
  value,
  onChange,
  className,
  defaultValue = "null",
}: Props) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const { open, setOpen, wrapperRef } = usePopup();
  useEffect(() => {
    handleChange(defaultValue);
  }, [defaultValue]);

  const handleChange = (selectedValue: any) => {
    setInputValue(() => selectedValue);
    onChange?.(selectedValue);
  };
  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          `relative flex  min-w-[200px] items-center justify-between pl-12 bg-hgray-200 dark:text-white w-full p-2 rounded-lg outline outline-2 outline-hgray-300 dark:outline-mdark-400 focus:outline-primary-400 dark:bg-mdark-500  `,
          className
        )}
      >
        {isLoading ? (
          <Skeleton />
        ) : inputValue ? (
          [{ label: "انتخاب کنید", value: "null" }, ...items]?.find((i) => i.value === inputValue)?.label
        ) : (
          label
        )}

        {
          <IconDownOpen
            className={`absolute left-1 top-[50%] translate-y-[-50%] ${open && "rotate-180"}`}
            width={22}
            height={22}
          />
        }
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute left-0 right-0 top-[100%] z-50 translate-y-2 rounded-lg bg-white p-2 shadow-md dark:bg-mdark-600"
        >
          {[{ label: "انتخاب کنید", value: "null" }, ...items]?.map((item) => (
            <span
              key={item.label}
              className="border:bg-mdark-400 block cursor-pointer border-b border-hgray-300 py-2 text-sm font-medium text-hgray-600 hover:bg-hgray-200 dark:bg-mdark-400 dark:text-hgray-200"
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
