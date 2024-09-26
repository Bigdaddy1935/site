"use client";

import EmptyButton from "@/components/Assets/EmptyButton";
import IconLogout from "@/components/Icons/IconLogout";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useNextRouter from "./useNextRouter";
import { useLogoutMutation } from "@/lib/services/auth";
import IconLoading from "@/components/Icons/IconLoading";
import { toast } from "react-toastify";

export default function useLogout() {
  const user = useAppSelector(selectUser);
  const router = useNextRouter();
  const pathName = usePathname();
  const { setContent } = useMobilePopup();
  const [logoutRequest, { isLoading }] = useLogoutMutation();
  const handleLogout = () => {
    setContent({
      content: (
        <div className="p-5">
          <div className="flex justify-center items-center mb-3">
            {isLoading ? (
              <IconLoading
                width={68}
                height={68}
                className="text-rose-900/30"
              />
            ) : (
              <IconLogout width={68} height={68} className="text-rose-900/30" />
            )}
          </div>
          <p className="text-center text-hgray-500  dark:text-text-dark-2">
            {isLoading
              ? "درحال خروج از سیستم"
              : "آیا می خواهید از سیستم خارج شوید"}
          </p>

          <div className="mt-6 flex justify-center gap-10">
            <EmptyButton
              onClick={() =>
                logoutRequest().then(() =>
                  toast.success("خروج از حساب کاربری با موفقیت انجام شد.")
                )
              }
              disabled={isLoading}
              className="text-primary-300 dark:text-text-dark-5"
            >
              تایید
            </EmptyButton>
            <EmptyButton
              disabled={isLoading}
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
  };

  useEffect(() => {
    if (!user && pathName.startsWith("/profile"))
      if (!user) {
        ///return router.push('/');
        router.refresh();
      }
  }, [user]);

  return { handleLogout };
}
