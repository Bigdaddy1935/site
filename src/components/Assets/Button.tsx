import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';


enum BtnColor {
    primary = "primary",
    gray = "gray",
    error = "error",
}

enum BtnSize {
    large = "large",
    medium = "medium",
    small = "small",
}

enum BtnRounded {
    md = "md",
    lg = "lg",
}

export type ButtonProps = {
    color?: keyof typeof BtnColor;
    size?: keyof typeof BtnSize;
    rounded?: keyof typeof BtnRounded;
    fullWidth?: boolean;
    outlined?: boolean;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget | undefined;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export default function Button(props: ButtonProps) {
    const { children, color = BtnColor.primary, size = BtnSize.medium, fullWidth, rounded = BtnRounded.lg, outlined, className, href, target, ...allProps } = props;

    const getColor = () => {
        switch (color) {
            case BtnColor.primary:
                return outlined ? "border border-solid border-2 border-primary-300 bg-white text-primary-300" : "text-white bg-primary-300"
            case BtnColor.gray:
                return outlined ? "border border-solid border-2 border-hgray-300 text-hgray-600 hover:border-primary-300 hover:text-white hover:bg-primary-300" : "text-white bg-hgray-500"
            case BtnColor.error:
                return outlined ? "border border-solid border-2 border-rose-500 text-rose-500 hover:border-rose-300 hover:text-white hover:bg-rose-300" : "text-white bg-rose-300"
            default:
        }
    }

    const getSize = () => {
        switch (size) {
            case BtnSize.small:
                return 'p-1 text-sm font-normal'
            case BtnSize.medium:
                return 'p-2 text-base font-medium'
            case BtnSize.large:
                return 'p-3 text-lg font-medium'

            default:
                break;
        }
    }

    const getRounded = () => {
        switch (rounded) {
            case BtnRounded.lg:
                return "rounded-lg"

            case BtnRounded.md:
                return "rounded-md"

            default:
                break;
        }
    }
    return (
        <>{href ?
            <Link target={target} href={href} className={twMerge(getColor(), getSize(), getRounded(), fullWidth && "w-full", className)}
            >
                {children}
            </Link> :

            <button
                className={twMerge(getColor(), getSize(), getRounded(), fullWidth && "w-full", 'inline-block transition-colors', className)}
                {...allProps}
            >
                {children}
            </button>
        }</>

    )
}
