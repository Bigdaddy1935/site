"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import NextLink from "@/components/Assets/NextLink";
import IconEye from "@/components/Icons/IconEye";
import IconLock from "@/components/Icons/IconLock";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { toast } from "react-toastify";
import { LessenItem, Model } from "@/types/";
import { useMemo } from "react";
import IconLockOpen from "@/components/Icons/IconLockOpen";

type Props = {
  order: number;
  invoices_exists?: boolean;
  type?: Model;
} & LessenItem;
export default function LessonItem(props: Props) {
  const { order, title, id, course_id, progress, type, invoices_exists, free } =
    props;
  const user = useAppSelector(selectUser);
  const getDeg = () => {
    const percentage = progress?.[0] ? progress[0].percentage : 0;
    const deg = (Number(percentage) / 100) * 360 + 45;

    let initDeg = 0;

    if (deg > 360) {
      initDeg = deg - 360;
    }

    return `#008777 0deg , #008777 ${initDeg}deg ,  transparent ${initDeg}deg ,  transparent 45deg,  #008777 45deg, #008777 ${deg}deg , transparent ${deg}deg`;
  };

  const handleClick = () => {
    toast.error(
      type === "club"
        ? "شما هنوز در مهدیارشو ثبت نام نکرده اید."
        : "شما این محصول را خریداری نکرده اید."
    );
  };

  const userCanSeeLesson = useMemo(() => {
    if (type === "product" && !invoices_exists) return false;
    if (type === "club" && !user?.mahdyar && !user?.authority)
      return false;

    return true;
  }, [user , invoices_exists]);

  return (
    <div className="flex items-stretch  justify-between gap-3">
      <div
        className="h-[60px] w-[60px] rounded-lg bg-hgray-200 p-0.5 dark:bg-mdark-600"
        style={{
          backgroundImage: `conic-gradient(${getDeg()})`,
        }}
      >
        <p className="flex h-full w-full items-center justify-center rounded-lg bg-hgray-200 text-center text-hgray-400 dark:bg-mdark-600 dark:text-hgray-300">
          {order}
        </p>
      </div>
      {!(free === 1) && !userCanSeeLesson ? (
        <EmptyButton
          onClick={handleClick}
          className="flex flex-1  items-center justify-between rounded-lg bg-hgray-200 dark:bg-mdark-600"
        >
          <span className="inline-block flex-1 text-right p-3 text-hgray-400  dark:text-hgray-300">
            {title}
          </span>
          <span className="inline-block min-w-[24px]">
            <IconLock
              width={22}
              height={22}
              className="ml-3 text-rose-500 dark:text-hgray-300"
            />
          </span>
        </EmptyButton>
      ) : (
        <NextLink
          className="flex flex-1  items-center justify-between rounded-lg bg-hgray-200 dark:bg-mdark-600"
          href={`/lessons/${course_id}-${id}`}
        >
          <span className="inline-block flex-1 p-3  text-hgray-400 dark:text-hgray-300">
            {title}
          </span>
          <span className="inline-block min-w-[24px]">
            <IconLockOpen
              width={22}
              height={22}
              className="ml-3 text-green-900 dark:text-hgray-300"
            />
          </span>
        </NextLink>
      )}
    </div>
  );
}
