import { useEffect, useState } from "react";



type Sizes = "max-sm" | "max-md" | "max-lg" | "max-xl" | "max-2xl" | "sm" | "md" | "lg" | "xl" | "2xl";


const containers: { [key: string]: number } = {
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
}
export default function useHidden(){
    const getWindowSize = () => {
        return typeof window !== "undefined" ? window?.innerWidth : undefined;
    }
    const [width, setWidth] = useState(getWindowSize());
   

    useEffect(() => {
        const handleResize = () => {
            setWidth(getWindowSize())
        }
        window?.addEventListener("resize", handleResize);

        return () => window?.removeEventListener("resize", handleResize);
    }, []);

    const isHidden = (hidden: Sizes) => {
        const classArray = hidden.split('-');
         
        if(!width) return true
        if (classArray[0] === "max") return width < containers[classArray[1]!]!;

        return width > containers[classArray[0]!]!;
    }
  

    return {
        isHidden,
        getWindowSize
    }
}