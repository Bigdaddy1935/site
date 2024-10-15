import Paper from "@/components/Assets/Paper";
import ClubRegisterForm from "@/components/Routes/Club/ClubRegisterForm";
import React from "react";
export const metadata = {
  title: `ثبت نام مهدیار شو | آکادمی روحبخش`,
};
export default function ClubRegisterPage() {
  return (
    <Paper className="w-full max-w-4xl my-10 mx-auto border border-hgray-300 dark:border-mdark-400">
      
      <ClubRegisterForm />
    </Paper>
  );
}
