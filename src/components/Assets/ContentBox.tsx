"use client"
import { useEffect, useRef, useState } from "react";

type Props = {
    open: boolean;
    maxHeight?: number;
    minHeight?: number;
    children: React.ReactNode
}
export default function ContentBox(props: Props) {
    const { children, open, maxHeight = 0, minHeight = 0 } = props;
    const [height, setHeight] = useState(minHeight);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeight(Math.max(ref.current?.offsetHeight  ?? minHeight));
    }, [open, children]);

    return (
        <div className={`transition-all overflow-hidden`}
            style={{
                height: `${open ? height : maxHeight}px`
            }} >
            <div
                ref={ref}
            >
                {children}
            </div>

        </div>
    )
}
