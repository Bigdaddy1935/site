"use client";
import Button from "@/components/Assets/Button";
import Paper from "@/components/Assets/Paper";
import IconCheckLg from "@/components/Icons/IconCheckLg";
import IconMessageSquare from "@/components/Icons/IconMessageSquare";
import IconWindowClose from "@/components/Icons/IconWindowClose";
import clubItems from "@/data/clubItems";
import useHandleLogin from "@/hooks/useHandleLogin";
import useNextRouter from "@/hooks/useNextRouter";
import { toLocalString } from "@/lib/number";
import { selectUser, setRedirect } from "@/lib/reduxFeatures/authSlice";
import { setPlan } from "@/lib/reduxFeatures/headerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { ClubPlanItem as ClubPlanItemType, PlanType } from "@/types";
import clsx from "clsx";

export default function PlanList() {
  return (
    <div className="flex flex-col lg:flex-row lg:flex-nowrap justify-evenly  gap-11">
      {clubItems.map((item) => (
        <ClubPlanItem key={item.label} {...item} />
      ))}
    </div>
  );
}

function ClubPlanItem(props: ClubPlanItemType & { top?: boolean }) {
  const { label, facilities, price, type, spic_label, image, top } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useNextRouter();
  const { handleLogin } = useHandleLogin();
  const handleClick = (type: PlanType) => {
    dispatch(setPlan(type));
    if (!user) return handleLogin("/club-register");

    router.push("/club-register");
  };
  return (
    <Paper
      className={clsx(
        `flex-1 overflow-hidden order-2 lg:overflow-visible relative flex gap-4 flex-col items-center border-2 border-hgray-300 dark:border-mdark-600 shadow-md p-8 hover:shadow-xl hover:border-2 hover:border-primary-400 dark:hover:border-primary-100`,
        type === PlanType.GOLD &&
          "order-1 shadow-[0px_0px_5px_0px_#FFD700] lg:order-2"
      )}
    >
      <div className="rounded-full bg-primary-100 flex items-center justify-center overflow-hidden text-center w-[60px] h-[60px]">
        <img src={image} width={60} height={60} />
      </div>
      <p className="text-lg text-primary-600 dark:text-text-dark-4 font-extrabold">
        {label}
      </p>

      <p className="mt-4 text-5xl text-primary-800 dark:text-text-dark-2 font-medium">
        {toLocalString(price)} <span className="text-base">تومان</span>
      </p>

      {/*   <p
        className={`${
          discount ? "bg-green-200 text-primary-400" : "bg-red-500 text-white"
        }   rounded-md min-w-32 text-center p-1 mt-3`}
      >
        {discount ? `${discount}% تخفیف` : "بدون تخفیف"}
      </p> */}

      <div className="w-full my-3">
        {facilities.map((fa) => (
          <div className="flex py-2" key={fa.label}>
            <span
              className={`w-4 h-4 ${
                fa.status === 1 ? "bg-green-500" : "bg-red-700"
              }`}
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

      <Button
        onClick={() => handleClick(type)}
        size="medium"
        className="w-[200px]"
      >
        ثبت نام
      </Button>

      <a
        className="flex text-primary-300 items-center dark:text-text-dark-3"
        href="https://web.eitaa.com/#@Mahdyarsho_Register"
        target="_blank"
      >
        <IconMessageSquare className="ml-1" width={22} height={22} />
        ارتباط با پشتیبانی
      </a>

      {spic_label ? (
        <div className="w-[200px] absolute left-[-50px] top-[30px] -rotate-45  flex items-center justify-center h-[40px] border-b-[40px] border-t-0 border-r-transparent border-l-transparent border-x-[35px]  border borde-solid border-primary-300">
          <p className="text-white text-sm font-medium mb-[-40px] text-nowrap">
            {spic_label}
          </p>
        </div>
      ) : null}
    </Paper>
  );
}
