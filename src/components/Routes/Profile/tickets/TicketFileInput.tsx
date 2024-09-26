"use client"

import EmptyButton from '@/components/Assets/EmptyButton';
import IconAttachment from '@/components/Icons/IconAttachment';
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function TicketFileInput() {
    const { control, setValue } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        file ? setValue('file', file) : null;
    }
    return (
        <Controller
            name='file'
            control={control}
            rules={{
                maxLength: {
                    value: 2,
                    message: 'اندازه فایل بیش از حد مجاز است'
                }
            }}
            render={({ field: { ref, onChange , value ,  ...allField } }) => (
                <React.Fragment>
                    <input
                        accept="image/*"
                        type='file'
                        className='hidden'
                        onChange={handleUpload}
                        ref={inputRef}
                        {...allField}
                    />
                    <EmptyButton onClick={() => inputRef.current?.click()} type='button' className='bg-white  mr-2 text-primary-300 rounded-full aspect-square flex items-center justify-center'>
                        <IconAttachment width={25} height={28} />
                    </EmptyButton>
                </React.Fragment>
            )}
        />
    )
}
