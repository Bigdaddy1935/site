import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export default function Paper(props: Props) {
    const { children, className, ...allProps } = props;
    return (
        <div className={twMerge( 'bg-hgray-200 dark:bg-mdark-600 rounded-xl p-3' , className)} {...allProps}>
            {children}
        </div>
    )
}
