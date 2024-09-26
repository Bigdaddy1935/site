"use client";
import { createContext, useContext, useState } from "react";
import { ActiveMenuContent } from "@/types/";

export type LoginPopupType = {
    active?: ActiveMenuContent;
    setActive?: (a: ActiveMenuContent) => void;
    //  handleActive ?: (state : ActiveMenuContent)=>void
}
export const LoginPopupContext = createContext<LoginPopupType>({});

export const useLoginPopup = () => useContext(LoginPopupContext);

export default function LoginPopupProvider({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState<ActiveMenuContent>("menu");

    /*   const handleActive = (state: ActiveMenuContent) => {
          if (active === "menu") {
              setActive(state);
              setActiveContent && setActiveContent(state)
          }
          else {
              setActive("menu");
              setActiveContent && setActiveContent("menu");
          }
      } */

    return (
        <LoginPopupContext.Provider value={{ active, setActive }}>{children}</LoginPopupContext.Provider>
    )
}