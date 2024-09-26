"use client";

import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useNextRouter from "./useNextRouter";

export default function useLogin() {
  const user = useAppSelector(selectUser);
  const redirect = useSearchParams().get("redirect");
  const router = useNextRouter();
  useEffect(() => {
    if (user) {
     // router.push(redirect ?? "/profile");
      router.push("/");
    }
  }, [user]);
}
