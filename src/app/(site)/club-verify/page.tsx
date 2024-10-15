"use client"
import Button from "@/components/Assets/Button";
import NextLink from "@/components/Assets/NextLink";
import Paper from "@/components/Assets/Paper";
import Divider from "@/components/Divider";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import IconLoading from "@/components/Icons/IconLoading";
import clubItems from "@/data/clubItems";
import useAuth from "@/hooks/useAuth";
import useLogin from "@/hooks/useLogin";
import { toLocalString } from "@/lib/number";
import { selectToken } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useVerifyZarinpalQuery } from "@/lib/services/mahdyar";
import { toPersianDateFormat } from "@/lib/toPersianDateFormat";
import { PlanType } from "@/types";
import { redirect, useSearchParams } from "next/navigation";
import React, { AnchorHTMLAttributes, DetailedHTMLProps, useMemo } from "react";

export default function ClubVerify() {
  useAuth();
  const searchParams = useSearchParams();
  const Authority = searchParams.get("Authority");
  const token = useAppSelector(selectToken);

  if (!Authority) redirect("/club-register");

  const { data, isLoading } = useVerifyZarinpalQuery(
    {
      Authority: Authority ?? "",
    },
    {
      skip: !Authority,
      refetchOnMountOrArgChange: true,
    }
  );

  const selectedPlan = useMemo(
    () => clubItems.find((i) => i.price === data?.zarinpal_info?.amount),
    [data]
  );

  return (
    <Paper className="w-full flex flex-col gap-y-3 items-center max-w-xs md:max-w-xl my-10 mx-auto border border-hgray-300 dark:border-mdark-400">
      {isLoading || !data ? (
        <div className="flex justify-center items-center h-[400px]">
          <IconLoading width={36} height={36} className="text-primary-400" />
        </div>
      ) : data?.referenceId ? (
        <React.Fragment>
          <img width={100} height={100} src={"/success.png"} alt="" />

          <p className="font-bold text-rose-950 text-2xl dark:text-text-dark-4">
            ثبت نام شما با موفقیت انجام شد.
          </p>

          <Divider space="my-8" className="dark:bg-mdark-500" />

          <div className="flex max-w-sm w-full gap-y-6 flex-wrap justify-between">
            <div className="w-[50%]">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                شماره تراکنش
              </p>
              <p className="font-semibold text-primary-900 dark:text-text-dark-3">
                {data?.referenceId}
              </p>
            </div>
            <div className="w-[50%] ltr">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                تاریخ تراکنش
              </p>
              <p className="font-semibold text-primary-900 dark:text-text-dark-3">
                {toPersianDateFormat(data?.zarinpal_info?.created_at ?? "")}
              </p>
            </div>
            <div className="w-[50%]">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                مبلغ
              </p>
              <p className="font-semibold text-primary-900 dark:text-text-dark-3">
                {toLocalString(data?.zarinpal_info?.amount ?? 0)} تومان
              </p>
            </div>
            <div className="w-[50%] ltr">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                وضعیت
              </p>
              <p className="text-green-500 bg-green-300 rounded-full inline-block px-3 py-1">
                موفق
              </p>
            </div>
          </div>

          <div className="mt-6 gap-5 w-full text-center">
            <ExternalLink href={selectedPlan?.channel}>
              ورود به کانال بسته {selectedPlan?.label}
              (اجباری)
            </ExternalLink>

            <NextLink
              href={`/club`}
              className="flex justify-between items-center pe-0 p-2 py-3 text-hgray-500 border-t border-hgray-350"
            >
              ورود به مهدیار شو
            </NextLink>

            {selectedPlan?.type === PlanType.GOLD && (
              <ExternalLink href="https://poian.ir/">
                ورود به استعداد یابی پویان
              </ExternalLink>
            )}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img width={100} height={100} src={"/fail.png"} alt="" />

          <p className="font-bold text-rose-950 text-2xl dark:text-text-dark-4">
            متاسفیم!
          </p>

          <p className="text-hgray-350 font-semibold text-base">
            تراکنش ناموفق بود.
          </p>

          <p className="text-center text-rose-700 dark:text-text-dark-2 max-w-md font-medium">
            در صورتی که در فرایند پرداخت، مبلغ از حساب شما کسر شد، تا 72 ساعت
            آینده به حساب شما برگشت خواهد خورد.
          </p>

          <Divider space="my-8" className="dark:bg-mdark-500" />

          <div className="flex max-w-sm w-full gap-y-6 flex-wrap justify-between">
            <div className="w-[50%]">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                شماره تراکنش
              </p>
              <p className="font-semibold text-primary-900 dark:text-text-dark-3">
                {data?.zarinpal_info?.authority.replace(/A0+/g, "")}
              </p>
            </div>
            <div className="w-[50%] ltr">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                تاریخ تراکنش
              </p>
              <p className="font-semibold text-primary-900 dark:text-text-dark-3">
                {toPersianDateFormat(data?.zarinpal_info?.created_at ?? "")}
              </p>
            </div>
            <div className="w-[50%]">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                مبلغ
              </p>
              <p className="font-semibold text-primary-900 dark:text-text-dark-3">
                {toLocalString(data?.zarinpal_info?.amount ?? 0)} تومان
              </p>
            </div>
            <div className="w-[50%] ltr">
              <p className="text-hgray-400 font-medium dark:text-text-dark-5">
                وضعیت
              </p>
              <p className="text-rose-500 bg-red-300 rounded-full inline-block px-3 py-1">
                ناموفق
              </p>
            </div>
          </div>

          <div className="mt-6 w-full text-center">
            <Button className="w-full block mx-auto max-w-sm" href="/club-register">
              پرداخت مجدد
            </Button>
          </div>
        </React.Fragment>
      )}
    </Paper>
  );
}

function ExternalLink(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  const { children, ...allProps } = props;
  return (
    <a
      {...allProps}
      target="_blank"
      className="flex justify-between items-center pe-0 p-2 py-3 text-hgray-500 border-t border-hgray-350"
    >
      {children}

      <IconChevronLeft width={22} height={22} />
    </a>
  );
}
