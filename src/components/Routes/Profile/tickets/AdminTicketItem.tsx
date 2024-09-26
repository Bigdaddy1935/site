'use client';
import EmptyButton from '@/components/Assets/EmptyButton';
import Image from "@/components/Assets/Image";
import Skeleton from '@/components/Assets/Skeleton';
import IconArrowLeftShort from '@/components/Icons/IconArrowLeftShort';
import formatFullName from '@/lib/formatFullName';
import { toPersianDateTimeFormat } from '@/lib/toPersianDateFormat';
import React from 'react';
import { Ticket } from '@/types/';
import TicketDetials from './TicketDetials';
import { useTicketList } from './TicketProvider';

export default function AdminTicketItem(item: Ticket) {
  const { showDetails, setShowDetails } = useTicketList();
  return (
    <React.Fragment>
      {showDetails ? null : (
        <div className="my-5 w-full lg:w-[50%]">
          <div className=" rounded-xl bg-white p-5 text-hgray-600 drop-shadow-md dark:bg-mdark-600 dark:text-white">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center">
                <div className="relative h-[45px] w-[45px]">
                  <Image
                    fill
                    alt=""
                    className="rounded-full object-cover"
                    src={item.user?.picture ?? '/default-profile.png'}
                  />
                </div>

                <div className="pr-2">
                  <p className="text-sm font-medium text-hgray-400 dark:text-white">
                    ({formatFullName(item.user?.fullname)})
                  </p>
                  <p className="text-sm font-medium text-hgray-400 dark:text-white">{item.user?.username}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap justify-between gap-y-3">
                <p className="flex-[70%] text-sm font-medium text-hgray-400 dark:text-white">موضوع: {item.title}</p>
                <p className="text-hgray-40 flex-[20%] text-sm font-medium">کد تیکت: {item.id}</p>
                <p className="flex-[80%] text-sm font-medium text-hgray-400 dark:text-white">
                  {item.user_department.name}
                </p>
                <p className="flex-[20%] text-sm font-medium text-hgray-400 dark:text-white">{item.status}</p>
              </div>
            </div>

            <div className="my-8">
              <p className="text-sm leading-8 text-hgray-400 dark:text-white">
                {item.text.slice(0, 145)}
                {item.text.length > 145 && '...'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-hgray-400 dark:text-hgray-200">
                آخرین بروزرسانی{' '}
                <span className="ltr inline-block">{toPersianDateTimeFormat(item.updated_at)}</span>
              </p>

              <EmptyButton
                onClick={() => setShowDetails(item.id)}
                className="flex items-center text-blue-500"
              >
                <span>جزییات</span>

                <IconArrowLeftShort width={22} height={22} />
              </EmptyButton>
            </div>
          </div>
        </div>
      )}

      {showDetails === item.id && <TicketDetials {...item} />}
    </React.Fragment>
  );
}

export function UserTicketItemSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="my-5 w-full px-5 lg:w-[50%]">
          <div className="rounded-xl bg-white p-5 text-hgray-600 drop-shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex flex-1">
                <div className="relative h-[65px] w-[65px]">
                  <Skeleton width={'65px'} height={'65px'} circle />
                </div>

                <div className="pr-4">
                  <Skeleton width={'110px'} height={'18px'} />
                  <Skeleton width={'75px'} height={'18px'} />
                </div>
              </div>

              <div className="flex-1">
                <p>
                  <Skeleton width={'110px'} height={'18px'} />
                </p>
                <p>
                  <Skeleton width={'110px'} height={'18px'} />
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Skeleton width={'110px'} height={'12px'} />

              <Skeleton width={'110px'} height={'25px'} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
