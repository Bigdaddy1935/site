'use client';
import useHidden from '@/hooks/useHidden';
import React, { useEffect, useState } from 'react';

type Sizes =
  | 'max-sm'
  | 'max-md'
  | 'max-lg'
  | 'max-xl'
  | 'max-2xl'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl';

export default function Hidden({ children, hidden }: { children: React.ReactNode; hidden: Sizes }) {
  const { isHidden } = useHidden();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <React.Fragment>{!isClient ? null : isHidden(hidden) ? null : children}</React.Fragment>;
}
