"use client";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import usePopup from "@/hooks/usePopup";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type SelectItem = {
  label: string;
  value: string | number;
};
export type SelectProps = {
  items: SelectItem[];
  label: string;
  isLoading?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  defaultValue?: string | number | null;
  initOption?: boolean;
  name?: string;
};

export default function Select({
  items,
  label,
  isLoading,
  onChange,
  className,
  defaultValue = "null",
  initOption = true,
  name = "select-field",
}: SelectProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const { open, setOpen, wrapperRef } = usePopup();
  useEffect(() => {
    handleChange(defaultValue);
  }, [defaultValue]);

  const handleChange = (selectedValue: any) => {
    setInputValue(() => selectedValue);
    onChange?.(selectedValue);
  };

  const { watch } = useFormContext();

  const selectedValue = watch(name);

  useEffect(() => {
    handleChange(selectedValue);
  }, [selectedValue]);
  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className={clsx(
          `relative flex  min-w-[200px] items-center justify-between pl-12 bg-hgray-200 dark:text-white w-full p-2 rounded-lg outline outline-2 outline-hgray-300 dark:outline-mdark-400 focus:outline-primary-400 dark:bg-mdark-500  `,
          className
        )}
      >
        {isLoading ? (
          <p>دریافت اطلاعات...</p>
        ) : inputValue ? (
          [
            ...(initOption ? [{ label: "انتخاب کنید", value: "null" }] : []),
            ...items,
          ]?.find((i) => i.value === inputValue)?.label
        ) : (
          label
        )}

        {
          <IconDownOpen
            className={`absolute left-1 top-[50%] translate-y-[-50%] ${
              open && "rotate-180"
            }`}
            width={22}
            height={22}
          />
        }
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute left-0 right-0 top-[100%] max-h-[300px] overflow-auto z-50 translate-y-2 rounded-lg bg-white p-2 shadow-md dark:bg-mdark-600"
        >
          {[
            ...(initOption ? [{ label: "انتخاب کنید", value: "null" }] : []),
            ...items,
          ]?.map((item) => (
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
