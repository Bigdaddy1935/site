'use client';
import { useGetAdminTicketsQuery } from '@/lib/services/admin';
import AdminTicketItem from './AdminTicketItem';
import { UserTicketItemSkeleton } from './UserTicketItem';

export default function AdminTicketList() {
  const { data, isLoading } = useGetAdminTicketsQuery();
  return (
    <div className="flex max-h-full flex-1 flex-col flex-wrap pb-10 lg:flex-row">
      {isLoading ? (
        <UserTicketItemSkeleton count={4} />
      ) : (
        data?.map((item) => (
            <AdminTicketItem key={item.id} {...item} />
        ))
      )}
    </div>
  );
}
