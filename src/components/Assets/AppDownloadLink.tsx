"use client";
import Link from "next/link";
import { ComponentProps } from "react";
import EmptyButton from "./EmptyButton";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import IconDownload16 from "../Icons/IconDownload16";
import NextLink from "./NextLink";
import { useGetAppDownloadLinkQuery } from "@/lib/services/base";

type Props =  Omit<ComponentProps<typeof EmptyButton>, "href">;
export default function AppDownloadLink({ children, ...props }: Props) {

  const {data} = useGetAppDownloadLinkQuery()
  const { setContent } = useMobilePopup();
  return (
    <EmptyButton
      onClick={() => {
        setContent({
          content: (
            <div className="p-5">
              <div className="flex justify-center items-center mb-3">
                <IconDownload16
                  width={68}
                  height={68}
                  className="text-rose-900/30"
                />
              </div>
              <p className="text-center text-hgray-500  dark:text-text-dark-2">
                آیا مایل به دانلود اپلیکیشن آکادمی هستید
              </p>

              <div className="mt-6 flex justify-center gap-10">
                <NextLink
                  target="_blank"
                  href={data?.link ?? "#"}
                  className="text-primary-300 dark:text-text-dark-5"
                >
                  تایید
                </NextLink>
                <EmptyButton
                  onClick={() => setContent({ content: null })}
                  className="text-rose-500 dark:text-text-dark-5"
                >
                  انصراف
                </EmptyButton>
              </div>
            </div>
          ),
          origin: "up",
        });
      }}
      {...props}
    >
      {children}
    </EmptyButton>
  );
}
