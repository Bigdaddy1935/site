import { twMerge } from 'tailwind-merge';

type Props = {
    className?: string;
    orientation?: "horizontal" | "vertical";
    space?: string;
}
export default function Divider(props: Props) {
    const { orientation = "horizontal", className, space } = props;
    const orStyles = orientation === "horizontal" ? `h-[1px] w-full ` : `w-[1px] h-full`;
    return (
        <div className={twMerge( orStyles, "bg-hgray-300", space , className)} />
    )
}
