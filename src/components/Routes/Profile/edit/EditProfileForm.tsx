'use client';
import Button from '@/components/Assets/Button';
import Paper from '@/components/Assets/Paper';
import Skeleton from '@/components/Assets/Skeleton';
import BirthdayField from '@/components/Form/BirthdayField';
import GenderSelect from '@/components/Form/GenderSelect';
import ProfileSelect from '@/components/Form/ProfileSelect';
import TextField from '@/components/Form/TextField';
import IconLoading from '@/components/Icons/IconLoading';
import { formatPhoneNumber } from '@/lib/number';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { useLazyAuthQuery, useUpdateProfileMutation } from '@/lib/services/auth';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function EditProfileForm() {
  const user = useAppSelector(selectUser);
  const [update, { isLoading, isSuccess, error }] = useUpdateProfileMutation();
  const [getUser] = useLazyAuthQuery();
  const methods = useForm({
    values: user
      ? {
          username: user?.username,
          firstname: user?.fullname.split(',')[0],
          lastname: user?.fullname.split(',')[1],
          birthday: user?.birthday,
          national_code: user?.national_code,
          address: user?.address,
          gender: user?.gender,
          picture: user?.picture
        }
      : {}
  });

  const handleSubmit = async (values: any) => {
    update({
      ...user,
      ...values,
      pictureurl: user?.picture
    });
  };

  useEffect(() => {
    if (error) console.log({ error });

    if (isSuccess) {
      getUser({});
      toast.success('ثبت اطلاعات با موفقیت انجام شد.');
    }
  }, [isSuccess, error]);
  return (
    <Paper className="shadow-sm">
      <div className="mx-auto my-[3rem] flex max-w-[364px] flex-1 flex-col justify-center lg:max-w-[520px]">
        <FormProvider {...methods}>
          <form
            className="flex w-full flex-col items-center justify-center gap-y-2"
            onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <ProfileSelect name="picture" />

            <p className="text-base text-hgray-600 dark:text-hgray-200">
              {user ? (
                <span className="ltr inline-block">{formatPhoneNumber(user?.phone)}</span>
              ) : (
                <Skeleton width="160px" height="18px" className="rounded-lg" />
              )}{' '}
            </p>

            <GenderSelect name="gender" />

            <div className="mb-2" />
            <TextField
              disabled
              readOnly
              className="bg-hgray-100 dark:bg-mdark-500"
              required
              name="username"
              label="نام کاربری"
            />
            <TextField
              className="bg-hgray-100 dark:bg-mdark-500"
              required
              name="firstname"
              label="نام"
            />
            <TextField
              className="bg-hgray-100 dark:bg-mdark-500"
              required
              name="lastname"
              label="نام خانوادگی"
            />
            <TextField
              className="bg-hgray-100 dark:bg-mdark-500"
              name="address"
              label="محل سکونت"
            />
            <TextField
              className="bg-hgray-100 dark:bg-mdark-500"
              name="national_code"
              label="کد ملی"
            />

            <BirthdayField className="bg-hgray-100" name="birthday" label="تاریخ تولد" />
            <div className="w-full">
              <Button
                className="font-normal"
                disabled={false}
                type="submit"
                fullWidth
                color="primary"
              >
                {isLoading ? <IconLoading width={22} height={22} /> : 'ثبت تغییرات'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Paper>
  );
}
