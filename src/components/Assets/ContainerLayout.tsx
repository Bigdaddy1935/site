import clsx from 'clsx';
import React from 'react';

export default function ContainerLayout(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { children, className } = props;
    return (
        <div className={clsx('w-[95%] max-w-screen-2xl mx-auto',className)}>{children}</div>
    )
}
