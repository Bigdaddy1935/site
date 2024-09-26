'use client';

import { useEffect, useRef } from 'react';

type Props = {
  scroll: any;
};
export default function ScrollToHere({ scroll }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current)
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  useEffect(() => {
    if (Boolean(scroll)) handleScroll();
  }, [scroll]);
  return <div ref={ref}></div>;
}
