import OrderListProvider from "@/components/Routes/Profile/orders/OrderListProvider";
import UserOrdersList from "@/components/Routes/Profile/orders/UserOrdersList";

export const metadata = {
    title: `${'خریداری شده'} | پروفایل کاربری`
};
export default function AddTicketPage() {
    return (
        <div className="flex flex-col items-stretch gap-6">
            <div className="flex justify-between items-center">
                <h2 className="lg:text-4xl text-2xl font-bold text-hgray-600 dark:text-hgray-200">لیست خرید های شما</h2>
            </div>
            <OrderListProvider>
                <UserOrdersList />
            </OrderListProvider>
        </div>
    )
}