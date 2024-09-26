"use client";

import clsx from "clsx";
import MobileField, { mobilePattern } from "@/components/Form/MobileField";
import IconLoading from "@/components/Icons/IconLoading";
import useNextRouter from "@/hooks/useNextRouter";
import { setRedirect } from "@/lib/reduxFeatures/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { usePhoneCheckMutation } from "@/lib/services/auth";
import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type Props = {

}
export default function AuthForm(props: Props) {
  const [checkPhone, { isLoading, isSuccess, data }] = usePhoneCheckMutation();
  const dispatch = useAppDispatch()
  const methods = useForm();
  const router = useNextRouter();
  const patch = usePathname();
  const handleSubmit = (values: any) => {
    checkPhone({ phone: values.phone.replaceAll(' ', '') }).then(({ data }) => {
      dispatch(setRedirect({
        phone: values.phone.replaceAll(' ', ''),
        redirect: patch
      }));
      router.push(data?.UserExisted ? '/user/password-login' : '/user/create-acount');
    })
  }
  return (
    <div className={`p-6 lg:max-w-[396px] mx-auto`}>
      <p className="text-base my-6 lg:mb-8 text-center font-semibold text-primary-700">
        برای ورود و یا ثبت نام، اطلاعات کاربری خود را وارد کنید.
      </p>

      <FormProvider {...methods}>
        <form className="flex flex-col lg : items-end gap-y-3" onSubmit={methods.handleSubmit(handleSubmit)}>
          <MobileField className={"lg:bg-white"} label="شماره تماس" name="phone" />


          <SubmitButton type="submit" disabled={isLoading || isSuccess}>
            {isLoading ? <IconLoading className="mx-auto" width={24} height={24} /> :
              <>
                {"ادامه"}
              </>
            }
          </SubmitButton>
        </form>

      </FormProvider>
    </div>
  )
}


type SubmitButtonProps = {
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

function SubmitButton(props: SubmitButtonProps) {
  const { children, className, disabled, ...allProps } = props;
  const { watch } = useFormContext();
  const mobile = watch("phone");

  const checkMobile = useMemo(() => {
    const regex = new RegExp(mobilePattern);
    var result = regex.test(mobile?.replaceAll(' ', ''));

    return result
  }, [mobile]);




  return (
    <button
      disabled={disabled || !checkMobile}
      className={clsx(`w-full lg:mt-3 lg:w-[100px]  font-medium  rounded-md p-2 cursor-pointer bg-primary-300 disabled:text-hgray-600 text-white disabled:bg-hgray-300`, className)}
      {...allProps}
    >
      {children}
    </button>
  )
}