"use client";
import LoadingButton from "@/components/Assets/LoadingButton";
import GenderSelect from "@/components/Form/GenderSelect";
import ProfileSelect from "@/components/Form/ProfileSelect";
import TextField from "@/components/Form/TextField";
import useLogin from "@/hooks/useLogin";
import useNextRouter from "@/hooks/useNextRouter";
import { formatPhoneNumber } from "@/lib/number";
import { selectPhone } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useRegisterUserMutation } from "@/lib/services/auth";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignupForm() {
  useLogin();
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  const phone = useAppSelector(selectPhone);
  const methods = useForm();
  const router = useNextRouter();

  if (!phone) router.push("/");
  const handleSubmit = async (values: any) => {
    registerUser({
      ...values,
      phone,
    }).then(({ error }) => {
      if (error) return;

      // router.push("/profile");
      toast.success("اطلاعات پروفایل کاربری شما با موفقیت در سیستم ثبت شد");
    });
  };
  return (
    <div className="flex-1 flex flex-col justify-center max-w-[364px] lg:max-w-[520px] mx-auto">
      <FormProvider {...methods}>
        <form
          className="flex w-full flex-col justify-center items-center gap-y-2"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <ProfileSelect name="picture" />

          <p className="text-base text-hgray-600 dark:text-text-dark-2">
            شماره شما{" "}
            <span className="inline-block ltr">
              {formatPhoneNumber(phone!)}
            </span>
          </p>

          <GenderSelect name="gender" />

          <div className="mb-2" />

          <TextField
            className="bg-white"
            required
            name="username"
            label="نام کاربری"
          />
          <TextField
            className="bg-white"
            required
            name="firstname"
            label="نام"
          />
          <TextField
            className="bg-white"
            required
            name="lastname"
            label="نام خانوادگی"
          />
          <TextField
            className="bg-white"
            type="password"
            required
            name="password"
            label="رمز عبور"
          />
          <TextField
            className="bg-white"
            type="password"
            required
            name="confirm-password"
            label="تکرار رمز عبور"
          />

          <TextField
            row
            name="IdentificationCode"
            label="کد معرف دارید؟"
            className="outline-1 outline !outline-primary-300 !p-1 max-w-[130px]"
          />

          <div className="flex flex-col lg:flex-row-reverse items-center lg:gap-3">
            <p className="text-sm font-medium text-center lg:text-right text-hgray-500 dark:text-text-dark-4 lg:flex-1">
              با تایید در سایت تمامی{" "}
              <Link className="text-blue-600" href={"#"}>
                قوانین و شرایط
              </Link>{" "}
              استفاده از خدمات اکادمی روح بخش را پذیرفته اید.
            </p>
            <LoadingButton
              loading={isLoading}
              disabled={isLoading || isSuccess}
              className="lg:flex-1 lg:max-w-[45%]"
              type="submit"
              fullWidth
              color="primary"
              size="large"
            >
              تایید
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
