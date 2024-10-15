"use client"
import { Controller, useFormContext } from "react-hook-form";
import { NumberFormatBase, usePatternFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";


type Props = {
    name: string;
    label: string;
    className?: string;
    pattern?: string;
    row?: boolean;
    wrapperClassName?: string;
    required?: boolean;
}
export default function BirthdayField(props: Props) {
    const { name, label, className, pattern, row, wrapperClassName, required } = props;
    const { control } = useFormContext();
    const { format, ...rest } = usePatternFormat({ allowEmptyFormatting: true, mask: "_", format: '####/##/##' });

    const _format = (val: string) => {
        let year = val.substring(0, 4);
        let month = val.substring(4, 6);
        let day = val.substring(6, 8);

        if (year.length == 2 && Number(year) > 14) {
            year = `13${Number(year)}`
        }

        if (month.length === 1 && Number(month[0]) > 1) {
            month = `0${month[0]}`;
        } else if (month.length === 2) {
            // set the lower and upper boundary
            if (Number(month) === 0) {
                month = `01`;
            } else if (Number(month) > 12) {
                month = '12';
            }
        }

        if (day.length === 1 && Number(day[0]) > 3) {
            day = `0${day[0]}`;
        } else if (day.length === 2) {
            // set the lower and upper boundary
            if (Number(day) === 0) {
                day = `01`;
            } else if (Number(month) > 31) {
                day = '30';
            }
        }

        return format ? format(`${year}${month}${day}`) : '';
    };

    return (
        <Controller
            name={name}
            rules={{
                ...(required ? { required: 'ورود تاریخ تولد الزامی است.' } : null),
            }}
            control={control}
            render={({ field, fieldState: { error } }) => (

                <div
                    className={twMerge(`flex ${row ? 'items-center justify-center' : 'flex-col items-stretch'} gap-1 lg:gap-3 lg:flex-row lg:items-center lg:min-w-[365px] w-full  mb-3`, wrapperClassName)}>
                    {label ? <label className='text-base text-hgray-600 font-noraml lg:min-w-[80px]'>{label}</label> : null}
                    <div className={`${!row && 'flex-1'} relative`}>
                        <NumberFormatBase
                            className={twMerge("bg-hgray-200 dark:bg-mdark-500 p-2 text-hgray-400 dark:text-hgray-200  rounded-lg !border-none !shadow-none !outline-0 w-full", className)} dir='ltr'
                            format={_format}
                            {...rest}
                            {...field}
                        />

                        <p className='text-xs font-medium text-rose-700 absolute right-0 -bottom-4'>{error ? error.message : ''}</p>
                    </div>
                </div>
            )}
        />

    );
}