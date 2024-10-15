'use client';
import ClientOnly from '@/components/Assets/ClientOnly';
import Skeleton from '@/components/Assets/Skeleton';
import IconLoading from '@/components/Icons/IconLoading';
import IconUser_male_circle from '@/components/Icons/IconUser_male_circle';
import useHandleLogin from '@/hooks/useHandleLogin';
import { selectToken, selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useAuthQuery } from '@/lib/services/auth';
import NavigationButton from './NavigationButton';

export default function ProfileBtn() {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const { isLoading } = useAuthQuery({} , {skip : !token});
  const { handleLogin } = useHandleLogin();
  return (
    <div className="flex flex-1 flex-col items-center">
      {isLoading ? (
        <div className="flex flex-1 flex-col items-center py-2 text-hgray-600">
          <IconLoading width={22} height={22} />
          <Skeleton width={40} height={10} />
        </div>
      ) : (
        <ClientOnly>
          {user ? (
            <NavigationButton
              label="پروفایل"
              href="/profile"
              Icon={IconUser_male_circle}
              image={user.picture ?? '/default-profile.png'}
            />
          ) : (
            <NavigationButton
              onClick={handleLogin}
              label="ورود/ثبت نام"
              type="button"
              href="/profile"
              Icon={IconUser_male_circle}
            />
          )}
        </ClientOnly>
      )}
    </div>
  );
}
