"use client"
import { createContext, useContext, useState } from "react";

export type OrderListContextType = {
    showDetails: number | null;
    setShowDetails: (n: number | null) => void;
}
export const OrderListContext = createContext<OrderListContextType>({
    showDetails: null,
    setShowDetails: (n: number | null) => { }
});

export const useOrderList = () => useContext(OrderListContext);


export default function OrderListProvider({ children }: { children: React.ReactNode }) {
    const [showDetails, setShowDetails] = useState<number | null>(null);
    return (
        <OrderListContext.Provider value={{ setShowDetails, showDetails }}>
            {children}
        </OrderListContext.Provider>
    )
}