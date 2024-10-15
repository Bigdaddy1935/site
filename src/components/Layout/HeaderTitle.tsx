'use client';
import BackBtn from '@/components/Assets/BackBtn';
import { selectHeader } from '@/lib/reduxFeatures/headerSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { usePathname } from 'next/navigation';

type Props = {};
const hiddenUrls = ['/success', '/verify', '/wallet-verify'];
export default function HeaderTitle({}: Props) {
  const { label, backUrl, needAnimation } = useAppSelector(selectHeader);
  const pathName = usePathname();
  return pathName.startsWith('/user') || hiddenUrls.includes(pathName) ? null : (
    <BackBtn
      w={36}
      text={label ?? 'صفحه اصلی'}
      link={backUrl || undefined}
      needAnimation={needAnimation}
    />
  );
}
