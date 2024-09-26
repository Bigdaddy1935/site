"use client"
import EmptyButton from "@/components/Assets/EmptyButton";
import Paper from "@/components/Assets/Paper";
import { twMerge } from "tailwind-merge";
import { ActiveTab, useMyClass } from "./MyClassProvider";


const items = [
    {
        label: "جاری",
        key: "see",
    },
    {
        label: "تکمیل شده",
        key: "full",
    },
]

export default function MyClassTabs() {
    const { activeTab, setActiveTab } = useMyClass()
    return (
        <Paper className='w-full py-1.5 max-w-full overflow-x-auto scroll-hidden'>
            <div className='flex items-center'>
                {items.map(item => (
                    <EmptyButton
                        key={item.key}
                        onClick={() => setActiveTab(item.key as ActiveTab)}
                        className={twMerge(`p-3 text-hgray-600 text-sm font-medium transition-colors flex-1`, activeTab === item.key && 'text-white bg-primary-300 rounded-md')}
                    >{item.label}</EmptyButton>
                ))}
            </div>
        </Paper>
    )
}