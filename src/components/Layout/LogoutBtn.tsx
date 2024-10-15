"use client"
import EmptyButton from '@/components/Assets/EmptyButton';
import IconLogout from '@/components/Icons/IconLogout';
import useLogout from '@/hooks/useLogout';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';

export default function LogoutBtn() {
  const { handleLogout } = useLogout();
  const user = useAppSelector(selectUser);
  return user ?  (
    <EmptyButton
      onClick={() => handleLogout()}
      className="flex items-center px-2 py-3 text-hgray-600 dark:text-white lg:py-1.5 lg:hover:text-primary-300 dark:hover:text-primary-100"
    >
      <IconLogout width={22} height={22} />

      <span className="mr-4 text-base">خروج از حساب کاربری</span>
    </EmptyButton>
  ) : null;
}
