"use client";
import Skeleton from "@/components/Assets/Skeleton";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import usePopup from "@/hooks/usePopup";
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
};

export default function Select({
  items,
  label,
  isLoading,
  value,
  onChange,
}: Props) {
  const [inputValue, setInputValue] = useState(value);
  const { open, setOpen, wrapperRef } = usePopup();
  useEffect(() => {}, [inputValue]);

  const handleChange = (selectedValue: any) => {
    setInputValue(() => selectedValue);
    onChange?.(selectedValue);
  };
  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex min-w-[200px] items-center justify-between rounded-md border border-solid border-hgray-400 p-1.5 pl-12 text-hgray-400 dark:border-mdark-400 dark:text-hgray-400"
      >
        {isLoading ? (
          <Skeleton />
        ) : inputValue ? (
          items.find((i) => i.value === inputValue)?.label
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
          {items?.map((item) => (
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
