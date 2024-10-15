"use client"
import EmptyGrid from '@/components/Assets/EmptyGrid';
import BlogCart from '@/components/BlogCard';
import BlogCartSkeleton from '@/components/BlogCard/BlogCartSkeleton';
import ClassCard from '@/components/ClassCard';
import ClassCartSkeleton from '@/components/ClassCard/ClassCartSkeleton';
import CourseCard from '@/components/CourseCard';
import CourseCartSkeleton from '@/components/CourseCard/CourseCartSkeleton';
import ProductCard from '@/components/ProductCard';
import ProductCartSkeleton from '@/components/ProductCard/ProductCartSkeleton';
import { useGetBookMarksQuery } from '@/lib/services/auth';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import BookMarkTabs, { ActiveTab } from './BookMarkTabs';

const lessonKeys = ["podcast", "tv", "media", "lessons"];
export default function BookMarksList() {
    const { isLoading, data } = useGetBookMarksQuery();
    const activeTabQuery = useSearchParams().get('tab');
    const [activeTab, setActiveTab] = useState<ActiveTab>(activeTabQuery ? activeTabQuery as ActiveTab : "courses")


    const getCurrentActiveTabData = () => {
        if (!data) return [];

        if (!lessonKeys.find(i => i === activeTab)) return typeof data?.[activeTab] !== undefined ? data?.[activeTab] : [];

        if (activeTab === "lessons") typeof data?.["lessons"] !== undefined ? data?.["lessons"].filter(i => !lessonKeys.includes(i.courses.type)) : []


        return typeof data?.["lessons"] !== undefined ? data?.["lessons"]: []
    }

    const renderCurrentActiveTabContent = useMemo(() => {
        const tabData = getCurrentActiveTabData();

        if (tabData.length === 0)
            return (
                <EmptyGrid />
            )

        return (
            tabData.map(item => {
                if (activeTab === "courses") return <CourseCard key={item.id} {...item} />
                if (activeTab === "articles") return <BlogCart key={item.id} {...item} />
                if (activeTab === "products") return <ProductCard key={item.id} {...item} />
                if (lessonKeys.includes(activeTab)) return <ClassCard key={item.id} {...item} />
            })
        )
    }, [data, activeTab])
    return (
        <div>
            <BookMarkTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-[1%] gap-y-10 justify-between my-10'>
                {isLoading ? <>
                    {
                        [...Array(4)].map((_, index) => {
                            if (activeTab === "courses") return <CourseCartSkeleton />
                            if (activeTab === "articles") return <BlogCartSkeleton />
                            if (activeTab === "products") return <ProductCartSkeleton />
                            if (lessonKeys.includes(activeTab)) return <ClassCartSkeleton />
                        })
                    }
                </> :
                    renderCurrentActiveTabContent
                }
            </div>
        </div>
    )
}
