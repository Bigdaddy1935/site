"use client"
import EmptyButton from '@/components/Assets/EmptyButton'
import Image from "@/components/Assets/Image"
import Skeleton from '@/components/Assets/Skeleton'
import IconArrowLeftShort from '@/components/Icons/IconArrowLeftShort'
import { toPersianDateTimeFormat } from '@/lib/toPersianDateFormat'
import React from 'react'
import { Ticket } from '@/types/'
import TicketDetials from './TicketDetials'
import { useTicketList } from './TicketProvider'

export default function UserTicketItem(item: Ticket) {
    const { showDetails, setShowDetails } = useTicketList();
    return (
        <React.Fragment>
            {showDetails ? null : <div className='w-full lg:w-[50%] px-5 my-5'>
                <div className=' bg-white dark:bg-mdark-600 text-hgray-600 dark:text-white rounded-xl p-5 drop-shadow-md'>
                    <div className='flex justify-between items-start'>

                        <div className='flex flex-1'>
                            <div className='relative w-[65px] h-[65px]'>
                                <Image fill alt='' className='rounded-full object-cover' src={item.file ?? '/temp-images/course-card.jpg'} />
                            </div>

                            <div className='pr-4'>
                                <p>
                                    {item.title}
                                </p>

                                <p>کد : {item.id}</p>
                            </div>
                        </div>

                        <div className='flex-1'>
                            <p>
                                {item.user_department.name}
                            </p>
                            <p>
                                {item.status}
                            </p>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='text-sm text-hgray-400 dark:text-hgray-200'>آخرین بروزرسانی {toPersianDateTimeFormat(item.updated_at)}</p>

                        <EmptyButton onClick={() => setShowDetails(item.id)} className='flex items-center'>
                            <span>
                                جزییات
                            </span>

                            <IconArrowLeftShort width={22} height={22} />
                        </EmptyButton>

                    </div>
                </div>
            </div>
            }

            {showDetails === item.id && <TicketDetials {...item} />}
        </React.Fragment>
    )
}


export function UserTicketItemSkeleton({ count = 1 }: { count?: number }) {
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <div key={i} className='w-full lg:w-[50%] px-5 my-5'>
                    <div className='bg-white text-hgray-600 rounded-xl p-5 drop-shadow-md'>
                        <div className='flex justify-between items-start'>

                            <div className='flex flex-1'>
                                <div className='relative w-[65px] h-[65px]'>
                                    <Skeleton width={"65px"} height={"65px"} circle />
                                </div>

                                <div className='pr-4'>
                                    <Skeleton width={"110px"} height={"18px"}  />
                                    <Skeleton width={"75px"} height={"18px"}  />
                                </div>
                            </div>

                            <div className='flex-1'>
                                <p>
                                    <Skeleton width={"110px"} height={"18px"}  />
                                </p>
                                <p>
                                    <Skeleton width={"110px"} height={"18px"}  />
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between items-center'>
                            <Skeleton width={"110px"} height={"12px"}  />

                            <Skeleton width={"110px"} height={"25px"}  />

                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
