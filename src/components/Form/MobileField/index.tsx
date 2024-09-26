"use client";
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';


type Props = {
    name: string;
    label: string;
    className?: string;
}

export const mobilePattern = /^(\+98|0)?9\d{9}$/g
const MobileField = (props: Props) => {

    const { name, label, className } = props;
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            rules={{
                required: 'ورود شماره موبایل الزامی است.',
            }}
            control={control}
            render={({ field }) => (
                <div className='flex flex-col lg:flex-row lg:items-center'>
                    <label className='text-hgray-600 dark:text-text-dark-3 font-medium flex-1 lg:min-w-[100px] text-sm mb-2 inline-block'>{label}</label>
                    <PatternFormat {...field} lang='fa-IR' className={clsx(className, "bg-hgray-200 p-2 dark:bg-mdark-500 text-hgray-400  rounded-lg !border-none !shadow-none !outline-0 w-full")} dir='ltr' format="09## #### ###" allowEmptyFormatting mask="_" />
                </div>
            )}
        />
    );
};

export default MobileField;