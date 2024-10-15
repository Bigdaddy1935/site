"use client";
import clsx from "clsx";
import MobileField, { mobilePattern } from "@/components/Form/MobileField";
import IconLoading from "@/components/Icons/IconLoading";
import useNextRouter from "@/hooks/useNextRouter";
import { useRedirect } from "@/hooks/useRedirect";
import { selectAction, setRedirect } from "@/lib/reduxFeatures/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import {
  useForgotPasswordMutation,
  usePhoneCheckMutation,
} from "@/lib/services/auth";
import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { KeyValue } from "@/types/";

const text: KeyValue = {
  "/user/check-user":
    " برای ورود و یا ثبت نام، اطلاعات کاربری خود را وارد کنید.",
  "/user/forget-password":
    "جهت بازیابی رمز عبور اطلاعات کاربری خود را وارد کنید.",
};
export default function CheckUserForm() {
  const [checkPhone, { isLoading, isSuccess, data }] = usePhoneCheckMutation();
  const [
    forgetPassword,
    { isLoading: forgetPasswordLoading, isSuccess: forgetPasswordSuccess },
  ] = useForgotPasswordMutation();
  const { redirectWithQueryString } = useRedirect();
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const action = useAppSelector(selectAction);
  const methods = useForm();
  const router = useNextRouter();
  const handleForgetPassword = (values: any) => {
    forgetPassword({ phone: values.phone.replaceAll(" ", "") }).then(
      ({ error }) => {
        if (!error) {
          toast.success("کد احراز هویت برای شما ارسال شد");
          dispatch(
            setRedirect({
              phone: values.phone.replaceAll(" ", ""),
              action: "reset-password",
            })
          );
          redirectWithQueryString("/user/verification");
        }
      }
    );
  };

  const handleCheckUser = (values: any) => {
    checkPhone({ phone: values.phone.replaceAll(" ", "") }).then(
      ({ data, error }) => {
        if (error) return;
        dispatch(
          setRedirect({
            phone: values.phone.replaceAll(" ", ""),
            action: data.UserExisted ? "login" : "signup",
          })
        );
        redirectWithQueryString(
          data?.UserExisted ? "/user/password-login" : "/user/create-acount"
        );
      }
    );
  };
  const handleSubmit = (values: any) => {
    action === "reset-password"
      ? handleForgetPassword(values)
      : handleCheckUser(values);
  };
  return (
    <div className={`p-6 lg:max-w-[396px] mx-auto`}>
      <p className="text-base my-6 lg:mb-8 text-center font-semibold text-primary-700 dark:text-text-dark-3">
        {text[pathName]}
      </p>

      <FormProvider {...methods}>
        <form
          className="flex flex-col lg : items-end gap-y-3"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <MobileField
            className={"lg:bg-white !text-left w-full"}
            label="شماره تماس"
            name="phone"
          />

          <SubmitButton
            type="submit"
            disabled={
              isLoading ||
              isSuccess ||
              forgetPasswordLoading ||
              forgetPasswordSuccess
            }
          >
            {isLoading || forgetPasswordLoading ? (
              <IconLoading className="mx-auto" width={24} height={24} />
            ) : (
              <>{"ادامه"}</>
            )}
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}

type SubmitButtonProps = {} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function SubmitButton(props: SubmitButtonProps) {
  const { children, className, disabled, ...allProps } = props;
  const { watch } = useFormContext();
  const mobile = watch("phone");

  const checkMobile = useMemo(() => {
    const regex = new RegExp(mobilePattern);
    var result = regex.test(mobile?.replaceAll(" ", ""));

    return result;
  }, [mobile]);
  return (
    <button
      disabled={disabled || !checkMobile}
      className={clsx(
        `w-full lg:mt-3  font-medium  rounded-md p-2 cursor-pointer bg-primary-300  text-white dark:disabled:text-hgray-300`,
        className
      )}
      {...allProps}
    >
      {children}
    </button>
  );
}
