"use client";

import EmptyButton from "@/components/Assets/EmptyButton";
import IconLogout from "@/components/Icons/IconLogout";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useNextRouter from "./useNextRouter";
import { useLogoutMutation } from "@/lib/services/auth";
import IconLoading from "@/components/Icons/IconLoading";
import { toast } from "react-toastify";
import LogoutMessage from "@/components/Assets/LogoutMessage";

export default function useLogout() {
  const user = useAppSelector(selectUser);
  const router = useNextRouter();
  const pathName = usePathname();
  const { setContent } = useMobilePopup();

  const handleLogout = () => {
    setContent({
      content: <LogoutMessage />,
      origin: "up",
      disableCloseOnClick: true,
    });
  };

  useEffect(() => {
    if (!user && pathName.startsWith("/profile"))
      if (!user) {
        ///return router.push('/');
        router.refresh();
      }
  }, [user]);

  return { handleLogout };
}
