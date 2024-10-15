import AddTicketForm from "@/components/Routes/Profile/tickets/AddTicketForm";

export const metadata = {
  title: `${'ثبت تیکت'} | پروفایل کاربری`
};
export default function AddTicketPage() {
  return (
    <div className="flex flex-col items-stretch gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-4xl font-bold text-hgray-600 dark:text-hgray-200">ثبت تیکت جدید</h2>
      </div>

        <AddTicketForm />
    </div>
  )
}