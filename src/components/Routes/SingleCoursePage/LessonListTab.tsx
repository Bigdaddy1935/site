'use client';

import BoxButton from '@/components/Assets/BoxButton';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useCallback } from 'react';

const tabs = [
  {
    value: 'all',
    label: 'همه'
  },
  {
    value: 'learned',
    label: 'تکمیل شده'
  },
  {
    value: 'learning',
    label: 'تکمیل نشده'
  }
];

export type TabType = 'all' | 'learned' | 'learning' | null;

type Props = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};
export default function LessonListTab(props: Props) {
  const { activeTab, setActiveTab } = props;
  const user = useAppSelector(selectUser);
  const isActiveTab = useCallback(
    (value: string) => {
      return (
        activeTab === value ||
        ((!activeTab || !['learned', 'learning'].includes(activeTab)) && value === 'all')
      );
    },
    [activeTab]
  );
  return user ? (
    <div className="flex items-center justify-between gap-[3%]">
      {tabs.map((i) => (
        <BoxButton
          onClick={() => setActiveTab(i.value as TabType)}
          key={i.value}
          text={i.label}
          showTextInMobile
          className={`flex-1 justify-center ${isActiveTab(i.value) && 'bg-primary-100 text-hgray-300 dark:bg-primary-700'}`}
          textClassName={`text-center ${isActiveTab(i.value) && 'text-white'}`}
        />
      ))}
    </div>
  ) : null;
}
