"use client";

import { useEffect, useState } from "react";


const preferDarkQuery = "(prefers-color-schema:dark)";
const storageKey = "theme";
const getUserPreference = () => {
  if(typeof window !== "undefined"){
    const userPref = window?.localStorage.getItem(storageKey);
    if (userPref) {
      return userPref;
    }
   // return window?.matchMedia(preferDarkQuery).matches ? "dark" : "light";
  }

  return "dark"
};

type ThemeMode = "dark" | "light"
export function useThemeSwitch() {
  const [mode, setMode] = useState<ThemeMode>((getUserPreference() as ThemeMode));


  const toggleTheme = (theme: ThemeMode) => {
    if (theme === "dark") {
      document?.documentElement.classList.add("dark");
    } else {
      document?.documentElement.classList.remove("dark");
    }
    window?.localStorage.setItem(storageKey, theme);
  };

 

  useEffect(() => {
    const mediaQuery = window?.matchMedia(preferDarkQuery);
    const handleChange = () => {
      const newMode = getUserPreference();
      setMode(newMode as ThemeMode);
      toggleTheme(newMode as ThemeMode);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    toggleTheme(mode)
  }, [mode])



  return { mode, setMode }
}