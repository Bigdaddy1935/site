"use client";
import clsx from 'clsx';
import { wordifyTomans } from '@/lib/wordify';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';


type Props = {
    name: string;
    label?: string;
    className?: string;
    placeholder?: string
}

export const mobilePattern = /^(\+98|0)?9\d{9}$/g
const PriceField = (props: Props) => {

    const { name, label, className, placeholder } = props;
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            rules={{
                required: 'ورود مبلغ الزامی است.',
            }}
            control={control}
            render={({ field }) => (
                <div>
                    <div className='flex flex-col lg:flex-row lg:items-center'>
                        {label ? <label className='text-hgray-600 font-medium flex-1 lg:min-w-[100px] text-sm mb-2 inline-block'>{label}</label> : null}
                        <NumericFormat
                            {...field}
                            lang='fa-IR'
                            className={clsx(className, "bg-hgray-200 dark:bg-mdark-600 p-2 text-hgray-400 dark:text-text-dark-2 text-center rounded-lg border-hgray-300 dark:border-mdark-500 border-solid border-2  !shadow-none !outline-0 w-full")}
                            dir='ltr'
                            thousandSeparator={','}
                            placeholder={placeholder}
                        />

                    </div>

                    <span className='block mt-2 text-center text-sm font-medium text-hgray-600'>{wordifyTomans(field.value)}</span>
                </div>
            )}
        />
    );
};

export default PriceField;