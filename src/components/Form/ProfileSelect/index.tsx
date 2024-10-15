"use client";
import Image from "@/components/Assets/Image";
import IconEdit from '@/components/Icons/IconEdit';
import IconMathPlus from '@/components/Icons/IconMathPlus';
import IconUserProfile from '@/components/Icons/IconUserProfile';
import { ChangeEvent, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    name: string;
}
export default function ProfileSelect(props: Props) {
    const { name } = props;
    const inputRef = useRef<any>();
    const { control, setValue } = useFormContext();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target?.files?.[0] && setValue(name, e.target.files?.[0])
    }
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...allFields } }) => (
                <>
                    <div className='relative inline-block rounded-full w-[100px] h-[100px] bg-hgray-300 dark:bg-mdark-500'>

                        {allFields.value ?
                            <Image src={inputRef.current?.files?.length ? URL.createObjectURL(inputRef.current?.files?.[0]) : allFields.value} fill className='rounded-full object-cover object-top' alt='' /> :
                            <IconUserProfile className='text-primary-300 ' width={100} height={100} />}

                        <span className='cursor-pointer flex items-center justify-center w-[24px] h-[24px] bg-hgray-200 dark:bg-mdark-400 rounded-full absolute bottom-0 right-0'
                            onClick={() => inputRef.current.click()}>
                            {allFields.value ? <IconEdit width={32} height={32} className='text-primary-300' /> : <IconMathPlus width={32} height={32} className='text-primary-300' />}
                        </span>
                    </div>

                    <input className='hidden' ref={inputRef} onChange={handleChange} type='file' maxLength={2048} accept="image/png, image/jpeg" max={"2048"} />
                </>
            )}
        />
    )
}
