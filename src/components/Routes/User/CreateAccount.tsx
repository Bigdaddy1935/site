"use client"
import BackBtn from '@/components/Assets/BackBtn'
import Container from '@/components/Assets/Container'
import NextLink from '@/components/Assets/NextLink'
import Paper from '@/components/Assets/Paper'
import IconChevronLeft from '@/components/Icons/IconChevronLeft'
import IconEdit from '@/components/Icons/IconEdit'
import IconLoading from '@/components/Icons/IconLoading'
import IconUserAddLine from '@/components/Icons/IconUserAddLine'
import useNextRouter from '@/hooks/useNextRouter'
import { useRedirect } from '@/hooks/useRedirect'
import { formatPhoneNumber } from '@/lib/number'
import { selectPhone, setRedirect } from '@/lib/reduxFeatures/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks'
import { useSendTokenMutation } from '@/lib/services/auth'
import { toast } from 'react-toastify'

export default function CreateAccount() {
    const [sendToken, { isLoading, isSuccess }] = useSendTokenMutation()
    const phone = useAppSelector(selectPhone);
    const {redirectWithQueryString} = useRedirect()
    const dispatch = useAppDispatch();
    const router = useNextRouter();
    if (!phone) {
        router.push('/user/check-user');
        return null;
    }
    const handleSendToken = () => {
        if (!phone) return;
        sendToken({
            phone
        }).then(({ data, error }) => {
            if (!error) {
                dispatch(setRedirect({ phone, redirect: '/user/signup' , action : 'signup' }));
                toast.success('کد احراز هویت به شماره شما ارسال شد');
                redirectWithQueryString('/user/verification')
            }
        })
    }


    return (
        <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <h3 className="text-base text-primary-700 dark:text-primary-300 font-semibold text-center mb-7">
                حساب کاربری با شماره <span className='ltr inline-block'>{formatPhoneNumber(phone)}</span>
                <span className='block text-center mt-2'>یافت نشد</span>
            </h3>
            <div className="w-[90%] max-w-lg mx-auto mb-3">
                <BackBtn />
            </div>
            <Paper className="w-[90%] max-w-lg mx-auto  lg:p-10">
                <button type='button' onClick={handleSendToken} className='flex items-center justify-between bg-primary-300 hover:bg-primary-400 text-hgray-100 p-4 w-full rounded-lg'>
                    <span className='flex items-center text-sm'>
                        <IconUserAddLine className='ml-2' width={22} height={22} />
                        ایجاد حساب کاربری جدید با این شماره
                    </span>

                    {isLoading ? <IconLoading width={22} height={22} /> : <IconChevronLeft width={24} height={24} />}
                </button>
                <NextLink href={'/user/check-user'} className='flex items-center mt-5 justify-between bg-hgray-300 hover:bg-hgray-350 text-hgray-600 p-4 w-full rounded-lg'>
                    <span className='flex items-center text-sm'>
                        <IconEdit className='ml-2' width={22} height={22} />
                        ویرایش شماره موبایل
                    </span>

                    <IconChevronLeft width={24} height={24} />
                </NextLink>
            </Paper>
        </Container>
    );
}
