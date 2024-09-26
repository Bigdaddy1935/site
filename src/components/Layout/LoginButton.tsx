"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import IconUser_male_circle from "@/components/Icons/IconUser_male_circle";
import useHandleLogin from "@/hooks/useHandleLogin";
import React from "react";
import Hidden from "../Assets/Hidden";
import IconUserAdd from "../Icons/IconUserAdd";
import IconLogin from "../Icons/IconLogin";

export default function LoginButton({
  inSidebar = false,
}: {
  inSidebar?: boolean;
}) {
  const { handleLogin } = useHandleLogin();
  return (
    <React.Fragment>
      <EmptyButton className="flex" type="button" onClick={handleLogin}>
        <Hidden hidden="lg">
          <IconUser_male_circle
            width={36}
            height={36}
            className="mx-2 inline-block text-primary-300 dark:text-white"
          />
        </Hidden>
        <Hidden hidden="max-lg">
          <span className="flex items-center bg-hgray-300 dark:bg-mdark-400 dark:text-white text-primary-300 p-2 rounded-s-lg">
            <IconLogin width={22} height={22} className="ml-2"/>
            ورود
          </span>
          <span className="flex items-center bg-primary-300 text-hgray-200 p-2 rounded-e-lg">
            ثبت نام
            <IconUserAdd width={22} height={22} className="mr-2"/>
          </span>
        </Hidden>
      </EmptyButton>
    </React.Fragment>
  );
}
