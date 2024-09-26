"use client";
import MobilePopup from "@/components/Assets/MobilePopup";
import React, { createContext, useContext, useState } from "react";

type Origin = "right" | "bottom" | "up";
type Content = {
    content: React.ReactNode | null;
    origin?: Origin;
    modalHeader ?: string;
    closeBtn ?: boolean;
    disableCloseOnClick ?: boolean
}
export type MobilePopupType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    content: Content;
    setContent: (content: Content) => void;
    origin?: Origin;
}

export const MobilePopupContext = createContext<MobilePopupType>({
    open: false,
    setOpen: (open: boolean) => { },
    content: {
        content: null,
    },
    setContent: () => { }
});


export const useMobilePopup = () => useContext(MobilePopupContext)

export default function MobilePopupProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<Content>({ content: null });

    return (
        <MobilePopupContext.Provider value={{ open, setOpen, content, setContent }}>
            {children}
            <MobilePopup />
        </MobilePopupContext.Provider>
    )
}