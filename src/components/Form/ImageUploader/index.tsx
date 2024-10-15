"use client"
import EmptyButton from '@/components/Assets/EmptyButton';
import Image from "@/components/Assets/Image";
import IconFileEarmarkZip from '@/components/Icons/IconFileEarmarkZip';
import IconTrashOutline from '@/components/Icons/IconTrashOutline';
import { ChangeEvent, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string;
    label?: string;
}
export default function ImageUploader(props: Props) {
    const { name, label } = props;
    const { control, setValue } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDelete = () => {
        setValue(name, undefined);
        inputRef.current!.files = null;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files ? setValue(name, e.target.files?.[0]) : null;
    }
    return (
        <div>
            <Controller
                name={name}
                control={control}
                rules={{
                    maxLength: {
                        value: 3000,
                        message: 'سایز فایل انتخابی بیشتر از حد مجاز است'
                    }
                }}
                render={({ field: { ref, onChange, ...allField }, fieldState: { error } }) => (
                    <div className='flex flex-col gap-4'>
                        <label>{label}</label>
                        {error ? <span>{error.message}</span> : null}
                        <input type='file'  onChange={handleChange} ref={inputRef} className='hidden' accept='image/*' />

                        <div className='flex items-center gap-6'>
                            <button className='w-[160px] h-[80px] border border-dashed flex flex-col items-center justify-center rounded-lg text-hgray-350 border-hgray-300' type='button' onClick={() => inputRef.current?.click()}>
                                <IconFileEarmarkZip width={22} height={22} />
                                <span className='text-sm'>انتخاب فایل</span>
                            </button>

                            {inputRef.current?.files?.[0] && allField.value ?
                                <div className='relative'>

                                    <Image
                                        width={110}
                                        height={110}
                                        alt=''
                                        className='object-contain'
                                        src={URL.createObjectURL(inputRef.current?.files?.[0])}
                                    />

                                    <EmptyButton
                                        type='button'
                                        className='absolute top-1 left-1'
                                        onClick={handleDelete}>
                                        <IconTrashOutline className='text-rose-600' width={22} height={22} />
                                    </EmptyButton>
                                </div>
                                : null}

                        </div>

                        {error ? <p className='text-sm text-rose-500 mt-3 font-semibold'>{error.message}</p> : null}


                    </div>
                )}

            />
        </div>
    )
}
