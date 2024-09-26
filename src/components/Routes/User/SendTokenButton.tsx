"use client"
import EmptyButton from '@/components/Assets/EmptyButton'
import IconChevronLeft from '@/components/Icons/IconChevronLeft'
import IconEdit from '@/components/Icons/IconEdit'
import IconLoading from '@/components/Icons/IconLoading'
import { useRedirect } from '@/hooks/useRedirect'
import { selectPhone } from '@/lib/reduxFeatures/authSlice'
import { useAppSelector } from '@/lib/reduxHooks'
import { useSendTokenMutation } from '@/lib/services/auth'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function SendTokenButton() {
  const phone = useAppSelector(selectPhone) ?? '09356867218';
  const [sendToken, { isLoading, isSuccess }] = useSendTokenMutation();
  const {redirectWithQueryString} = useRedirect();
  useEffect(() => {
    if (isSuccess) {
      toast.success('کد یکبار مصرف برای شما ارسال شد');
      redirectWithQueryString('/user/verification')
    }
  }, [isSuccess])


  return (
    <EmptyButton type='button' disabled={isSuccess || isLoading} onClick={() => phone ? sendToken({ phone }) : null} className="flex justify-between text-hgray-500 bg-hgray-300 dark:bg-mdark-500 dark:text-text-dark-3 items-center p-4 rounded-lg">
      <span className="flex text-sm font-medium items-center">
        <IconEdit width={22} height={22} />
        ارسال کد یک بارمصرف از طریق پیامک
      </span>

      {isLoading ? <IconLoading width={22} height={22} /> :
        <IconChevronLeft width={22} height={22} />
      }
    </EmptyButton>
  )
}
