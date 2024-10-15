"use client"
import React, { createContext, useContext, useState } from "react";

export type ActiveTab = "see" | "full"

type MyClassContextType = {
    activeTab: ActiveTab
    setActiveTab: (tab: ActiveTab) => void
}
export const MyClassContext = createContext<MyClassContextType>({
    activeTab: "see",
    setActiveTab: () => { }
});


export const useMyClass = () => useContext(MyClassContext)

export default function MyClassProvider({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("see")
    return (
        <MyClassContext.Provider value={{ setActiveTab, activeTab }}>
            {children}
        </MyClassContext.Provider>
    )
}