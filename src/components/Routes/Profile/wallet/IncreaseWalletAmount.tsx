"use client";
import Button from "@/components/Assets/Button";
import EmptyButton from "@/components/Assets/EmptyButton";
import PriceField from "@/components/Form/PriceField";
import IconLoading from "@/components/Icons/IconLoading";
import useNextRouter from "@/hooks/useNextRouter";
import { useIncreaseWalletMutation } from "@/lib/services/wallet";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const items: {
  amount: number;
  discount?: number;
}[] = [
  {
    amount: 50000,
  },
  {
    amount: 100000,
  },
  {
    amount: 300000,
  },
  {
    amount: 500000,
    //   discount: 10
  },
  {
    amount: 1000000,
    //   discount: 30
  },
];
export default function IncreaseWalletAmount() {
  const form = useForm();
  const [increaseWallet, { isLoading, isSuccess, data }] =
    useIncreaseWalletMutation();
  const router = useNextRouter();
  let callBackUrl = "/";
  if (typeof window !== "undefined") {
    callBackUrl = window.location.origin;
  }
  const handleSubmit = (values: any) => {
    increaseWallet({
      amount: Number(values.amount.replaceAll(",", "")),
      callback: `${callBackUrl}/wallet-verify`,
    });
  };

  useEffect(() => {
    if (data) {
      toast.success("در حال انتقال به درگاه پرداخت");
      router.push(data.link);
    }
  }, [isSuccess, data]);
  return (
    <div>
      <p className="text-hgray-600 dark:text-white font-medium mb-2 text-lg">
        افزایش موجودی
      </p>

      <div className="flex items-center gap-3 justify-between">
        {items.map((item) => (
          <EmptyButton
            key={item.amount}
            onClick={() => form.setValue("amount", String(item.amount))}
            className={`text-hgray-600 dark:text-hgray-300 relative flex-1 px-1 lg:px-3 ${item.discount && "pl-[12px] lg:pl-[35px]"} py-2 font-medium border-2 hover:border-solid border-solid border-hgray-300 dark:border-mdark-400 rounded-lg`}
          >
            {item.amount > 999999 ? item.amount / 1000000 : item.amount / 1000}
            <span className="max-lg:text-[8px] max-lg:font-light max-lg:block">
              {" "}
              {item.amount > 999999 ? "میلیون" : "هزار"} تومان
            </span>

            {item.discount ? (
              <>
                <span className="absolute block top-[-4px] left-[-2] max-lg:rounded-lg lg:left-[35px] w-[17px] lg:h-[calc(100%+8px)] border-t-0 border-b-[54px] lg:border-b-[48px] max-lg:border-l-[48px] border-x-[17px] border-transparent border-l-primary-300 border-solid"></span>
                <span className="text-white leading-none flex flex-col  justify-start lg:justify-center absolute h-[calc(100%+8px)] left-[-2px] top-0 lg:left-0 text-sm overflow-visible w-[35px] lg:bg-primary-300 lg:top-[-4px] rounded-l-lg">
                  %{item.discount}
                  <span className="text-[9px] lg:text-xs font-light block max-lg:text-center max-lg:mr-2">
                    بیشتر
                  </span>
                </span>
              </>
            ) : null}
          </EmptyButton>
        ))}
      </div>

      <div className="mt-5">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <PriceField name="amount" placeholder="مبلغ را اینجا وارد کنید" />

            <div className="flex justify-end">
              <Button
                color="gray"
                className="px-7 dark:text-white dark:border-mdark-600"
                outlined
                type="submit"
              >
                {isLoading ? (
                  <IconLoading width={22} height={22} />
                ) : (
                  "پرداخت نهایی"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
