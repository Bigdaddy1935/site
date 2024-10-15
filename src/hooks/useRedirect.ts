"use client"

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useNextRouter from "./useNextRouter";

export function useRedirect() {
    const router = useNextRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        () => {
            const params = new URLSearchParams(searchParams.toString())
            return params.toString()
        },
        [searchParams]
    )
    const redirectWithQueryString = (url: string) => {
        router.push(`${url}?${createQueryString()}`)
    }


    return { redirectWithQueryString }
}