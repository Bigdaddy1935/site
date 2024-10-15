"use client";
import LoadingButton from "@/components/Assets/LoadingButton";
import VerifyCodeInput from "@/components/Form/VerifyCodeInput";
import useLogin from "@/hooks/useLogin";
import useNextRouter from "@/hooks/useNextRouter";
import { useRedirect } from "@/hooks/useRedirect";
import { formatPhoneNumber } from "@/lib/number";
import { selectAction, selectPhone } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import {
  useCheckTokenMutation,
  useLoginTokenMutation,
} from "@/lib/services/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import ResendCode from "./ResendCode";
import { FormProvider, useForm } from "react-hook-form";

export default function VerificationForm() {
  useLogin();
  const [verifyCode, setVerifyCode] = useState("");

  const router = useNextRouter();
  const action = useAppSelector(selectAction);
  const phone = useAppSelector(selectPhone);
  const { redirectWithQueryString } = useRedirect();
  if (!phone) {
    router.push("/user/check-user");
    return null;
  }

  const [loginToken, { isLoading: loginTokenLoading }] =
    useLoginTokenMutation();
  const [checkToken, { isLoading: checkTokenLoading }] =
    useCheckTokenMutation();
  const form = useForm();
  const handleLoginVerifyCode = () => {
    loginToken({ phone, token: verifyCode }).then(({ data, error }) => {
      if (!error) {
        toast.success("کد احراز هویت شما تایید شد.");
      }
    });
  };

  const handleCheckToken = () => {
    checkToken({ phone, token: verifyCode }).then(({ data, error }) => {
      if (!error) {
        toast.success("کد احراز هویت شما تایید شد.");
        redirectWithQueryString(
          action === "signup" ? "/user/signup" : "/user/reset-password"
        );
      }
    });
  };
  const handleSubmit = () => {
    action === "login" ? handleLoginVerifyCode() : handleCheckToken();
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <p className="mb-16 text-center text-lg font-normal leading-10 text-hgray-600 dark:text-text-dark-5 lg:mb-4">
        <span className="inline-block">کد احراز هویت برای شماره</span>
        {
          <span className="inline-block" style={{ direction: "ltr" }}>
            {formatPhoneNumber(phone ?? "")}
          </span>
        }{" "}
        ارسال شد
      </p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <VerifyCodeInput setValue={setVerifyCode} length={4} />

          <LoadingButton
            disabled={!verifyCode}
            loading={loginTokenLoading || checkTokenLoading}
            className="w-full mt-6 rounded-lg bg-white p-4 text-base text-hgray-600 dark:text-text-dark-2 dark:bg-mdark-400"
          >
            تایید
          </LoadingButton>
        </form>
      </FormProvider>

      <p className="text-center text-sm text-hgray-400 dark:text-text-dark-2">
        در صورتی که پیامکی به شما ارسال نشده میتوانیداز ارسال مجدد استفاده
        نمایید
      </p>

      <ResendCode />
    </div>
  );
}
