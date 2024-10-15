'use client';
import NextLink from '@/components/Assets/NextLink';
import IconMessageSquare from '@/components/Icons/IconMessageSquare';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';

type Props = {
  title: string;
  href: string;
};

export default function ManagerOnlyBtn(props: Props) {
  const { href, title } = props;
  const user = useAppSelector(selectUser);
  return user && user?.approved === 1 ? (
    <NextLink
      className="flex items-center px-2 py-3 text-hgray-600 dark:text-white lg:py-1.5 lg:hover:text-primary-300 dark:hover:text-primary-100"
      href={`/profile/${href}`}
    >
      <IconMessageSquare width={22} height={22} />

      <span className="mr-4 text-base">{title}</span>
    </NextLink>
  ) : null;
}
