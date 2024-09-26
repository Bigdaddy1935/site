import IconMathPlus from "@/components/Icons/IconMathPlus";
import TicketProvider from "@/components/Routes/Profile/tickets/TicketProvider";
import UserTicketList from "@/components/Routes/Profile/tickets/UserTicketList";
import Link from "next/link";

export const metadata = {
  title: `${'تیکت ها'} | پروفایل کاربری`
};
export default function TicketsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] items-stretch gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-4xl font-bold text-hgray-600 dark:text-white">تیکت های شما</h2>
        <Link className="flex items-center dark:text-white" href={'/profile/tickets/add'}>
          <IconMathPlus className="ml-2" width={22} height={22} />
          <span>ثبت تیکت جدید</span>
        </Link>
      </div>

      <TicketProvider>
        <UserTicketList />
      </TicketProvider>
    </div>
  )
}