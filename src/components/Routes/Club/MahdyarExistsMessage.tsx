import EmptyButton from "@/components/Assets/EmptyButton";
import useLogout from "@/hooks/useLogout";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";


export default function MahdyarExistsMessage() {
  const user = useAppSelector(selectUser);
  const { handleLogout } = useLogout();
  return (
    <div className="flex flex-col justify-center gap-4 items-center h-[200px]">
      <p className="font-medium dark:text-text-dark-3">
        ثبت نام شما با شماره{" "}
        <span className="font-bold text-primary-600 dark:text-primary-50">{user?.phone}</span> تکمیل
        شده است.
      </p>

      <p className="text-hgray-600 font-semibold dark:text-text-dark-3">
        جهت ثبت نام با شماره دیگر خروج از سیستم را بزنید
      </p>

      <EmptyButton className="text-blue-600 dark:text-blue-200" onClick={handleLogout}>
        خروج از سیستم
      </EmptyButton>
    </div>
  );
}
