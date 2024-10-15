"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import Hidden from "@/components/Assets/Hidden";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import IconBookmark from "@/components/Icons/IconBookmark";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import IconCopy from "@/components/Icons/IconCopy";
import IconWallet from "@/components/Icons/IconWallet";
import useCopyToClipBoard from "@/hooks/useCopyToClipboard";
import useLogout from "@/hooks/useLogout";
import usePopup from "@/hooks/usePopup";
import { formatPhoneNumber, toLocalString } from "@/lib/number";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import DesktopPopup from "./DesktopPopup";
import IconClassTeacher from "../Icons/IconClassTeacher";
import IconUserProfile from "../Icons/IconUserProfile";
import IconLogout from "../Icons/IconLogout";

export default function AuthUserMenu() {
  const user = useAppSelector(selectUser);
  const { open, setOpen, wrapperRef } = usePopup();
  const { copyToClipboard } = useCopyToClipBoard();
  const { handleLogout } = useLogout();
  const content = (
    <>
      <div className="flex-1 px-4 flex flex-col items-center gap-3">
        <Image
          src={user?.picture ?? "/default-profile.png"}
          width={85}
          height={85}
          alt=""
          className="rounded-full w-[85px] h-[85px] overflow-hidden object-cover object-top"
        />

        <p
          style={{ direction: "ltr" }}
          className="text-primary-700 dark:text-text-dark-2 font-medium text-base"
        >
          {formatPhoneNumber(user?.phone)}
        </p>
        <p className="text-primary-700 dark:text-text-dark-2 font-medium text-base">
          {user?.username}
        </p>
      </div>

      <div className="w-0.5 bg-hgray-300 dark:bg-mdark-500 mx-2" />

      <div className="flex-1 flex flex-col gap-3 px-4">
        <NextLink
          className="flex justify-between items-center text-center w-full p-1.5 text-hgray-600 bg-hgray-100 lg:bg-hgray-200 dark:bg-mdark-500 dark:text-hgray-200 rounded-lg"
          href={"/profile"}
        >
          مشاهده پروفایل
          <span>
            <IconUserProfile
              width={22}
              height={22}
              className="text-primary-700 dark:text-hgray-200"
            />
          </span>
        </NextLink>
        <NextLink
          className="flex justify-between items-center text-center w-full p-1.5 text-hgray-600 bg-hgray-100 lg:bg-hgray-200 dark:bg-mdark-500 dark:text-hgray-200 rounded-lg"
          href={"/profile/my-class"}
        >
          کلاس های من
          <span>
            <IconClassTeacher
              width={22}
              height={22}
              className="text-primary-700 dark:text-hgray-200"
            />
          </span>
        </NextLink>
        <NextLink
          className="flex justify-between items-center text-center w-full p-1.5 text-hgray-600 bg-hgray-100 lg:bg-hgray-200 dark:bg-mdark-500 dark:text-hgray-200 rounded-lg"
          href={"/profile/orders"}
        >
          خریداری شده
          <span>
            <IconWallet width={22} height={22} className="text-primary-700 dark:text-hgray-200" />
          </span>
        </NextLink>
        <NextLink
          className="flex justify-between items-center text-center w-full p-1.5 text-hgray-600 bg-hgray-100 lg:bg-hgray-200 dark:bg-mdark-500 dark:text-hgray-200 rounded-lg"
          href={"/profile/bookmarks"}
        >
          نشان شده ها
          <span>
            <IconBookmark width={22} height={22} className="text-primary-700 dark:text-hgray-200" />
          </span>
        </NextLink>
      </div>

      <div className="w-0.5 bg-hgray-300 dark:bg-mdark-500 mx-2" />

      <div className="flex-1 flex flex-col justify-between px-4">
        <NextLink
          className="flex justify-between items-center text-hgray-600 dark:text-hgray-200 max-lg:text-sm max-lg:my-3"
          href={"/profile/wallet"}
        >
          کیف پول
          <span>{toLocalString(user?.wallet_balance ?? 0)} تومان</span>
        </NextLink>
        <div className="flex items-center gap-3">
          <p className="inline-block text-hgray-600 max-lg:text-sm dark:text-hgray-200">
            کد معرف شما
          </p>
          <div className="flex items-center">
            <span className="text-center inline-block w-full px-3 py-1 text-hgray-600 bg-hgray-100 dark:bg-mdark-500 lg:bg-hgray-200 dark:text-hgray-200 rounded-xl">
              {user?.code}
            </span>

            <EmptyButton
              onClick={() => copyToClipboard(user?.code ?? "")}
              className="mr-3 dark:bg-mdark-500"
            >
              <IconCopy width={22} height={22} className="text-primary-400" />
            </EmptyButton>
          </div>
        </div>

        <div className="max-lg:my-2">
          <div className="h-0.5 w-full mb-3 bg-hgray-300 dark:bg-mdark-500" />

          <EmptyButton
            onClick={() => handleLogout()}
            className="text-hgray-600 w-full p-2 flex justify-between items-center border border-solid hover:border-solid border-hgray-600 rounded-md dark:border-hgray-200 text-right dark:text-hgray-200"
          >
            خروج
            <span>
              <IconLogout width={24} height={24} />
            </span>
          </EmptyButton>
        </div>
      </div>
    </>
  );
  return (
    <div className="relative" ref={wrapperRef}>
      <EmptyButton
        onClick={() => setOpen(!open)}
        className="w-[90%] lg:p-0 p-1 lg:w-[60px] flex justify-between max-lg:bg-hgray-200 dark:max-lg:bg-mdark-600 lg:justify-center items-center"
      >
        <Image
          src={user?.picture ?? "/default-profile.png"}
          width={38}
          height={38}
          alt=""
          className="rounded-full w-[36px] h-[36px] overflow-hidden object-cover"
        />

        <Hidden hidden="lg">
          <p className="mr-1 text-primary-700 dark:text-hgray-200">
            {user?.username}
          </p>

          <span className="flex-1 flex justify-end">
            <IconChevronLeft
              className={`text-primary-700 dark:text-hgray-200 ${open && "rotate-180"}`}
              width={32}
              height={32}
            />
          </span>
        </Hidden>
      </EmptyButton>

      <Hidden hidden="max-lg">
        <DesktopPopup
          innerClassName="lg:px-6"
          className={`${open ? "lg:!opacity-100 lg:!top-[50px]" : "lg:hover:top-[-100%]"} max-w-4xl right-[unset] z-[40]`}
        >
          {content}
        </DesktopPopup>
      </Hidden>

      <Hidden hidden="lg">
        {open && (
          <div className="flex relative border-t border-solid border-hgray-100 dark:border-mdark-500 shadow-sm flex-col p-1 bg-hgray-200 dark:bg-mdark-400 w-[90%] gap-2">
            {content}
          </div>
        )}
      </Hidden>
    </div>
  );
}
