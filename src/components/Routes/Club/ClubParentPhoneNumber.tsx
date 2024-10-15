"use client";
import FieldTitle from "@/components/Assets/FieldTitle";
import MobileField from "@/components/Form/MobileField";
import calculateAgeJalali from "@/lib/calculateAgeJalali";
import { useEffect, useMemo } from "react";

import { useFormContext } from "react-hook-form";

export default function ClubParentPhoneNumber() {
  const { watch, trigger } = useFormContext();
  const birthday = watch("birthday");

  const isRequired = useMemo(() => {
    return birthday && calculateAgeJalali(birthday) < 25;
  }, [birthday]);

  useEffect(() => {
    trigger("parent_num");
  }, [isRequired]);
  return (
    <div className="px-3 w-full lg:w-[50%]">
      <FieldTitle title="شماره والدین" required={isRequired} />
      <MobileField
        className="bg-hgray-200 dark:bg-mdark-500 dark:text-white w-full p-2 rounded-lg !outline !outline-2 !outline-hgray-300 dark:!outline-mdark-400 focus:!outline-primary-400"
        label=""
        name="parent_num"
        required={isRequired}
      />
    </div>
  );
}
