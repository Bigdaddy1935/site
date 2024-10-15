'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function usePopup() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<any>();
  const pathName = usePathname();
  useEffect(() => {
    const handleClick = (e: any) => {
      if (wrapperRef.current?.contains(e.target)) return;

      setOpen(false);
    };
    document?.addEventListener('click', handleClick);

    return () => document?.removeEventListener('click', handleClick);
  }, [wrapperRef.current]);

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return {
    open,
    setOpen,
    wrapperRef
  };
}
