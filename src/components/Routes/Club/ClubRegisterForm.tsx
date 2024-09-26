"use client";
import BirthdayField from "@/components/Form/BirthdayField";
import MobileField from "@/components/Form/MobileField";
import Select from "@/components/Form/Select";
import TextField from "@/components/Form/TextField";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ClubRegisterForm() {
  const form = useForm();

  const handleSubmit = () => {};
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-wrap">
          <div className="px-3 w-full lg:w-[50%]">
            <FieldTitle title="نام" />
            <TextField
              row={false}
              name="name"
              readOnly
              defaultValue={"امید"}
              wrapperClassName="lg:min-w-[unset]"
            />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <TextField row={false} name="name" readOnly defaultValue={"امید"} />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <Select items={[]} className="w-full" label="" />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <Select items={[]} className="w-full" label="" />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <TextField row={false} name="name" readOnly defaultValue={"امید"} />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <TextField row={false} name="name" readOnly defaultValue={"امید"} />
          </div>
          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <BirthdayField
              wrapperClassName="bg-hgray-200 dark:bg-mdark-600 dark:text-white w-full rounded-lg outline outline-2 outline-hgray-300 dark:outline-mdark-400 focus:outline-primary-400"
              name="birthday"
            />
          </div>

          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>

            <MobileField
              className="bg-hgray-200 dark:bg-mdark-600 dark:text-white w-full p-2 rounded-lg outline outline-2 outline-hgray-300 dark:outline-mdark-400 focus:outline-primary-400"
              label=""
              name="name"
            />
          </div>

          <div className="px-3 w-full lg:w-[50%]">
            <p>نام</p>
            <Select items={[]} className="w-full" label="" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

function FieldTitle({ title }: { title: string }) {
  return <p className="text-hgray-600 dark:text-text-dark-3 mb-1">{title}</p>;
}
