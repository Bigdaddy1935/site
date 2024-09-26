"use client";
import ContentBox from "@/components/Assets/ContentBox";
import EmptyButton from "@/components/Assets/EmptyButton";
import Divider from "@/components/Divider";
import IconArrowDownShort from "@/components/Icons/IconArrowDownShort";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import IconPatchQuestion from "@/components/Icons/IconPatchQuestion";
import React, { useState } from "react";

const title = "متن سوال متداول کاربران درباره مهیارشو";

const content = `طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بود. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگران را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند.`;
export default function ClubFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="group flex-auto  cursor-pointer rounded-lg bg-hgray-200 p-3  dark:bg-mdark-600"
        >
          <div
            onClick={() => setOpen(open === index ? null : index)}
            className="flex items-center justify-between  text-lg text-hgray-600 dark:text-white"
          >
            <IconPatchQuestion width={22} height={22}  />
            <span className="flex-1 pr-2">{title}</span>

            <EmptyButton>
              <IconDownOpen
                width={28}
                height={28}
                className={`text-primary-300 ${open ? "rotate-180" : ""}`}
              />
            </EmptyButton>
          </div>
          <ContentBox open={open === index}>
            <Divider space="my-3" />

            <div className="px-1 pb-3 text-sm leading-6 text-hgray-500 dark:text-white">
              {content}
            </div>
          </ContentBox>
        </div>
      ))}
    </div>
  );
}
