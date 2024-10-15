import IncreaseWalletAmount from "@/components/Routes/Profile/wallet/IncreaseWalletAmount";
import WalletAmount from "@/components/Routes/Profile/wallet/WaaletAmount";
import WalletHistory from "@/components/Routes/Profile/wallet/WalletHistory";

export const metadata = {
    title: `${'کیف پول'} | پروفایل کاربری`
};
export default function WalletPage() {
    return (
        <div className="flex flex-col items-stretch gap-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-hgray-600 dark:text-white">کیف پول</h2>

            <WalletAmount />

            <IncreaseWalletAmount />

            <WalletHistory />
        </div>
    )
}