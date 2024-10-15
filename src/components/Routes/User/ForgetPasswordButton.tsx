"use client"
import EmptyButton from '@/components/Assets/EmptyButton'
import IconChevronLeft from '@/components/Icons/IconChevronLeft'
import IconLock from '@/components/Icons/IconLock'
import useNextRouter from '@/hooks/useNextRouter'
import { setRedirect } from '@/lib/reduxFeatures/authSlice'
import { useAppDispatch } from '@/lib/reduxHooks'

export default function ForgetPasswordButton() {
  const router = useNextRouter();
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setRedirect({ phone: '', action: 'reset-password' }));
    router.push('/user/forget-password');
  }


  return (
    <EmptyButton type='button' onClick={handleClick} className="flex justify-between text-hgray-500 bg-hgray-300 dark:bg-mdark-500 dark:text-text-dark-3 items-center p-2 lg:p-4 rounded-lg">
      <span className="flex text-sm font-medium items-center">
        <IconLock width={22} height={22} />
        فراموشی رمز عبور
      </span>

      <IconChevronLeft width={22} height={22} />
    </EmptyButton>
  )
}
