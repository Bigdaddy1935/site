"use client"
import Button from '@/components/Assets/Button';
import EmptyButton from '@/components/Assets/EmptyButton';
import TextField from '@/components/Form/TextField';
import IconLoading from '@/components/Icons/IconLoading';
import IconMathPlus from '@/components/Icons/IconMathPlus';
import IconMinus from '@/components/Icons/IconMinus';
import useHandleLogin from '@/hooks/useHandleLogin';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useAddCommentMutation } from '@/lib/services/auth';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Model } from '@/types/';
import BoxComment from './BoxComment';
import { useComments } from './CommentProvider';

type Props = {
    model: Model;
    id: number;
}
export default function AddCommentForm(props: Props) {
    const [show, setShow] = useState(false);
    const user = useAppSelector(selectUser);
    const { handleLogin } = useHandleLogin()
    const [showLogin, setShowLogin] = useState(false);
    const handleClick = () => {
        if (user) {
            setShow(!show)
        }
        else {
            setShowLogin(true)
        }
    }
    return (
        <div className='flex flex-col'>
            <div className='flex gap-3 items-stretch justify-between'>
                <BoxComment className='flex-1'>
                    <p className='text-hgray-600 dark:text-white text-lg font-semibold'>نظرات</p>
                </BoxComment>
                <Button onClick={handleClick} outlined rounded='lg' className='flex w-[185px] justify-between items-center text-primary-300 bg-transparent border-[2px] p-1.5 px-3 border-solid  border-hgray-300 dark:border-mdark-400 dark:bg-mdark-500 dark:text-white rounded-lg'>
                    <span className='font-normal inline-block text-base'>{show ? "انصراف" : "ایجاد نظر جدید"}</span>

                    {show ? <IconMinus className='mr-4' width={24} height={24} /> :
                        <IconMathPlus className='mr-4' width={24} height={24}
                        />}
                </Button>

            </div>

            {show ? <div className='w-full mt-3 flex-1'>
                <CommentForm setShow={setShow} {...props} />
            </div> : null}
            {showLogin ? <div className='w-full flex flex-col gap-6 lg:flex-row items-center mt-3 flex-1'>
                <p className='text-hgray-600 font-semibold'>برای ثبت نظرات لازم است ابتدا در سایت ثبت نام نموده یا وارد حساب کاربری خود شوید</p>

                <EmptyButton onClick={() => handleLogin()} className='text-blue-600 font-medium'>ورود | ثبت نام</EmptyButton>
            </div> : null}
        </div>
    )
}

function CommentForm(props: Props & { setShow: (s: boolean) => void }) {
    const { id, model, setShow } = props;
    const [addComment, { isLoading }] = useAddCommentMutation();
    const { tempComments, setTempComments } = useComments();
    const user = useAppSelector(selectUser)
    const methods = useForm();

    const handleSubmit = async (values: any) => {
        const res = await addComment({ body: values.body, id, model });

        if (!res.error) {
            toast.success('نظر شما با موفقیت ثبت شد');
            setShow(false);
        }

        if (user?.approved === 1 && res.data) {
            setTempComments([res.data, ...tempComments])
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <div className='flex items-start justify-between gap-1'>
                    <div className='flex-1'>
                        <TextField className='h-full bg-hgray-300 dark:bg-mdark-400 dark:text-hgray-200 focus:outline-0 p-3' name='body' required placeholder='متن خود را وارد کنید...' />
                    </div>

                    <div>
                        <Button disabled={isLoading} className='h-[3.2rem] px-8 bg-hgray-300 dark:bg-mdark-400 text-primary-300 font-normal' type='submit'>
                            {isLoading ? <IconLoading width={24} height={24} /> : "ارسال"}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}