import Button from "@/components/Assets/Button";
import EmptyButton from "@/components/Assets/EmptyButton";
import NextLink from "@/components/Assets/NextLink";
import Paper from "@/components/Assets/Paper";
import IconCheckLg from "@/components/Icons/IconCheckLg";
import IconWindowClose from "@/components/Icons/IconWindowClose";
import { toLocalString } from "@/lib/number";
import React from "react";

const items = [
  {
    label: "نقره ای",
    price: 230000,
    discount: 10,
    facilities: [
      {
        label: "دسترسی دائم به ویدیوها",
        status: 1,
      },
      {
        label: "آزمون در هر فصل",
        status: 1,
      },
      {
        label: "نقشه راه سرفصل",
        status: 1,
      },
      {
        label: "پشتیبانی",
        status: 1,
      },
      {
        label: "استعدادیابی",
        status: 1,
      },
    ],
  },
  {
    label: "طلایی",
    price: 230000,
    discount: 10,
    most_popular: 1,
    facilities: [
      {
        label: "دسترسی دائم به ویدیوها",
        status: 1,
      },
      {
        label: "آزمون در هر فصل",
        status: 1,
      },
      {
        label: "نقشه راه سرفصل",
        status: 1,
      },
      {
        label: "پشتیبانی",
        status: 1,
      },
      {
        label: "استعدادیابی",
        status: 1,
      },
    ],
  },
  {
    label: "برنزی",
    price: 230000,
    discount: 10,
    facilities: [
      {
        label: "دسترسی دائم به ویدیوها",
        status: 1,
      },
      {
        label: "آزمون در هر فصل",
        status: 1,
      },
      {
        label: "نقشه راه سرفصل",
        status: 1,
      },
      {
        label: "پشتیبانی",
        status: 1,
      },
      {
        label: "استعدادیابی",
        status: 0,
      },
    ],
  },
];
export default function PlanList() {
  return (
    <div className="flex flex-col lg:flex-row lg:flex-nowrap justify-evenly  gap-11">
      {items.map((item) => (
        <ClubPlanItem key={item.label} {...item} />
      ))}
    </div>
  );
}

type ClubPlanItemProps = {
  label: string;
  price: number;
  discount: number;
  most_popular?: number;
  facilities: {
    label: string;
    status: number;
  }[];
};
function ClubPlanItem(props: ClubPlanItemProps) {
  const { label, discount, facilities, price, most_popular } = props;
  return (
    <Paper className="flex-1 overflow-hidden lg:overflow-visible relative flex gap-4 flex-col items-center border border-hgray-300 dark:border-mdark-600 shadow-md p-8 hover:shadow-xl hover:border-2 hover:border-primary-400 dark:hover:border-primary-100">
      <p className="rounded-full bg-primary-100 flex items-center justify-center text-hgray-300 text-center w-[60px] h-[60px]">
        مهدیار
        <br />
        شو
      </p>
      <p className="text-lg text-primary-600 dark:text-text-dark-4 font-extrabold">
        {label}
      </p>

      <p className="mt-4 text-5xl text-primary-800 dark:text-text-dark-2 font-medium">
        {toLocalString(price)} <span className="text-base">تومان</span>
      </p>

      <p
        className={`${discount ? "bg-green-200 text-primary-400" : "bg-red-500 text-white"}   rounded-md min-w-32 text-center p-1 mt-3`}
      >
        {discount ? `${discount}% تخفیف` : "بدون تخفیف"}
      </p>

      <div className="w-full my-3">
        {facilities.map((fa) => (
          <div className="flex py-2" key={fa.label}>
            <span
              className={`w-4 h-4 ${fa.status === 1 ? "bg-green-500" : "bg-red-700"}`}
            >
              {fa.status === 1 ? (
                <IconCheckLg
                  width={28}
                  height={28}
                  className="translate-x-2 -translate-y-2"
                />
              ) : (
                <IconWindowClose
                  width={28}
                  height={28}
                  className="translate-x-2 -translate-y-2"
                />
              )}
            </span>

            <p className="pr-2 text-sm text-hgray-500 dark:text-text-dark-1">
              {fa.label}
            </p>
          </div>
        ))}
      </div>

      <Button size="medium" className="w-[200px]">
        ثبت نام
      </Button>

      {most_popular ? (
        <div className="w-[200px] absolute left-[-50px] top-[30px] -rotate-45  flex items-center justify-center h-[40px] border-b-[40px] border-t-0 border-r-transparent border-l-transparent border-x-[35px]  border borde-solid border-primary-300">
          <p className="text-white mb-[-40px]">محبوب ترین</p>
        </div>
      ) : null}
    </Paper>
  );
}
