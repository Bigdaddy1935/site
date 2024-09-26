'use client';
import LoadingButton from '@/components/Assets/LoadingButton';
import { selectAction, selectPhone } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useForgotPasswordMutation, useSendTokenMutation } from '@/lib/services/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ResendCode() {
  const [time, setTime] = useState(90);
  const [forgetPassword, { isLoading: forgetPasswordLoading }] = useForgotPasswordMutation();
  const [sendToken, { isLoading: sendTokenLoading, data: setTokenData }] = useSendTokenMutation();
  const phone = useAppSelector(selectPhone);
  const action = useAppSelector(selectAction);
  useEffect(() => {
    const handleTime = setTimeout(() => time > 0 && setTime(time - 1), 1000);

    return () => clearTimeout(handleTime);
  });

  const handleResetPassword = () => {
    forgetPassword({ phone: phone! })
      .then(({ data, error }) => {
        if (!error) toast.success('کد یکبار مصرف برای شما ارسال شد');
      })
      .finally(() => setTime(90));
  };

  const handleSendToken = () => {
    sendToken({ phone: phone! })
      .then(({ error, data }) => {
        if (!error) toast.success('کد یکبار مصرف برای شما ارسال شد');
      })
      .finally(() => setTime(90));
  };
  const handleClick = () => {
    if (time > 0 || !phone) return;

    action === 'reset-password' ? handleResetPassword() : handleSendToken();
  };
  return (
    <div className="flex items-center justify-center gap-4">
      <p className="text-sm text-hgray-600 dark:text-text-dark-2">{time} ثانیه تا ارسال مجدد کد </p>
      <LoadingButton
        onClick={handleClick}
        loading={sendTokenLoading || forgetPasswordLoading}
        className="w-[120px] rounded-lg border-2 border-solid border-primary-300 bg-hgray-200 p-2 text-base text-hgray-400 disabled:border-hgray-400 dark:border-mdark-600 dark:bg-mdark-400 dark:text-text-dark-2 dark:disabled:border-mdark-600"
        disabled={time > 0 || sendTokenLoading || forgetPasswordLoading}
      >
        ارسال مجدد
      </LoadingButton>
    </div>
  );
}
