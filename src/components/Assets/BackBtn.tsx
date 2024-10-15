"use client";
import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";
import IconArrowRightShort from "@/components/Icons/IconArrowRightShort";
import useNextRouter from "@/hooks/useNextRouter";
import EmptyButton from "./EmptyButton";
import { useSearchParams } from "next/navigation";
type Props = {
  text?: string;
  rightIcon?: false | undefined;
  leftIcon?: boolean;
  w?: number;
  link?: string;
  needAnimation?: boolean;
};
export default function BackBtn(props: Props) {
  const {
    text = "بازگشت",
    leftIcon,
    rightIcon,
    w = 24,
    link,
    needAnimation = false,
  } = props;
  const router = useNextRouter();
  const query = useSearchParams();
  return (
    <EmptyButton
      onClick={() =>
        query.get("redirect") === "/profile"
          ? router.push("/")
          : link
            ? router.push(link)
            : router.back()
      }
      className="flex items-center justify-start  font-medium text-hgray-600 dark:text-hgray-200"
    >
      {rightIcon !== false ? (
        <IconArrowRightShort width={w} height={w} />
      ) : null}
      <span className="max-w-[50vw] overflow-hidden">
        <span
          className={`text-nowrap inline-block ${needAnimation && "animate-carousel"}`}
        >
          {query.get("redirect") === "/profile" ? "بازگشت به سایت" : text}
        </span>
      </span>
      {leftIcon && <IconArrowLeftShort width={w} height={w} />}
    </EmptyButton>
  );
}
