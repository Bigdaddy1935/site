"use client";

import {
  selectLoading,
  selectShouldLogin,
  selectUser,
} from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useEffect } from "react";
import useHandleLogin from "./useHandleLogin";

export default function useAuth() {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const shouldLogin = useAppSelector(selectShouldLogin);
  const { handleLogin } = useHandleLogin();

  useEffect(() => {
    if (!user && shouldLogin) {
      handleLogin();
    }
  }, [user, shouldLogin]);

  return {
    loading,
  };
}
