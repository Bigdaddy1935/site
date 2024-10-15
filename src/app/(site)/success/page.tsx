import Button from '@/components/Assets/Button';
import Animation from '@/components/Routes/Success/Animation';

export default function SuccessPage() {
  return (
    <div className="mt-[10vh] flex min-h-screen flex-col items-center justify-start">
      <Animation />

      <h3 className="my-5 text-center text-2xl lg:text-4xl font-semibold text-primary-300">پرداخت با موفقیت انجام شد</h3>

      <Button href="/profile/orders">رفتن به حساب کاربری</Button>
    </div>
  );
}
