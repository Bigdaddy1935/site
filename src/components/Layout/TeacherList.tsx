"use client"
import Image from "@/components/Assets/Image";
import formatFullName from "@/lib/formatFullName";
import { useGetTeachersQuery } from "@/lib/services/base";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function TeacherList() {
    const { data: teachers, isLoading } = useGetTeachersQuery();

    // if (typeof teachers === 'boolean') return null;

    return (
        <div className="bg-hgray-200 dark:bg-mdark-600 p-3">
            <div className="max-h-[130px] lg:max-h-[230px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                {isLoading ? <Skeleton width={"100%"} height={"35px"} count={5} /> :
                    teachers?.map(item => (
                        <Link key={item.id} className="flex items-center py-1.5 border-b border-hgray-300 dark:border-mdark-400" href={"#"}>
                            <div className="relative rounded-full aspect-square ml-1 w-[48px] h-[48px]">

                                <Image className="flex-1 rounded-full aspect-square" alt="" fill src={item.picture ?? "/default-profile.png"} />
                            </div>

                            <div>
                                <p className="text-hgray-600 dark:text-white text-base font-semibold">
                                    {formatFullName(item.fullname)}
                                </p>
                                <p className="text-hgray-400 dark:text-hgray-300 max-w-[185px] text-sm font-normal truncate whitespace-nowrap overflow-hidden">{item.about_me}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}
