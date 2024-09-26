'use client';
import EmptyButton from '@/components/Assets/EmptyButton';
import Paper from '@/components/Assets/Paper';
import IconChevronLeft from '@/components/Icons/IconChevronLeft';
import useNextRouter from '@/hooks/useNextRouter';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export type ActiveTab =
  | 'products'
  | 'courses'
  | 'articles'
  | 'lessons'
  | 'media'
  | 'tv'
  | 'podcast';
const items = [
  {
    label: 'دوره ها',
    key: 'courses'
  },
  {
    label: 'محصولات',
    key: 'products'
  },

  {
    label: 'مقالات',
    key: 'articles'
  },
  {
    label: 'درس ها',
    key: 'lessons'
  },
  {
    label: 'رسانه',
    key: 'media'
  },
  {
    label: 'صداسیما',
    key: 'tv'
  },
  {
    label: 'پادکست',
    key: 'podcast'
  }
];

type Props = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};
export default function BookMarkTabs(props: Props) {
  const { activeTab, setActiveTab } = props;
  const pathName = usePathname();
  const router = useNextRouter();

  useEffect(() => {
    router.push(`${pathName}?tab=${activeTab}`);
  }, [activeTab]);

  return (
    <Paper className="relative w-full max-w-full overflow-x-hidden py-1.5">
      <span className="absolute  left-0 top-[50%] inline-block -translate-y-[50%] lg:hidden">
        <IconChevronLeft width={28} height={28} className=" text-hgray-500/70" />
      </span>
      <span className="absolute right-0 top-[50%] inline-block -translate-y-[50%] lg:hidden">
        <IconChevronLeft width={28} height={28} className="rotate-180 text-hgray-500/70" />
      </span>
      <div className="scroll-hidden max-w-full overflow-x-auto">
        <div className="flex items-center">
          {items.map((item) => (
            <EmptyButton
              key={item.key}
              onClick={() => setActiveTab(item.key as ActiveTab)}
              className={twMerge(
                `min-w-fit px-4 py-2 text-sm font-medium text-hgray-600 transition-colors dark:text-white`,
                activeTab === item.key && 'rounded-md bg-primary-300 text-white dark:bg-mdark-500'
              )}
            >
              {item.label}
            </EmptyButton>
          ))}
        </div>
      </div>
    </Paper>
  );
}
