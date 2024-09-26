"use client"
import useNextRouter from "@/hooks/useNextRouter";
import { selectDiscountCode, selectFinalPrice } from "@/lib/reduxFeatures/cartSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { usePayWithZarinpalMutation } from "@/lib/services/cart";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function usePayWithZarinpal() {
    const [pay, { error, isSuccess, isLoading, isError, data }] = usePayWithZarinpalMutation();

    const finalPrice = useAppSelector(selectFinalPrice)
    const discount_code = useAppSelector(selectDiscountCode)
    const router = useNextRouter();
    let callBackUrl = '/';
    if (typeof window !== 'undefined') {
        callBackUrl = window.location.origin;
    }

    const payWithZarinpal = () => {

        pay({ code: discount_code, callback: `${callBackUrl}/verify` });
    }

    useEffect(() => {
        if (isError) toast.error('درخواست با خطا مواجه شد');


        if (isSuccess) router.push(data.link)

    }, [isError, error, data])

    return { payWithZarinpal, isLoading }
}