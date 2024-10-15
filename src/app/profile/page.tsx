import MahdiyarProgress from '@/components/Routes/Profile/MahdiyarProgress';
import UserInfo from '@/components/Routes/Profile/UserInfo';
import WalletSummery from '@/components/Routes/Profile/WalletSummery';

export const metadata = {
  title: 'پروفایل کاربری'
};
export default function ProfilePage() {
  return (
    <div>
      <UserInfo />
      <div className="mt-5">
        <WalletSummery />
      </div>

      <div className="mt-5">
        <MahdiyarProgress />
      </div>
    </div>
  );
}
