"use client"
import EmptyButton from '@/components/Assets/EmptyButton';
import Paper from '@/components/Assets/Paper';
import useNextRouter from '@/hooks/useNextRouter';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export type ActiveTab = "all" | "accepted" | "rejected"
const items = [
    {
        label: "همه",
        key: "all"
    },
    {
        label: "تایید شده",
        key: "accepted"
    },

    {
        label: "تایید نشده",
        key: "rejected"
    },
]

type Props = {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void
}
export default function AdminCommentsListTabs(props: Props) {
    const { activeTab, setActiveTab } = props;
    const pathName = usePathname();
    const router = useNextRouter();

    useEffect(() => {
        router.push(`${pathName}?tab=${activeTab}`)
    }, [activeTab]);

    return (
        <Paper className='w-full py-1.5 max-w-full overflow-x-auto scroll-hidden'>
            <div className='flex items-center'>
                {items.map(item => (
                    <EmptyButton
                        key={item.key}
                        onClick={() => setActiveTab(item.key as ActiveTab)}
                        className={twMerge(`py-2 px-4 text-hgray-600 dark:text-hgray-200 text-sm font-medium transition-colors min-w-fit`, activeTab === item.key && 'text-white bg-primary-700 rounded-md')}
                    >{item.label}</EmptyButton>
                ))}
            </div>
        </Paper>
    )
}
