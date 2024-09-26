"use client"

import { setRedirect } from "@/lib/reduxFeatures/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { usePathname } from "next/navigation";
import useNextRouter from "./useNextRouter";

export default function useHandleLogin() {
    const pathName = usePathname();
    const dispatch = useAppDispatch();
    const router = useNextRouter();
    const handleLogin = () => {
        dispatch(setRedirect({ redirect: pathName }));
        router.push('/user/check-user?redirect=' + pathName)
    }
    return { handleLogin }
}
