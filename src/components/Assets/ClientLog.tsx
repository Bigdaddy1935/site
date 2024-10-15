'use client';
import { useEffect } from 'react';

type Props = {
  data: any;
};

export default function ClientLog({ data }: Props) {
  useEffect(() => {
    console.log({ clientLog: data });
  }, [data]);
  return null;
}
