"use client"
import useNextRouter from "@/hooks/useNextRouter";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { selectDiscountCode, selectFinalPrice } from "@/lib/reduxFeatures/cartSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { usePayWithWalletMutation } from "@/lib/services/cart";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function usePayWithWallet() {
    const [pay, { isSuccess, isError, error, isLoading, data }] = usePayWithWalletMutation();
    const user = useAppSelector(selectUser);
    const finalPrice = useAppSelector(selectFinalPrice)
    const discount_code = useAppSelector(selectDiscountCode)
    const router = useNextRouter();
    const payWithWallet = () => {
        if (finalPrice > Number(user?.wallet_balance)) return toast.error('اعتبار کیف پول جهت پرداخت کافی نیست')

        pay({ code: discount_code });
    }

    useEffect(() => {
        if (isError) toast.error('درخواست با خطا مواجه شد');


        if (isSuccess) router.push('/success')

    }, [isError, error, data])

    return { payWithWallet, isLoading }
}