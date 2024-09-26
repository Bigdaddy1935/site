"use client"
import { useDeleteFromCartMutation, useLazyGetCartQuery } from "@/lib/services/cart";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useRemoveFromCart() {
    const [remove, { isLoading, isSuccess, error }] = useDeleteFromCartMutation();
    const [trigger, { isLoading: removeLoading }] = useLazyGetCartQuery();
    const removeFromCart = (cart_id: number) => {
        remove({ cart_id })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('محصول با موفقیت از سبد خرید حذف شد');
            trigger()
        }

        if (error) toast.error('محصول با موفقیت از سبد خرید حذف شد')
    }, [isSuccess, error]);


    return { removeFromCart, isLoading: isLoading || removeLoading }

}