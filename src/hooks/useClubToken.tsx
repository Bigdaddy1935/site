"use client";

import { login } from "@/lib/reduxFeatures/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { authApi, useAuthQuery } from "@/lib/services/auth";
import { baseApi } from "@/lib/services/base";
import { useSearchParams } from "next/navigation";

export default function useClubToken() {
  const token = useSearchParams().get("token");
  const { refetch } = useAuthQuery({}, { skip: true });
  const dispatch = useAppDispatch();

  if (token) {
    dispatch(
      login({
        user_token: token,
      })
    );

    authApi.endpoints.auth.initiate({});
  }
}
