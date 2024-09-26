'use client';
import Button from '@/components/Assets/Button';
import useHandleLogin from '@/hooks/useHandleLogin';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';

export default function CourseStartButton({ courseProgress }: { courseProgress: number }) {
  const user = useAppSelector(selectUser);
  const { handleLogin } = useHandleLogin();
  const handleClick = () =>{
     if(!user) handleLogin();
  }
  return (
    <div className="mt-4 flex items-center justify-between">
      <Button
        onClick={handleClick}
        fullWidth
        size="medium"
        color="primary"
        outlined
        className="flex-1 border-[2px] dark:border-mdark-400 dark:bg-mdark-500  dark:text-white"
      >
        {user ? (courseProgress > 0 ? 'ادامه دوره' : 'شروع دوره') : 'جهت مشاهده دوره وارد شوید'}
      </Button>

      <p className="pr-4 text-xl font-medium text-primary-700 dark:text-hgray-200 lg:flex-1">
        {'رایگان'}
      </p>
    </div>
  );
}
