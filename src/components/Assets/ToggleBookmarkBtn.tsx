"use client";
import EmptyButton from '@/components/Assets/EmptyButton';
import IconBookmark from '@/components/Icons/IconBookmark';
import IconBookmarkFill from '@/components/Icons/IconBookmarkFill';
import IconLoading from '@/components/Icons/IconLoading';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useBookmarkMutation } from '@/lib/services/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Model } from '@/types/';

type Props = {
    bookmark: boolean;
    model: Model;
    id: number;
}
export default function ToggleBookmarkBtn(props: Props) {
    const { bookmark, id, model } = props;
    const [click, setClick] = useState(bookmark);
    const [handleBookmark, { isLoading }] = useBookmarkMutation();
    const user = useAppSelector(selectUser);
    const handleClick = () => {
        if (!isLoading)
            user ?
                handleBookmark({ id, model }).then(() => setClick(!click)) :
                toast.warn('لطفا ابتدا وارد حساب کاربری خود شده یا در سایت ثبت نام نمایید.');
    }
    return (
        <EmptyButton disabled={isLoading} className='cursor-pointer' onClick={handleClick}>
            {isLoading ? <IconLoading width={28} height={28} className='text-[#bfbfbf] dark:text-white' /> : <>
                {click ?
                    <IconBookmarkFill width={24} height={24} className='text-[#bfbfbf] dark:text-white' /> :
                    <IconBookmark  width={28} height={28} className='text-blue-600 dark:text-white' />}
            </>}
        </EmptyButton>
    )
}
