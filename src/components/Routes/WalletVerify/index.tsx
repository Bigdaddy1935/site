"use client"
import Button from "@/components/Assets/Button";
import ContainerLayout from "@/components/Assets/ContainerLayout";
import Image from "@/components/Assets/Image";
import IconLoading from "@/components/Icons/IconLoading";
import { toLocalString } from "@/lib/number";
import { useVerifyDepositQuery } from "@/lib/services/wallet";
import { useSearchParams } from "next/navigation";

export default function WalletVerify() {
    const params = useSearchParams();
    const Authority = params.get("Authority");
    const { isLoading, data, error, isSuccess } = useVerifyDepositQuery({
        Authority: Authority ?? '',
    }, {
        skip: !Authority
    });


    return (
        <ContainerLayout>
            <div className="min-h-screen max-w-md mx-auto flex flex-col items-stretch justify-start mt-[10vh]">
                {isLoading ? <>
                    <IconLoading width={48} height={48} className="mx-auto text-hgray-400" />

                    <p className="text-xl text-hgray-400 text-center mt-6">در حال دریافت اطلاعات</p>

                </> : <>

                    {isSuccess ? <>
                        <Image src="/success.png" width="300" height="400" alt="" className="object-fill mb-6 mx-auto" />

                        <p className="text-3xl text-primary-700 font-semibold text-center">پرداخت با موفقیت انجام شد</p>


                        <div className="flex flex-col items-stretch gap-2 my-10">
                            <div className="justify-between border-b border-solid border-hgray-300 items-center flex pb-2">
                                <p className="text-hgray-600 font-medium">موجودی کیف پول</p>
                                <p className="text-hgray-600 font-medium" >{toLocalString(data.wallet_balance)} تومان</p>
                            </div>
                            <div className="justify-between border-b border-solid border-hgray-300 items-center flex pb-2">
                                <p className="text-hgray-600 font-medium">نوع پرداخت</p>
                                <p className="text-hgray-600 font-medium">درگاه بانکی</p>
                            </div>
                            <div className="justify-between border-b border-solid border-hgray-300 items-center flex pb-2">
                                <p className="text-hgray-600 font-medium">شماره ارجاع</p>
                                <p className="text-hgray-600 font-medium">{data.reference_id}</p>
                            </div>

                        </div>

                        <Button className="text-center" href="/profile">رفتن به حساب کاربری</Button>
                    </> : <>

                        <Image src="/fail.png" width="300" height="400" alt="" className="object-fill mb-6 mx-auto" />

                        <p className="text-2xl text-rose-500 font-semibold text-center mb-10">متاسفانه پرداخت شما با خطا مواجه شد</p>

                        <Button color="error" className="text-center" href="/profile">رفتن به حساب کاربری</Button>

                    </>}
                </>}




            </div>
        </ContainerLayout>
    )
}