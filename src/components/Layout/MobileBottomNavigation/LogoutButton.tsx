'use client';
import IconLogout from '@/components/Icons/IconLogout';
import useLogout from '@/hooks/useLogout';
import NavigationButton from './NavigationButton';

export default function LogoutButton() {
  const { handleLogout } = useLogout();
  return (
    <NavigationButton type="button" onClick={() => handleLogout()} label="خروج" Icon={IconLogout} />
  );
}
