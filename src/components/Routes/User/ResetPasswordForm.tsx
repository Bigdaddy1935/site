"use client"

import LoadingButton from "@/components/Assets/LoadingButton";
import TextField from "@/components/Form/TextField";
import useNextRouter from "@/hooks/useNextRouter";
import { selectPhone } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useResetPasswordMutation } from "@/lib/services/auth";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
    const [resetPassword, { isLoading, isSuccess  }] = useResetPasswordMutation();
    const phone = useAppSelector(selectPhone);
    const router = useNextRouter();
    const form = useForm();

    if (!phone) {
        router.push('/user/check-user');
        return null;
    } 
    const handleSubmit = (values: any) => {
        resetPassword({
            password: values.password,
            phone
        });
    }

    useEffect(()=>{
      if(isSuccess){
        toast.success('رمز عبور شما با موفقیت تغییر یافت')
        router.push('/user/password-login')
      }
    },[isSuccess])

    return (
        <div className="flex flex-col gap-4">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <p className="text-sm text-hgray-500 mb-5">
                        رمز عبور مورد نظر را وارد کنید
                    </p>
                    <TextField  required className="bg-white" type="password" name="password" placeholder="رمز عبور" />


                    <p className="text-sm text-hgray-500 mb-5">
                        رمز عبور خود را یک بار دیگر وارد کنید
                    </p>
                    <TextField  required className="bg-white" type="password" name="confirm-password" placeholder="تکرار رمز عبور" />

                  

                    <LoadingButton loading={isLoading || isSuccess} type="submit" fullWidth>ذخیره رمز عبور</LoadingButton>
                </form>
            </FormProvider>
        </div>
    )
}