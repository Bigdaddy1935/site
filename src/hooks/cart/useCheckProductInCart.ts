"use client"
import { selectCart } from "@/lib/reduxFeatures/cartSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useEffect, useState } from "react";

export default function useCheckProductInCart(product_id: number) {
    const [exists, setIsExists] = useState<null | number | undefined>(null);
    const cart = useAppSelector(selectCart);

    useEffect(() => {
        setIsExists(() => cart.find(i => i.product_id === product_id)?.id);
    }, [cart]);


    return exists;
}