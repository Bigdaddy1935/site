"use client"
import { useAddToCartMutation, useLazyGetCartQuery } from "@/lib/services/cart";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useAddToCart() {
    const [add, { isLoading, isSuccess, error }] = useAddToCartMutation();
    const [trigger , {isLoading: addLoading }] = useLazyGetCartQuery();
    const addToCart = async (product_id: number) => {
        const response = await add({
            product_id
        });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('محصول با موفقیت به سبد خرید افزوده شد.');
            trigger();
        }


        if (error) toast.error('درخواست با خطا مواجه شد')
    }, [isSuccess, error])

    return { addToCart, isLoading: isLoading || addLoading, isSuccess, error }
}