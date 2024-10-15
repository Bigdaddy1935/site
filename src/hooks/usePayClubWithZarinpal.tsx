"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../lib/reduxHooks";
import { selectPlan } from "../lib/reduxFeatures/headerSlice";
import { PlanType } from "@/types";
import { usePayMahdyarWithZarinpalMutation } from "@/lib/services/mahdyar";

export default function usePayWithZarinpal() {
  const [pay, { error, isSuccess, isLoading, isError, data }] =
    usePayMahdyarWithZarinpalMutation();

  let callBackUrl = "/";
  if (typeof window !== "undefined") {
    callBackUrl = window.location.origin;
  }

  const payWithZarinpal = (type : PlanType) => {
    if (type) pay({ type, callback: `${callBackUrl}/club-verify` });
  };

  useEffect(() => {
    if (isError) toast.error("درخواست با خطا مواجه شد");

   if (isSuccess) window.location.href = data.link;
  }, [isError, error, data]);

  return { payWithZarinpal, isLoading };
}
