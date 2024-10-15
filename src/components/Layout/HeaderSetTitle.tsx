'use client';
import { HeaderSlice, setHeader } from '@/lib/reduxFeatures/headerSlice';
import { useAppDispatch } from '@/lib/reduxHooks';
import { useEffect } from 'react';

export default function HeaderSetTitle({ label, backUrl, needAnimation = false }: HeaderSlice) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setHeader({ label, backUrl, needAnimation }));
  }, [label, backUrl]);
  return null;
}
