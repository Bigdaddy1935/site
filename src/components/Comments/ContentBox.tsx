"use client"
import EmptyButton from "@/components/Assets/EmptyButton";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import { useEffect, useRef, useState } from "react";

const maxHeight = 48;
export default function ContentBox({ children, level = 1 }: { children: React.ReactNode, level?: number }) {
    const [height, setHeight] = useState(0);
    const [open, setOpen] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        setHeight(ref.current?.clientHeight);
    }, [setHeight]);

    const levelStyle = level === 1 ? "box-text-overflow " : "box-text-overflow  box-text-overflow-level-0"
    return (
        <div>
            <div className={`${height > maxHeight && !open && levelStyle} mt-3 transition-all overflow-hidden`}
                style={{
                    height: `${open ? height : maxHeight}px`
                }} >
                <div
                    ref={ref}
                >
                    {children}
                </div>

            </div>
            {height > maxHeight &&
                <div className={`flex justify-end ${!open && 'mt-0'} relative`}>
                    <EmptyButton onClick={() => setOpen(!open)} className="flex items-center text-primary-300 dark:text-primary-50">
                        <span>{open ? "کمتر" : "بیشتر"}</span>

                        <IconDownOpen width={22} height={22} className={`mr-1 ${open && 'rotate-180'}`} />
                    </EmptyButton>
                </div>
            }

        </div>
    )
}
