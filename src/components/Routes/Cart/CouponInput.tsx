'use client';
import Button from '@/components/Assets/Button';
import TextField from '@/components/Form/TextField';
import IconLoading from '@/components/Icons/IconLoading';
import { setDiscountCode } from '@/lib/reduxFeatures/cartSlice';
import { useAppDispatch } from '@/lib/reduxHooks';
import { useDiscountMutation } from '@/lib/services/cart';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function CouponInput() {
  const form = useForm();
  const [apply, { isLoading, error, isSuccess }] = useDiscountMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = ({ discount_code }: any) => {
    apply({
      discount_code
    }).then(({ data, error }) => !error && dispatch(setDiscountCode(discount_code)));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('کد تخفیف با موفقیت اعمال شد');
    }
  }, [isSuccess, error]);
  return (
    <div>
      <p className="mb-1 text-sm text-hgray-600 dark:text-text-dark-1">کد تخفیف را وارد کنید</p>

      <FormProvider {...form}>
        <form>
          <div className="relative">
            <TextField
              name="discount_code"
              required
              className="w-[100%] bg-hgray-100 pl-[90px]"
              wrapperClassName="lg:min-w-[100%] bg-white rounded-lg focus:outline-transparent"
            />

            <Button
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isLoading || isSuccess}
              size="small"
              className="absolute left-2 top-2 w-[65px] p-0.5 text-sm font-light"
            >
              {isLoading ? (
                <IconLoading width={16} height={16} className="mx-auto inline-block" />
              ) : (
                'اعمال کد'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
