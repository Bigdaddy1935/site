"use client"

import LoadingButton from "@/components/Assets/LoadingButton";
import TextField from "@/components/Form/TextField";
import useLogin from "@/hooks/useLogin";
import useNextRouter from "@/hooks/useNextRouter";
import { formatPhoneNumber } from "@/lib/number";
import { selectPhone } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useLoginPasswordMutation } from "@/lib/services/auth";
import { FormProvider, useForm } from "react-hook-form";
import ForgetPasswordButton from "./ForgetPasswordButton";
import SendTokenButton from "./SendTokenButton";

export default function LoginPasswordForm() {
    useLogin()
    const [login, { isLoading, isSuccess }] = useLoginPasswordMutation();
    const phone = useAppSelector(selectPhone);
    const router = useNextRouter();
    const form = useForm();

    if (!phone) {
        router.push('/user/check-user');
        return null;
    }
    const handleSubmit = (values: any) => {
        login({
            password: values.password,
            phone
        });
    }


    return (
        <div className="flex flex-col gap-4">
            <p className="text-center text-primary-700 dark:text-text-dark-4 text-base font-medium"
            >ورود با شماره <span className="inline-block font-semibold ltr">{formatPhoneNumber(phone)}</span>
            </p>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <p className="text-sm text-hgray-500 dark:text-text-dark-2 mb-5">
                        رمز عبور خود را وارد کنید
                    </p>
                    <TextField required className="bg-white dark:bg-mdark-500" type="password" name="password" placeholder="رمز عبور" />

                    <p className="text-sm leading-6 text-hgray-400 p-2 bg-hgray-100 dark:text-text-dark-3 dark:bg-mdark-400 mb-9">
                        رمز عبوری را که از قبل، برای خود انتخاب کردید، وارد کنید یا با زدن دکمه زیر "کد ورود یک‌بار مصرف" دریافت کنید.
                    </p>

                    <LoadingButton className="dark:text-text-dark-2" disabled={isLoading || isSuccess} loading={isLoading} type="submit" fullWidth>ادامه</LoadingButton>
                </form>
            </FormProvider>

            <SendTokenButton />

            <ForgetPasswordButton />
        </div>
    )
}