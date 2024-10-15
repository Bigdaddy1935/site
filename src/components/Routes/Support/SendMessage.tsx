"use client"
import EmptyButton from '@/components/Assets/EmptyButton'
import { selectLoading, selectUser } from '@/lib/reduxFeatures/authSlice'
import { useAppSelector } from '@/lib/reduxHooks'
import Skeleton from 'react-loading-skeleton'
import AddTicketForm from '../Profile/tickets/AddTicketForm'
import useHandleLogin from '@/hooks/useHandleLogin'

export default function SendMessage() {
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);
    const {handleLogin} = useHandleLogin();
    return (
        <div className='mt-20'>
            <h3 className="text-2xl font-semibold text-hgray-600 dark:text-white mb-4">ارتباط با کارشناسان ما</h3>

            {loading ? <Skeleton width={"100%"} height={"36px"} /> : <>
                {user ? <AddTicketForm /> : <div>
                    <p className='text-hgray-500 dark:text-text-dark-4'>برای ارسال پیام به حساب کاربری خود وارد شودید</p>

                    <EmptyButton className='text-blue-600' onClick={() => handleLogin()}>ورود | ثبت نام</EmptyButton>
                </div>}
            </>}

        </div>
    )
}
