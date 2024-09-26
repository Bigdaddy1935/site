'use client';
import EmptyButton from '@/components/Assets/EmptyButton';
import Image from '@/components/Assets/Image';
import NextLink from '@/components/Assets/NextLink';
import Skeleton from '@/components/Assets/Skeleton';
import IconChevronLeft from '@/components/Icons/IconChevronLeft';
import IconMenu from '@/components/Icons/IconMenu';
import IconUser_male_circle from '@/components/Icons/IconUser_male_circle';
import IconWindowClose from '@/components/Icons/IconWindowClose';
import ProfileSidebar from '@/components/Routes/Profile/ProfileSidebar';
import useHandleLogin from '@/hooks/useHandleLogin';
import { useMobilePopup } from '@/lib/MobilePopupContext';
import { toLocalString } from '@/lib/number';
import { selectToken, selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useAuthQuery } from '@/lib/services/auth';
import { usePathname } from 'next/navigation';
import AppDownload from './AppDownload';
import HeaderTitle from './HeaderTitle';
import MoreItemsMenu from './MoreItemsMenu';

export default function MobileMenu() {
  const { setContent, open, content } = useMobilePopup();
  const pathName = usePathname();

  return (
    <div className="flex cursor-pointer items-center lg:hidden">
      {pathName === '/' || pathName.startsWith('/profile') ? (
        <span
          className="inline-block text-primary-400"
          onClick={() =>
            open
              ? setContent({ content: null })
              : setContent({
                  content: pathName == '/' ? <PopupContent /> : <ProfileSidebar />,
                  origin: 'right'
                })
          }
        >
          {open ? <IconWindowClose width={36} height={36} /> : <IconMenu width={36} height={36} />}
        </span>
      ) : (
        <HeaderTitle />
      )}
    </div>
  );
}

function PopupContent() {
  const pathName = usePathname();

  return pathName.startsWith('/profile') ? (
    <ProfileSidebar />
  ) : (
    <div>
       <SideUserMenu /> 

      <div className="p-3">
         <MoreItemsMenu /> 
      </div>
      <AppDownload /> 
    </div>
  );
}

function SideUserMenu() {
  const user = useAppSelector(selectUser);
  const { handleLogin } = useHandleLogin();
  const token = useAppSelector(selectToken);
  const { isLoading } = useAuthQuery({} , {skip : !token});
  return isLoading ? (
    <div className="flex items-center p-2">
      <Skeleton width={'42px'} height={'42px'} circle />
      <div className="flex-1 ps-2">
        <Skeleton width={'100%'} height={'14px'} />
        <Skeleton width={'60%'} height={'12px'} className="mt-0.5" />
      </div>
    </div>
  ) : user ? (
    <NextLink className="flex w-full items-center p-2" href={'/profile'}>
      <Image
        src={user.picture ?? '/default-profile.png'}
        className="aspect-square overflow-hidden rounded-full object-fill"
        width={55}
        height={55}
        alt=""
      />
      <span className="flex-1 pr-3 text-sm font-medium text-hgray-600 dark:text-text-dark-2">
        {user.username}
        <span className="block font-normal text-hgray-400 dark:text-text-dark-2">
          موجودی: {toLocalString(user.wallet_balance)} تومان
        </span>
      </span>
      <IconChevronLeft width={22} height={22} className="text-blue-500" />
    </NextLink>
  ) : (
    <EmptyButton className="flex w-full items-center p-2" onClick={() => handleLogin()}>
      <IconUser_male_circle width={38} height={38} className="text-hgray-400" />
      <span className="flex-1 text-start font-medium text-blue-500">ورود / ثبت نام</span>
      <IconChevronLeft width={22} height={22} className="text-blue-500" />
    </EmptyButton>
  );
}
