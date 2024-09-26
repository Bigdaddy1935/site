import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import EmptyButton from './EmptyButton';

type Props = {
    text: string | React.ReactNode;
    Icon?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element,
    afterIconText?: string;
    className?: string;
    textClassName?: string;
    flex1?: boolean;
    endGradient?: boolean;
    gradiantColor?: string;
    leftContent?: React.ReactNode;
    onClick?: () => void;
    showTextInMobile?: boolean;
}
export default function BoxButton(props: Props) {
    const { text, Icon, className, textClassName, afterIconText, flex1, endGradient, gradiantColor, leftContent, onClick, showTextInMobile } = props;
    return (
        <div
            onClick={onClick}
            className={twMerge(
                'bg-hgray-200 dark:bg-mdark-600 dark:text-hgray-300 flex justify-between items-center rounded-lg',
                flex1 && 'flex-1',
                endGradient && 'relative overflow-hidden',
                onClick && 'cursor-pointer',
                Icon || leftContent ? 'pl-2' : null,
                className,
            )}>
            <p className={clsx(textClassName, `text-hgray-400 dark:text-hgray-300 p-3 flex-1`, !showTextInMobile ? 'hidden lg:inline-block' : 'max-w-[80%] overflow-hidden text-ellipsis text-nowrap')}>
                {text}
            </p>

            {afterIconText && <span className='text-base text-hgray-400 ml-1'>{afterIconText}</span>}
            {Icon &&
                <EmptyButton>
                    <Icon width={32} height={32} className='text-hgray-400 dark:text-hgray-300 ml-1' />
                </EmptyButton>
            }

            {endGradient && <div style={{
                backgroundColor: gradiantColor ?? "#00A693",
                background: `linear-gradient(90deg, ${gradiantColor ?? '#00A693'} 14%, rgba(0,0,0,0) 100%)`
            }} className=' w-[100px] absolute z-10 left-0 top-0 bottom-0 h-full'></div>}

            {leftContent ? leftContent : null}
        </div>
    )
}
