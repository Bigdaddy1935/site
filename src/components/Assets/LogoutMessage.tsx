"use client"
import React from "react";
import IconLoading from "../Icons/IconLoading";
import IconLogout from "../Icons/IconLogout";
import EmptyButton from "./EmptyButton";
import { useLogoutMutation } from "@/lib/services/auth";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import { toast } from "react-toastify";

export default function LogoutMessage() {
  const [logoutRequest, { isLoading }] = useLogoutMutation();
  const { setContent } = useMobilePopup();
  const userLogout = () => {
    logoutRequest().then(() => {
      setContent({ content: null });
      toast.success("خروج از حساب کاربری با موفقیت انجام شد.");
    });
  };
  return (
    <div className="p-5">
      <div className="flex justify-center items-center mb-3">
        {isLoading ? (
          <IconLoading width={68} height={68} className="text-rose-900/30" />
        ) : (
          <IconLogout width={68} height={68} className="text-rose-900/30" />
        )}
      </div>
      <p className="text-center text-hgray-500  dark:text-text-dark-2">
        {isLoading ? "درحال خروج از سیستم" : "آیا می خواهید از سیستم خارج شوید"}
      </p>

      <div className="mt-6 flex justify-center gap-10">
        <EmptyButton
          onClick={() => userLogout()}
          // onClick={() => setLoading(true)}
          //      disabled={loading}
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
  );
}
