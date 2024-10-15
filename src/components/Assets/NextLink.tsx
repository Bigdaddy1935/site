'use client';
import { dispatchRouteChangeEvent } from '@/lib/routeChangeEvent/routeEvents';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ComponentProps, MouseEventHandler, useCallback } from 'react';

type Props = {
  withQueryString?: boolean;
} & ComponentProps<typeof Link>;
export default function NextLink(props: Props) {
  const { href, children, onClick, withQueryString, ...allProps } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    return params.toString();
  }, [searchParams]);
 
  return (
    <Link
      href={href + (withQueryString ? `?${createQueryString()}` : '')}
      prefetch={false}
      {...allProps}
    >
      {children}
    </Link>
  );
}
