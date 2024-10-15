import clsx from 'clsx';
import React from 'react';

export default function Container(props:  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { children, className, ...allProps } = props;
    return (
        <div {...allProps} className={clsx(className, `max-w-[1680px] w-full px-3 lg:px-16 mx-auto`)}>
            {children}
        </div>
    )
}
