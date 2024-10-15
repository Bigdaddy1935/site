"use client";
import EmptyButton from '@/components/Assets/EmptyButton';
import IconEye from '@/components/Icons/IconEye';
import IconEyeSlash from '@/components/Icons/IconEyeSlash';
import React, { useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
    field?: Omit<ControllerRenderProps<FieldValues, string>, 'ref'>,
    Icon?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
const TextInput = React.forwardRef((props: Props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { field, className, multiple, Icon, ...allProps } = props;

    const inputProps = {
        className: twMerge(`bg-hgray-200 dark:bg-mdark-600 dark:text-white w-full p-2 rounded-lg outline outline-2 outline-hgray-300 dark:outline-mdark-400 focus:outline-primary-400 dark:bg-mdark-500`, className),
        ...allProps,
        ...field
    }
    return (
        <div className='relative'>

            {multiple ?
                <textarea ref={ref as any} {...inputProps} rows={4} style={{ resize: 'none' }}></textarea> :
                <>
                    <input
                        ref={ref as any}
                        {...inputProps}
                        type={props.type === 'password' && showPassword ? 'text' : props.type}
                    />

                    {props.type === 'password' && <EmptyButton onClick={() => setShowPassword(!showPassword)} type='button' className='absolute left-2 top-2.5 text-hgray-400'>
                        {showPassword ? <IconEyeSlash width={20} height={20} /> : <IconEye width={20} height={20} />}
                    </EmptyButton>}
                </>
            }

            {Icon ? <Icon width={24} height={24} className="text-primary-400 dark:text-primary-100 absolute top-2 left-2" /> : null}

        </div>
    )
});

export default TextInput;
