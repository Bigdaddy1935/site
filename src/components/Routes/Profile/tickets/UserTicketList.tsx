"use client"
import { useGetUserTicketQuery } from '@/lib/services/ticket';
import UserTicketItem, { UserTicketItemSkeleton } from './UserTicketItem';

export default function UserTicketList() {
    const { data, isLoading } = useGetUserTicketQuery();
    return (
        <div className='flex flex-col lg:flex-row flex-wrap max-h-full pb-10'>
            {isLoading ? <UserTicketItemSkeleton count={4} /> : data?.map(item => (
                    <UserTicketItem key={item.id} {...item} />
            ))}
        </div>
    )
}

