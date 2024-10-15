import AdminTicketList from '@/components/Routes/Profile/tickets/AdminTicketList';
import TicketProvider from '@/components/Routes/Profile/tickets/TicketProvider';

export const metadata = {
  title: `${'مدیریت تیکت ها'} | پروفایل کاربری`
};
export default function TicketsPage() {
  return (
    <div className="flex flex-col items-stretch gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-hgray-600 dark:text-white lg:text-4xl">
          مدیریت تیکت ها
        </h2>
        {/* <Link className="flex items-center dark:text-white" href={'/profile/tickets/add'}>
          <IconMathPlus className="ml-2" width={22} height={22} />
          <span>ثبت تیکت جدید</span>
        </Link> */}
      </div>

      <TicketProvider isAdmin>
        <AdminTicketList />
      </TicketProvider>
    </div>
  );
}
