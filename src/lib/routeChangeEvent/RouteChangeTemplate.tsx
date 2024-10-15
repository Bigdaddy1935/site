'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { dispatchRouteChangeEvent } from './routeEvents';

export default function RouteChangeTemplate({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    dispatchRouteChangeEvent('completed');
  }, [pathName, searchParams.toString()]);
  return <React.Fragment>{children}</React.Fragment>;
}
