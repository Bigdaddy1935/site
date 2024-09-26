"use client";
import { Controller, useFormContext } from 'react-hook-form';
import { NumberFormatBase } from 'react-number-format';
import { twMerge } from 'tailwind-merge';


type Props = {
    name: string;
    label: string;
    className?: string;
    pattern?: string;
    row?: boolean;
    wrapperClassName?: string
}

const BirthdayField = (props: Props) => {
    const { name, label, className, pattern, row, wrapperClassName } = props;
    const { control } = useFormContext();
    const formatJalaliDate = (val: string) => {
        // Remove any non-numeric characters
        const cleanedVal = val.replace(/\D/g, '');

        if (cleanedVal.length !== 8) return val;

        let year = cleanedVal.substring(0, 4);
        let month = cleanedVal.substring(4, 6);
        let day = cleanedVal.substring(6, 8);

        // Validate month and day
        if (Number(month) === 0) {
            month = '01';
        } else if (Number(month) > 12) {
            month = '12';
        }

        if (Number(day) === 0) {
            day = '01';
        } else if (Number(day) > 31) {
            day = '31';
        }

        // Format the date as YYYY/MM/DD
        return `${year}/${month}/${day}`;
    };
    return (
        <Controller
            name={name}
            rules={{
                required: 'ورود شماره موبایل الزامی است.',
            }}
            control={control}
            render={({ field, fieldState: { error } }) => (

                <div
                    className={twMerge(`flex ${row ? 'items-center justify-center' : 'flex-col items-stretch'} gap-1 lg:gap-3 lg:flex-row lg:items-center lg:min-w-[365px] w-full  mb-3`, wrapperClassName)}>
                    {label ? <label className='text-base text-hgray-600 font-noraml lg:min-w-[80px]'>{label}</label> : null}
                    <div className={`${!row && 'flex-1'} relative`}>
                        <NumberFormatBase
                            {...field}
                            valueIsNumericString
                            lang='fa-IR'
                            pattern='####/##/##'
                            className={twMerge("bg-hgray-200 p-2 text-hgray-400  rounded-lg !border-none !shadow-none !outline-0 w-full", className)} dir='ltr'
                            format={formatJalaliDate}
                        />
                        <p className='text-xs font-medium text-rose-700 absolute right-0 -bottom-4'>{error ? error.message : ''}</p>
                    </div>
                </div>
            )}
        />
    );
};

export default BirthdayField;