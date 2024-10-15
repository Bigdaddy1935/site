"use client";
import FieldTitle from "@/components/Assets/FieldTitle";
import TextField from "@/components/Form/TextField";
import usePayWithZarinpal from "@/hooks/usePayClubWithZarinpal";
import formatFullName from "@/lib/formatFullName";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { selectPlan } from "@/lib/reduxFeatures/headerSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import {
  useCheckMahdyarExistsQuery,
  useRegisterClubMutation,
} from "@/lib/services/mahdyar";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SelectStateAndCity from "./SelectStateAndCity";
import BirthdayField from "@/components/Form/BirthdayField";
import ClubParentPhoneNumber from "./ClubParentPhoneNumber";
import SelectField from "@/components/Form/Select/SelectField";
import clubItems from "@/data/clubItems";
import LoadingButton from "@/components/Assets/LoadingButton";
import MahdyarExistsMessage from "./MahdyarExistsMessage";
import IconLoading from "@/components/Icons/IconLoading";
import { MahdyarExists } from "@/types";
import useAuth from "@/hooks/useAuth";

export default function ClubRegisterForm() {
  useAuth();
  const { data: mahdyarExists, isLoading: checkLoading } =
    useCheckMahdyarExistsQuery();

  return checkLoading ? (
    <div className="flex justify-center items-center h-[200px]">
      <IconLoading width={32} height={32} />
    </div>
  ) : mahdyarExists && mahdyarExists.status === 1 ? (
    <MahdyarExistsMessage />
  ) : (
    <React.Fragment>
      <p className="text-rose-800 font-medium animate-pulse dark:text-rose-300 max-w-lg border-b border-b-hgray-300 dark:border-mdark-600 p-5 mb-5 mx-auto text-center">
        نکته بسیار مهم : پس از فرآیند پرداخت، باید روی (تکمیل ثبت نام) کلیک
        کنید، در غیر این صورت ثبت نام شما تکمیل نخواهد شد.
      </p>
      <Form {...mahdyarExists!} />
    </React.Fragment>
  );
}

function Form(mahdyarExists: MahdyarExists) {
  const [register, { isLoading }] = useRegisterClubMutation();

  const toastId = React.useRef<string | number | null>(null);

  const user = useAppSelector(selectUser);
  const { payWithZarinpal } = usePayWithZarinpal();
  const handleSubmit = (values: any) => {
    toastId.current = toast.loading("در حال ثبت اطلاعات...", {
      autoClose: false,
    });

    register({
      ...values,
      parent_num: values.parent_num
        ? values.parent_num.replaceAll(" ", "")
        : user?.phone,
      fullname: `${values?.name},${values.lname}`,
    })
      .then(({ error }) => {
        if (error) return;
        toast.update(toastId.current!, {
          render: "در حال انتقال به درگاه پرداخت...",
          type: "success",
        });

        payWithZarinpal(values.club_type);
      })
      .catch(() => {
        toast.dismiss(toastId.current!);
        toast.error("درخواست با خطا مواجه شد.");
      });
  };

  const plan = useAppSelector(selectPlan);

  const getMahdiyarValues = () => {
    if (mahdyarExists) {
      const { amount, id, user_id, club_type, ...alldata } = mahdyarExists;

      return {
        ...alldata,
        club_type: plan ?? club_type,
        name: alldata?.fullname?.split(",")[0],
        lname: alldata?.fullname?.split(",")[1],
      };
    }
    return {};
  };
  const form = useForm({
    values:
      mahdyarExists && mahdyarExists?.id
        ? getMahdiyarValues()
        : {
            name: user?.fullname?.split(",")[0],
            lname: user?.fullname?.split(",")[1],
            birthday: user?.birthday,
            national_code: user?.national_code,
            gender: user?.gender,
            address: user?.address,
            register_club_from: "academy",
            messenger_num: user?.phone,
            club_type: plan,
          },
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-wrap">
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="نام" required />
            <TextField
              row={false}
              name="name"
              required
              wrapperClassName="lg:min-w-[unset]"
            />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="نام خانوادگی" required />
            <TextField
              row={false}
              name="lname"
              required
              wrapperClassName="lg:min-w-[unset]"
            />
          </div>

          <SelectStateAndCity
            defaultCity={mahdyarExists.city}
            defaultState={mahdyarExists.state}
          />
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="کد ملی" required />
            <TextField
              maxLength={10}
              row={false}
              name="national_code"
              required
            />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="آدرس" required />
            <TextField row={false} name="address" required />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="کد پستی" required />
            <TextField
              maxLength={10}
              rules={{
                minLength: {
                  value: 10,
                  message: "کد پستی باید دقیقا 10 کاراکتر باشد.",
                },
                maxLength: {
                  value: 10,
                  message: "کد پستی باید دقیقا 10 کاراکتر باشد.",
                },
              }}
              row={false}
              autoComplete="postal"
              name="postal"
              required
            />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="تاریخ تولد" required />
            <BirthdayField
              wrapperClassName="bg-hgray-200 dark:bg-mdark-500 dark:text-white w-full rounded-lg outline outline-2 outline-hgray-300 dark:outline-mdark-400 focus:outline-primary-400"
              name="birthday"
              required
            />
          </div>

          <ClubParentPhoneNumber />

          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="تغییر نوع سفارش" required />
            <SelectField
              required
              name="club_type"
              items={clubItems.map((i) => ({
                label: `${i.label}(${i.price} تومان)`,
                value: i.type,
              }))}
              className="w-full"
              label=""
            />
          </div>

          <div className="px-3 w-full flex justify-end">
            <LoadingButton
              className="px-6 w-full lg:max-w-[220px]"
              type="submit"
              loading={isLoading}
            >
              ثبت سفارش
            </LoadingButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
